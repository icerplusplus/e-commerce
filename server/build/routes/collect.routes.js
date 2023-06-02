"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.collectRoutes = void 0;
var _express = _interopRequireDefault(require("express"));
var _controllers = require("../controllers");
var _middlewares = require("../middlewares");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.get("", _controllers.collectController.findAll);
router.get("/conditions", _controllers.collectController.findByConditions);
router.get("/:id", _controllers.collectController.findById);
router.post("/create", _middlewares.authorsHandler.verifyTokenAndAdmin, _controllers.collectController.create);
router.put("/update", _middlewares.authorsHandler.verifyTokenAndAdmin, _controllers.collectController.update);
router["delete"]("/delete/:id", _middlewares.authorsHandler.verifyTokenAndAdmin, _controllers.collectController.deleteById);
router["delete"]("/delete-by-conditions", _middlewares.authorsHandler.verifyTokenAndAdmin, _controllers.collectController.deleteByConditions);
var collectRoutes = router;
exports.collectRoutes = collectRoutes;