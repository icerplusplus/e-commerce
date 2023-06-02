import fs from "fs";
import path from "path";

const basename = path.basename(__filename);

export let modelFunc = fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (
      file !== "index.js" &&
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .map((file) => {
    console.log("files: ", file);
    return require(`./${file}`);
  });
