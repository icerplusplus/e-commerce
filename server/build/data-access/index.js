"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usersDb = exports.productDb = exports.collectDb = exports.categoryDb = void 0;
var _models = require("../models");
var _users = require("./users.db");
var _product = require("./product.db");
var _category = require("./category.db");
var _collect = require("./collect.db");
var usersDb = (0, _users.makeUsersDb)(_models.db);
exports.usersDb = usersDb;
var productDb = (0, _product.makeProductsDb)(_models.db);
exports.productDb = productDb;
var categoryDb = (0, _category.makeCategoriesDb)(_models.db);
exports.categoryDb = categoryDb;
var collectDb = (0, _collect.makeCollectsDb)(_models.db);
exports.collectDb = collectDb;