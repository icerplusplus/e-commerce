"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tokenHandler = void 0;
var _dotenv = _interopRequireDefault(require("dotenv"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _excluded = ["access_token", "refresh_token"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
_dotenv["default"].config();
var tokenHandler = {
  generateTokens: function generateTokens(data) {
    var expiresIn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN);
    var access_token = data.access_token,
      refresh_token = data.refresh_token,
      tokenDetail = _objectWithoutProperties(data, _excluded);
    return _jsonwebtoken["default"].sign({
      data: tokenDetail
    }, process.env.JWT_SECRET, {
      expiresIn: expiresIn
    });
  },
  checkTokenIsValid: function checkTokenIsValid(token) {
    return new Promise(function (resolve, reject) {
      try {
        if (token) {
          var accessToken = token.split(" ")[1];
          _jsonwebtoken["default"].verify(accessToken, process.env.JWT_SECRET, function (err, user) {
            if (err && err.message === "jwt expired") {
              return resolve({
                isValid: false,
                user: user,
                message: "Token expired!"
              });
            } else if (err && err.message !== "jwt expired") {
              return resolve({
                isValid: false,
                user: user,
                message: err.message
              });
            }
            return resolve({
              isValid: true,
              user: user
            });
          });
        } else {
          return resolve({
            isValid: false,
            user: user
          });
        }
      } catch (error) {
        return reject(false);
      }
    });
  }
};
exports.tokenHandler = tokenHandler;