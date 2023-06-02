"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.whereClause = exports.orderByClause = void 0;
var _sequelize = require("sequelize");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// Condition with Key types
var whereClause = function whereClause(key) {
  var result;
  switch (key) {
    case "HOT":
      result = {
        quantity_sold: _defineProperty({}, _sequelize.Op.gt, 100)
      };
      break;
    case "NEW":
      result = {
        createdAt: _defineProperty({}, _sequelize.Op.gte, new Date(new Date() - 7 * 24 * 60 * 60 * 1000))
      };
      break;
    default:
      break;
  }
  return result;
};
exports.whereClause = whereClause;
var orderByClause = function orderByClause(key) {
  var result;
  switch (key) {
    case "ASC":
      result = {
        order: [["root_price", "ASC"]]
      };
      break;
    case "DESC":
      result = {
        order: [["root_price", "DESC"]]
      };
      break;
    default:
      break;
  }
  return result;
};
exports.orderByClause = orderByClause;