"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.productController = void 0;
var _services = require("../services");
var productController = {
  findAll: _services.productService.findAll,
  findById: _services.productService.findById,
  findByConditions: _services.productService.findByConditions,
  create: _services.productService.create,
  update: _services.productService.update,
  deleteById: _services.productService.deleteById,
  deleteByConditions: _services.productService.deleteByConditions,
  filters: _services.productService.filters,
  // product infos
  findInfoByProductId: _services.productService.findInfoByProductId,
  findInfoById: _services.productService.findInfoById,
  createInfoForProductId: _services.productService.createInfoForProductId,
  updateInfoById: _services.productService.updateInfoById,
  deleteInfoByConditional: _services.productService.deleteInfoByConditional
};
exports.productController = productController;