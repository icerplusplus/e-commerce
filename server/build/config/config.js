"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configHandler = void 0;
var _dotenv = _interopRequireDefault(require("dotenv"));
var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var configHandler = function configHandler(app) {
  _dotenv["default"].config();
  app.use((0, _cors["default"])({
    origin: "*",
    // process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }));
  app.use(_express["default"].json());
  app.use(_express["default"].urlencoded({
    extended: true
  }));
};
exports.configHandler = configHandler;