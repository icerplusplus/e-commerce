"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _response = require("./response.middleware");
Object.keys(_response).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _response[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _response[key];
    }
  });
});
var _authors = require("./authors.middleware");
Object.keys(_authors).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _authors[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _authors[key];
    }
  });
});