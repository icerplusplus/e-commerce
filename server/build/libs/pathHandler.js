"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pathHandler = void 0;
var pathHandler = {
  rootDirName: __dirname.split("\\").filter(function (key) {
    return key !== __dirname.split("\\").pop();
  }).join("\\")
};
exports.pathHandler = pathHandler;