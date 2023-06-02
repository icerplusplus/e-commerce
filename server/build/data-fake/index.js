"use strict";

var _require = require("./products"),
  productSeeder = _require.productSeeder;
var _require2 = require("./product_info"),
  productInfosSeeder = _require2.productInfosSeeder;
var _require3 = require("./categories"),
  categorySeeder = _require3.categorySeeder;
var _require4 = require("./collects"),
  collectSeeder = _require4.collectSeeder;
module.exports = {
  productSeeder: productSeeder,
  categorySeeder: categorySeeder,
  collectSeeder: collectSeeder,
  productInfosSeeder: productInfosSeeder
};