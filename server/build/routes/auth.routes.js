"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authRoutes = void 0;
var _express = _interopRequireDefault(require("express"));
var _controllers = require("../controllers");
var _middlewares = require("../middlewares");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.post("/login", _controllers.authController.login);
router.post("/register", _controllers.authController.register);
router["delete"]("/logout", _middlewares.authorsHandler.verifyTokenAndAuthorization, _controllers.authController.logout);
router.get("/refresh-token", _middlewares.authorsHandler.verifyToken, _controllers.authController.refreshToken);
var authRoutes = router;
exports.authRoutes = authRoutes;