"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.objectHandler = void 0;
var objectHandler = {
  removeKeysInObject: function removeKeysInObject(data, keys) {
    keys.map(function (key) {
      if (data[key]) delete data[key];
    });
    return data;
  },
  removeKeysInArray: function removeKeysInArray(data, keys) {
    data === null || data === void 0 ? void 0 : data.map(function (item, idx) {
      keys.map(function (key) {
        if (item.dataValues[key]) delete item.dataValues[key];
      });
    });
    return data;
  },
  filterKeysInObject: function filterKeysInObject(data, keys) {
    var newData = {};
    keys.map(function (key) {
      if (data[key]) newData[key] = data[key];
    });
    return newData;
  },
  filterKeysInArray: function filterKeysInArray(data, keys) {
    var newData = [];
    data.map(function (item, idx) {
      var newObject = {};
      keys.map(function (key) {
        if (item.dataValues[key]) newObject[key] = item.dataValues[key];
      });
      newData.push(newObject);
    });
    console.log("newData: ", newData);
    return newData;
  }
};
exports.objectHandler = objectHandler;