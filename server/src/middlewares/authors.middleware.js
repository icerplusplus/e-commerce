import { tokenHandler } from "../libs";
import { responseHandler } from "./response.middleware";

export const authorsHandler = {
  verifyToken: (req, res, next) =>
    new Promise(async (resolve, reject) => {
      try {
        const token = req.headers.token;
        if (token) {
          const { isValid, user, message } =
            await tokenHandler.checkTokenIsValid(token);
        
          if (!isValid) {
            return resolve(responseHandler.tokenInValid(res, message));
          } else {
            req.user = user.data;
            next();
          }
        } else {
          reject(
            responseHandler.tokenInValid(res, "Please register or login!")
          );
        }
      } catch (error) {
        reject(responseHandler.internalServerError(res));
      }
    }),
  verifyTokenAndAuthorization: (req, res, next) =>
    new Promise(async (resolve, reject) => {
      try {
        await authorsHandler.verifyToken(req, res, () => {
          if (
            req.user.id === req.params.id ||
            req.user.id === req.body.id ||
            req.user.is_admin
          ) {
            next();
          } else {
            resolve(responseHandler.forbidden(res));
          }
        });
      } catch (error) {
        reject(responseHandler.internalServerError(res));
      }
    }),

  verifyTokenAndAdmin: (req, res, next) =>
    new Promise(async (resolve, reject) => {
      try {
        await authorsHandler.verifyToken(req, res, () => {
          if (req.user?.is_admin) {
            next();
          } else {
            resolve(
              responseHandler.forbidden(
                res,
                "You're not allowed to access this roles"
              )
            );
          }
        });
      } catch (error) {
        reject(responseHandler.internalServerError(res));
      }
    }),
};
