"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.categoryRoutes = void 0;
var _express = _interopRequireDefault(require("express"));
var _controllers = require("../controllers");
var _middlewares = require("../middlewares");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.get("", _controllers.categoryController.findAll);
router.get("/conditions", _controllers.categoryController.findByConditions);
router.get("/:id", _controllers.categoryController.findById);
router.post("/create", _middlewares.authorsHandler.verifyTokenAndAdmin, _controllers.categoryController.create);
router.put("/update", _middlewares.authorsHandler.verifyTokenAndAdmin, _controllers.categoryController.update);
router["delete"]("/delete/:id", _middlewares.authorsHandler.verifyTokenAndAdmin, _controllers.categoryController.deleteById);
router["delete"]("/delete-by-conditions", _middlewares.authorsHandler.verifyTokenAndAdmin, _controllers.categoryController.deleteByConditions);
var categoryRoutes = router;
exports.categoryRoutes = categoryRoutes;