"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.productRoutes = void 0;
var _express = _interopRequireDefault(require("express"));
var _controllers = require("../controllers");
var _middlewares = require("../middlewares");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.get("", _controllers.productController.findAll);
router.post("/conditions", _controllers.productController.findByConditions);
router.get("/:id", _controllers.productController.findById);
router.post("/create", _middlewares.authorsHandler.verifyTokenAndAdmin, _controllers.productController.create);
router.post("/filters", _controllers.productController.filters);
router.put("/update", _middlewares.authorsHandler.verifyTokenAndAdmin, _controllers.productController.update);
router["delete"]("/delete/:id", _middlewares.authorsHandler.verifyTokenAndAdmin, _controllers.productController.deleteById);
router["delete"]("/delete-by-conditions", _middlewares.authorsHandler.verifyTokenAndAdmin, _controllers.productController.deleteByConditions);

// product info
router.get("/infos/:id", _controllers.productController.findInfoByProductId);
router.get("/info/:id", _controllers.productController.findInfoById);
router.post("/info/create", _middlewares.authorsHandler.verifyTokenAndAdmin, _controllers.productController.createInfoForProductId);
router.put("/info/update", _middlewares.authorsHandler.verifyTokenAndAdmin, _controllers.productController.updateInfoById);
router["delete"]("/info/delete-by-conditions", _middlewares.authorsHandler.verifyTokenAndAdmin, _controllers.productController.deleteInfoByConditional);
var productRoutes = router;
exports.productRoutes = productRoutes;