"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userController = void 0;
var _services = require("../services");
var userController = {
  findAll: _services.userService.findAll,
  findByConditions: _services.userService.findByConditions,
  findById: _services.userService.findById,
  create: _services.userService.create,
  update: _services.userService.update,
  deleteById: _services.userService.deleteById,
  deleteByConditions: _services.userService.deleteByConditions,
  updatePassword: _services.userService.updatePassword,
  refreshToken: _services.userService.refreshToken
};
exports.userController = userController;