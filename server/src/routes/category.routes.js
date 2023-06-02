import expess from "express";
import { categoryController } from "../controllers";
import { authorsHandler } from "../middlewares";

const router = expess.Router();

router.get("", categoryController.findAll);
router.get("/conditions", categoryController.findByConditions);
router.get("/:id", categoryController.findById);

router.post(
  "/create",
  authorsHandler.verifyTokenAndAdmin,
  categoryController.create
);

router.put(
  "/update",
  authorsHandler.verifyTokenAndAdmin,
  categoryController.update
);

router.delete(
  "/delete/:id",
  authorsHandler.verifyTokenAndAdmin,
  categoryController.deleteById
);

router.delete(
  "/delete-by-conditions",
  authorsHandler.verifyTokenAndAdmin,
  categoryController.deleteByConditions
);

export const categoryRoutes = router;
