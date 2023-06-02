import expess from "express";
import { userController } from "../controllers";
import { authorsHandler } from "../middlewares";

const router = expess.Router();

router.get("", userController.findAll);
router.get("/conditions", userController.findByConditions);
router.get("/:id", userController.findById);

router.post(
  "/create",
  authorsHandler.verifyTokenAndAdmin,
  userController.create
);

router.put(
  "/update",
  authorsHandler.verifyTokenAndAdmin,
  userController.update
);

router.delete(
  "/delete/:id",
  authorsHandler.verifyTokenAndAdmin,
  userController.deleteById
);

router.delete(
  "/delete-by-conditions",
  authorsHandler.verifyTokenAndAdmin,
  userController.deleteByConditions
);

router.put(
  "/change-password",
  authorsHandler.verifyTokenAndAuthorization,
  userController.updatePassword
);

export const userRoutes = router;
