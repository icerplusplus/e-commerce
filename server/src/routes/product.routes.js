import expess from "express";
import { productController } from "../controllers";
import { authorsHandler } from "../middlewares";

const router = expess.Router();

router.get("", productController.findAll);
router.post("/conditions", productController.findByConditions);
router.get("/:id", productController.findById);
router.post(
  "/create",
  authorsHandler.verifyTokenAndAdmin,
  productController.create
);

router.post("/filters", productController.filters);

router.put(
  "/update",
  authorsHandler.verifyTokenAndAdmin,
  productController.update
);

router.delete(
  "/delete/:id",
  authorsHandler.verifyTokenAndAdmin,
  productController.deleteById
);

router.delete(
  "/delete-by-conditions",
  authorsHandler.verifyTokenAndAdmin,
  productController.deleteByConditions
);

// product info
router.get("/infos/:id", productController.findInfoByProductId);
router.get("/info/:id", productController.findInfoById);
router.post(
  "/info/create",
  authorsHandler.verifyTokenAndAdmin,
  productController.createInfoForProductId
);
router.put(
  "/info/update",
  authorsHandler.verifyTokenAndAdmin,
  productController.updateInfoById
);
router.delete(
  "/info/delete-by-conditions",
  authorsHandler.verifyTokenAndAdmin,
  productController.deleteInfoByConditional
);

export const productRoutes = router;
