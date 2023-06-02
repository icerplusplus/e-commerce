"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queryOption = void 0;
var queryOption = {
  insert: function insert(option) {
    var keys = Object.keys(option).join(", ");
    var values = Object.values(option);
    var questionCharaters = Object.keys(option).fill("?").join(", ");
    return {
      keys: keys,
      values: values,
      tmpValues: questionCharaters
    };
  },
  select: function select(option) {
    var values = Object.values(option);
    var keys = Object.keys(option).map(function (key) {
      return key + " = ?";
    }).join(" AND ");
    return {
      keys: keys,
      values: values
    };
  }
};
exports.queryOption = queryOption;