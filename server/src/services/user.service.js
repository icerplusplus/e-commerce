import bcrypt from "bcrypt";
import { usersDb } from "../repositories";
import { passwordHandler, arrtributesHandler, tokenHandler } from "../libs";
import { responseHandler } from "../middlewares";

export const userService = {
  findAll: (req, res) =>
    new Promise(async (resolve, reject) => {
      try {
        const users = await usersDb.findAll({
          page: parseInt(req.query.page || 1),
          size: parseInt(req.query.size || 10),
        });

        resolve(responseHandler.success(res, users, "Ok"));
      } catch (error) {
        reject(responseHandler.internalServerError(res));
      }
    }),
  findByConditions: (req, res) =>
    new Promise(async (resolve, reject) => {
      try {
        const users = await usersDb.findByConditions(
          req.body,
          {
            page: parseInt(req.query.page || 1),
            size: parseInt(req.query.size || 10),
          },
          { excludes: ["password"] }
        );

        if (!users) {
          return resolve(responseHandler.notFound(res, "Users not found!"));
        }

        resolve(responseHandler.success(res, users, "Ok"));
      } catch (error) {
        reject(responseHandler.internalServerError(res));
      }
    }),
  findById: (req, res) =>
    new Promise(async (resolve, reject) => {
      try {
        const user = await usersDb.findById(req.params.id, {
          excludes: ["password"],
        });

        if (!user)
          return resolve(responseHandler.notFound(res, "User not found!"));

        resolve(responseHandler.success(res, user, "Ok"));
      } catch (error) {
        reject(responseHandler.internalServerError(res));
      }
    }),

  findOne: (req, res) =>
    new Promise(async (resolve, reject) => {
      try {
        const user = await usersDb.findOne(
          {
            id: req.params.id,
          },
          { excludes: ["password"] }
        );

        resolve(responseHandler.success(res, user, "Ok"));
      } catch (error) {
        reject(responseHandler.internalServerError(res));
      }
    }),
  create: (req, res) =>
    new Promise(async (resolve, reject) => {
      try {
        const userExist = await usersDb.findOne({ email: req.body.email });
        if (userExist)
          return resolve(responseHandler.conflict(res, "Email is existed!"));

        const hashPassword = await passwordHandler.hashPassword(
          req.body?.password || "User123@"
        );

        // Filter response data with include or exclude keys data
        const filterData = arrtributesHandler.filter(req.body, {
          excludes: ["password"],
        });

        // Publish tokens
        const access_token = await tokenHandler.generateTokens(filterData);
        const refresh_token = await tokenHandler.generateTokens(
          filterData,
          "7d"
        );

        filterData["access_token"] = access_token;
        filterData["refresh_token"] = refresh_token;

        const newUser = await usersDb.create({
          ...filterData,
          password: hashPassword,
        });

        resolve(responseHandler.success(res, newUser, "Ok"));
      } catch (error) {
        reject(responseHandler.internalServerError(res));
      }
    }),
  update: (req, res) =>
    new Promise(async (resolve, reject) => {
      try {
        const userExist = await usersDb.findById(req.body.id);
        if (!userExist)
          return resolve(responseHandler.notFound(res, "User not found!"));

        // Check email is valid ?
        const emailExist = await usersDb.findOne({ email: req.body.email });
        if (emailExist && emailExist.id !== req.body.id)
          return resolve(responseHandler.conflict(res, "Email is existed!"));

        if (req.body?.password) {
          const hashPassword = await passwordHandler.hashPassword(
            req.body?.password
          );
          const updatedUser = await usersDb.update(
            {
              ...req.body,
              password: hashPassword,
            },
            {
              id: req.body.id,
            }
          );
        }
        const updatedUser = await usersDb.update(req.body, {
          id: req.body.id,
        });

        if (!updatedUser)
          return resolve(
            responseHandler.unprocessableEntity(
              res,
              "Progessing have been error"
            )
          );

        resolve(responseHandler.success(res, updatedUser, "Ok"));
      } catch (error) {
        reject(responseHandler.internalServerError(res));
      }
    }),
  updatePassword: (req, res) =>
    new Promise(async (resolve, reject) => {
      try {
        const userExist = await usersDb.findById(req.body.id);
        if (!userExist)
          return resolve(responseHandler.notFound(res, "UserID is not valid!"));
        // Validate password
        const isValidPassword = await passwordHandler.compare(
          req.body.password,
          userExist.password
        );

        if (!isValidPassword) {
          return resolve(
            responseHandler.success(res, {}, "Password is not valid!")
          );
        }

        // Hash password
        const hashPassword = await passwordHandler.hashPassword(
          req.body.newPassword
        );

        // Update
        const result = await usersDb.update(
          { ...userExist, password: hashPassword },
          { id: req.body.id }
        );

        resolve(
          responseHandler.success(res, result, "Password have been updated!")
        );
      } catch (error) {
        reject(responseHandler.internalServerError(res));
      }
    }),
  deleteById: (req, res) =>
    new Promise(async (resolve, reject) => {
      try {
        const userExist = await usersDb.findById(req.params.id);
        if (!userExist)
          return resolve(responseHandler.notFound(res, "User not found!"));

        await usersDb.deleteById(req.params.id);
        resolve(responseHandler.success(res, {}, "User have been removed!"));
      } catch (error) {
        reject(responseHandler.internalServerError(res));
      }
    }),
  deleteByConditions: (req, res) =>
    new Promise(async (resolve, reject) => {
      try {
        const countNumber = await usersDb.countRowsWithConditions(req.body);
        if (countNumber === 0)
          return resolve(
            responseHandler.notFound(res, "'Where conditions' not exactly!")
          );

        await usersDb.deleteByConditions(req.body);
        resolve(responseHandler.success(res, {}, "Users have been removed!"));
      } catch (error) {
        reject(responseHandler.internalServerError(res));
      }
    }),
};
