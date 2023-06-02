"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.responseHandler = void 0;
var _httpErrors = _interopRequireDefault(require("http-errors"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var responseHandler = {
  success: function success(res, data) {
    var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
    return res.status(200).json({
      status: 200,
      message: message || "",
      data: data || null
    });
  },
  unprocessableEntity: function unprocessableEntity(res) {
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    var error = _httpErrors["default"].UnprocessableEntity();
    return res.status(200).json({
      status: error.status,
      message: message || ""
    });
  },
  tokenInValid: function tokenInValid(res) {
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    return res.status(200).json({
      status: 401,
      message: message || ""
    });
  },
  unauthorized: function unauthorized(res) {
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    var error = _httpErrors["default"].Unauthorized();
    return res.status(200).json({
      status: error.status,
      message: message || ""
    });
  },
  forbidden: function forbidden(res) {
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    var error = _httpErrors["default"].Forbidden();
    return res.status(200).json({
      status: error.status,
      message: message || "You're not allowed to do that!"
    });
  },
  internalServerError: function internalServerError(res) {
    var error = _httpErrors["default"].InternalServerError();
    return res.status(200).json({
      status: error.status,
      message: error.message
    });
  },
  notFound: function notFound(res) {
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    var error = _httpErrors["default"].NotFound();
    return res.status(200).json({
      status: error.status,
      message: message || error.message
    });
  },
  conflict: function conflict(res) {
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    var error = _httpErrors["default"].Conflict();
    return res.status(200).json({
      status: error.status,
      message: message || error.message
    });
  }
};
exports.responseHandler = responseHandler;