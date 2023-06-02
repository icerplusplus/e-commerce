"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.categoryController = void 0;
var _services = require("../services");
var categoryController = {
  findAll: _services.categoryService.findAll,
  findById: _services.categoryService.findById,
  findByConditions: _services.categoryService.findByConditions,
  create: _services.categoryService.create,
  update: _services.categoryService.update,
  deleteById: _services.categoryService.deleteById,
  deleteByConditions: _services.categoryService.deleteByConditions
};
exports.categoryController = categoryController;