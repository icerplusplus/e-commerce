"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authController = void 0;
var _services = require("../services");
var authController = {
  login: _services.authService.login,
  register: _services.authService.register,
  logout: _services.authService.logout,
  refreshToken: _services.authService.refreshToken
};
exports.authController = authController;