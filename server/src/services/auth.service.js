import { usersDb } from "../repositories";
import { passwordHandler, arrtributesHandler, tokenHandler } from "../libs";
import { responseHandler } from "../middlewares";
import dotenv from "dotenv";
dotenv.config();
export const authService = {
  register: (req, res) =>
    new Promise(async (resolve, reject) => {
      try {
        // Check user exist in database
        const userExist = await usersDb.findOne({ email: req.body.email });
        if (userExist)
          return resolve(responseHandler.conflict(res, "Email is existed!"));

        // Hash password by bcrypt
        const hashPassword = await passwordHandler.hashPassword(
          req.body.password
        );

        // Create new user
        const data = await usersDb.create({
          ...req.body,
          password: hashPassword,
        });

        // Filter response data with include or exclude keys data
        const filterData = arrtributesHandler.filter(data, {
          excludes: ["password"],
        });

        // Publish tokens
        const access_token = tokenHandler.generateTokens(filterData, "300s");
        const refresh_token = tokenHandler.generateTokens(filterData);

        filterData["access_token"] = access_token;
        filterData["refresh_token"] = refresh_token;
        filterData["exp"] = parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN);

        res.cookie("refresh_token", refresh_token, {
          httpOnly: true,
          secure: true,
          sameSite: "Strict", // or 'Lax', it depends
          maxAge: 86400 * 30, // 30 days
        });

        resolve(
          responseHandler.success(res, filterData, "Register successfully!")
        );
      } catch (error) {
        reject(responseHandler.internalServerError(res));
      }
    }),
  login: (req, res) =>
    new Promise(async (resolve, reject) => {
      try {
        const userExist = await usersDb.findOne({
          email: req.body.email,
        });
        if (!userExist) {
          return resolve(responseHandler.notFound(res, "Email not found!"));
        }

        // Validate password
        const isValidPassword = await passwordHandler.compare(
          req.body.password,
          userExist.password
        );

        if (!isValidPassword)
          return resolve(
            responseHandler.unauthorized(res, "Password invalid!")
          );

        // Filter response data with include or exclude keys data
        const filterData = arrtributesHandler.filter(userExist, {
          excludes: ["password"],
        });

        // Publish token
        const access_token = await tokenHandler.generateTokens(
          filterData,
          "300s"
        );
        const refresh_token = await tokenHandler.generateTokens(filterData);

        filterData["access_token"] = access_token;
        filterData["refresh_token"] = refresh_token;
        filterData["exp"] = parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN);

        res.cookie("refresh_token", refresh_token, {
          httpOnly: true,
          secure: true,
          sameSite: "none", // or 'Lax', it depends
          maxAge: 86400 * 30, // 30 days
        });

        resolve(
          responseHandler.success(res, filterData, "Login is successfully!")
        );
      } catch (error) {
        reject(responseHandler.internalServerError(res));
      }
    }),
  refreshToken: (req, res) =>
    new Promise(async (resolve, reject) => {
      try {
        // TODO: return new access token
        const newAccessToken = await tokenHandler.generateTokens(
          req?.user,
          "300s"
        );

        const newRefreshToken = await tokenHandler.generateTokens(req?.user);

        // TODO: save token to redis

        resolve(
          responseHandler.success(
            res,
            {
              access_token: newAccessToken,
              refresh_token: newRefreshToken,
              exp: parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN),
            },
            "Ok"
          )
        );
      } catch (error) {
        console.log("error: ", error);
        return reject(responseHandler.internalServerError(res));
      }
    }),
  logout: (req, res) =>
    new Promise(async (resolve, reject) => {
      try {
        const newRefreshToken = await tokenHandler.generateTokens(req?.user);

        // TODO: delete token in redis
        const refreshToken = req.headers.token.split(" ")[1];

        resolve(responseHandler.success(res, null, "Logout successfully!"));
      } catch (error) {
        console.log("error: ", error);
        return reject(responseHandler.internalServerError(res));
      }
    }),
};
