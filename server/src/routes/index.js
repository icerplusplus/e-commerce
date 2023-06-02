import { authRoutes } from "./auth.routes";
import { userRoutes } from "./user.routes";
import { productRoutes } from "./product.routes";
import { categoryRoutes } from "./category.routes";
import { collectRoutes } from "./collect.routes";

export const initialRoute = (app) => {
  app.use("/api/auths", authRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/categories", categoryRoutes);
  app.use("/api/products", productRoutes);
  app.use("/api/collects", collectRoutes);
};
