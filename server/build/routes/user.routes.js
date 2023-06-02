"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userRoutes = void 0;
var _express = _interopRequireDefault(require("express"));
var _controllers = require("../controllers");
var _middlewares = require("../middlewares");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.get("", _controllers.userController.findAll);
router.get("/conditions", _controllers.userController.findByConditions);
router.get("/:id", _controllers.userController.findById);
router.post("/create", _middlewares.authorsHandler.verifyTokenAndAdmin, _controllers.userController.create);
router.put("/update", _middlewares.authorsHandler.verifyTokenAndAdmin, _controllers.userController.update);
router["delete"]("/delete/:id", _middlewares.authorsHandler.verifyTokenAndAdmin, _controllers.userController.deleteById);
router["delete"]("/delete-by-conditions", _middlewares.authorsHandler.verifyTokenAndAdmin, _controllers.userController.deleteByConditions);
router.put("/change-password", _middlewares.authorsHandler.verifyTokenAndAuthorization, _controllers.userController.updatePassword);
var userRoutes = router;
exports.userRoutes = userRoutes;