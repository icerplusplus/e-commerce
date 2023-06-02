import expess from "express";
import { collectController } from "../controllers";
import { authorsHandler } from "../middlewares";

const router = expess.Router();

router.get("", collectController.findAll);
router.get("/conditions", collectController.findByConditions);
router.get("/:id", collectController.findById);
router.post(
  "/create",
  authorsHandler.verifyTokenAndAdmin,
  collectController.create
);

router.put(
  "/update",
  authorsHandler.verifyTokenAndAdmin,
  collectController.update
);

router.delete(
  "/delete/:id",
  authorsHandler.verifyTokenAndAdmin,
  collectController.deleteById
);

router.delete(
  "/delete-by-conditions",
  authorsHandler.verifyTokenAndAdmin,
  collectController.deleteByConditions
);

export const collectRoutes = router;
