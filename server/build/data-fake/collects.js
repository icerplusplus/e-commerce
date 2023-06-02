"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _require = require("uuid"),
  v4 = _require.v4;
var collects = [{
  title: "D\xE0nh cho b\u1EA1n",
  thumbnail: "https://salt.tikicdn.com/ts/personalish/f9/27/b5/3a8e2286a1c8fb91b67acc5ee35f82f0.png",
  products: "[]"
}, {
  title: "Deal si\xEAu hot",
  thumbnail: "https://salt.tikicdn.com/ts/personalish/41/99/9a/8898607d7fca4b79775a708c57a8152f.png",
  products: "[]"
}, {
  title: "R\u1EBB v\xF4 \u0111\u1ED1i",
  thumbnail: "https://salt.tikicdn.com/ts/personalish/0f/59/9d/215fa18ef72e430eefcbfe5355cab8e2.png",
  products: "[]"
}, {
  title: "H\xE0ng m\u1EDBi",
  thumbnail: "https://salt.tikicdn.com/ts/personalish/7d/8a/6e/d8b76e2c43cbd06b7e1aa3ab8c54df64.png",
  products: "[]"
}];
var newData = collects.map(function (collect) {
  return _objectSpread(_objectSpread({}, collect), {}, {
    id: v4()
  });
});
var collectSeeder = newData;
module.exports = {
  collectSeeder: collectSeeder
};