import { Router } from "express";
import { BannersController } from "./banners.controller";
import { BannersService } from "./banners.service";

export class BannersRouter {
  constructor(
    public router = Router(),
    private readonly bannersController: BannersController = new BannersController()
  ) {
    this.initRoutes();
  }
  private initRoutes() {
    this.router.get("/:id", this.bannersController.getBannerById);
    this.router.get("/get/all", this.bannersController.getBanners);
    this.router.post("/create", this.bannersController.createBanner);
    this.router.put("/update/:id", this.bannersController.updateBanner);
    this.router.delete("/delete/:id", this.bannersController.deleteBanner);
  }
}
