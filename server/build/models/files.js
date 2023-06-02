"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modelFunc = void 0;
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var basename = _path["default"].basename(__filename);
var modelFunc = _fs["default"].readdirSync(__dirname).filter(function (file) {
  return file !== "index.js" && file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js" && file.indexOf(".test.js") === -1;
}).map(function (file) {
  console.log("files: ", file);
  return require("./".concat(file));
});
exports.modelFunc = modelFunc;