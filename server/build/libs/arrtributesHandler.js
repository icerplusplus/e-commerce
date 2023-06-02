"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.arrtributesHandler = void 0;
var _libs = require("../libs");
var arrtributesHandler = {
  filter: function filter(data) {
    var arrtributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      includes: [],
      excludes: []
    };
    if (!data) return data;
    if (arrtributes.includes && arrtributes.includes.length > 0) {
      return _libs.objectHandler.filterKeysInObject(data, arrtributes.includes);
    }
    if (arrtributes.excludes && arrtributes.excludes.length > 0) {
      return _libs.objectHandler.removeKeysInObject(data, arrtributes.excludes);
    }
    return data;
  },
  filters: function filters(data) {
    var arrtributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      includes: [],
      excludes: []
    };
    if (!data || data.length === 0) return data;
    if (arrtributes.includes && arrtributes.includes.length > 0) {
      return _libs.objectHandler.filterKeysInArray(data, arrtributes.includes);
    }
    if (arrtributes.excludes && arrtributes.excludes.length > 0) {
      return _libs.objectHandler.removeKeysInArray(data, arrtributes.excludes);
    }
    return data;
  }
};
exports.arrtributesHandler = arrtributesHandler;