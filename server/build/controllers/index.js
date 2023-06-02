"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _auth = require("./auth.controller");
Object.keys(_auth).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _auth[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _auth[key];
    }
  });
});
var _user = require("./user.controller");
Object.keys(_user).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _user[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _user[key];
    }
  });
});
var _product = require("./product.controller");
Object.keys(_product).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _product[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _product[key];
    }
  });
});
var _category = require("./category.controller");
Object.keys(_category).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _category[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _category[key];
    }
  });
});
var _collect = require("./collect.controller");
Object.keys(_collect).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _collect[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _collect[key];
    }
  });
});