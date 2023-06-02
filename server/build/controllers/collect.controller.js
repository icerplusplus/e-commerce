"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.collectController = void 0;
var _services = require("../services");
var collectController = {
  findAll: _services.collectService.findAll,
  findById: _services.collectService.findById,
  findByConditions: _services.collectService.findByConditions,
  create: _services.collectService.create,
  update: _services.collectService.update,
  deleteById: _services.collectService.deleteById,
  deleteByConditions: _services.collectService.deleteByConditions
};
exports.collectController = collectController;