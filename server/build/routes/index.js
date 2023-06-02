"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialRoute = void 0;
var _auth = require("./auth.routes");
var _user = require("./user.routes");
var _product = require("./product.routes");
var _category = require("./category.routes");
var _collect = require("./collect.routes");
var initialRoute = function initialRoute(app) {
  app.use("/api/auths", _auth.authRoutes);
  app.use("/api/users", _user.userRoutes);
  app.use("/api/categories", _category.categoryRoutes);
  app.use("/api/products", _product.productRoutes);
  app.use("/api/collects", _collect.collectRoutes);
};
exports.initialRoute = initialRoute;