import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const tokenHandler = {
  generateTokens: (
    data,
    expiresIn = parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN)
  ) => {
    const { access_token, refresh_token, ...tokenDetail } = data;
    return jwt.sign(
      {
        data: tokenDetail,
      },
      process.env.JWT_SECRET,
      { expiresIn: expiresIn }
    );
  },
  checkTokenIsValid: (token) =>
    new Promise((resolve, reject) => {
      try {
        if (token) {
          const accessToken = token.split(" ")[1];
          jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
            if (err && err.message === "jwt expired") {
              return resolve({
                isValid: false,
                user: user,
                message: "Token expired!",
              });
            } else if (err && err.message !== "jwt expired") {
              return resolve({
                isValid: false,
                user: user,
                message: err.message,
              });
            }
            return resolve({ isValid: true, user });
          });
        } else {
          return resolve({ isValid: false, user });
        }
      } catch (error) {
        return reject(false);
      }
    }),
};
