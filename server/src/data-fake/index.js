const { productSeeder } = require("./products");
const { productInfosSeeder } = require("./product_info");
const { categorySeeder } = require("./categories");
const { collectSeeder } = require("./collects");

module.exports = {
  productSeeder,
  categorySeeder,
  collectSeeder,
  productInfosSeeder,
};
