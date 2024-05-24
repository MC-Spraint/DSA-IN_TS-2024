import { Router } from "express";
import usersRouter from "./users/user.router";
import productsRouter from "./products/products.router";
import { BannersRouter } from "./banners/banner.router";

export class BaseRouter {
  constructor(public router = Router()) {
    this.initRoutes();
  }
  initRoutes() {
    this.router.use("/users", usersRouter);
    this.router.use("/products", productsRouter);
    this.router.use("/banners", new BannersRouter().router);
  }
}
