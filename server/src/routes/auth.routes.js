import expess from "express";
import { authController } from "../controllers";
import { authorsHandler } from "../middlewares";

const router = expess.Router();

router.post("/login", authController.login);
router.post("/register", authController.register);
router.delete(
  "/logout",
  authorsHandler.verifyTokenAndAuthorization,
  authController.logout
);
router.get(
  "/refresh-token",
  authorsHandler.verifyToken,
  authController.refreshToken
);

export const authRoutes = router;
