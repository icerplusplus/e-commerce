import bcrypt from "bcrypt";

export const passwordHandler = {
  hashPassword: async (password) =>
    new Promise(async (resolve, reject) => {
      try {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);
        resolve(hashed);
      } catch (error) {
        reject(null);
      }
    }),
  compare: (password, passwordHashed) =>
    new Promise(async (resolve, reject) => {
      try {
        const result = await bcrypt.compare(password, passwordHashed);
        resolve(result);
      } catch (error) {
        reject(false);
      }
    }),
};
