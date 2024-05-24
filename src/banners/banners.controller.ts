import { Request, Response } from "express";
import { BannersService } from "./banners.service";
import { Banner } from "./banner.model";

interface BannersControllerMethods {
  [key: string]: (req: Request, res: Response) => Response<unknown>;
}
export class BannersController {
  user: any[];
  constructor(
    private readonly bannersService: BannersService = new BannersService()
  ) {
    this.user = [{ id: 1, name: "snahashis" }];
    const methodNames = Object.getOwnPropertyNames(
      Object.getPrototypeOf(this)
    ).filter(
      (method) =>
        method !== "constructor" &&
        typeof (this as unknown as BannersControllerMethods)[method] ===
          "function"
    );

    methodNames.forEach((method) => {
      (this as unknown as BannersControllerMethods)[method] = (
        this as unknown as BannersControllerMethods
      )[method].bind(this);
    });

    // this.getBannerById = this.getBannerById.bind(this);
    // this.getBanners = this.getBanners.bind(this);
    // this.createBanner = this.createBanner.bind(this);
    // this.updateBanner = this.updateBanner.bind(this);
    // this.deleteBanner = this.deleteBanner.bind(this);
  }

  public createBanner(req: Request, res: Response): Response<Banner> {
    const newBanner: Banner = req.body;
    const createdBanner = this.bannersService.createBanner(newBanner);
    return res.status(201).json(createdBanner);
  }
  public getBanners(req: Request, res: Response): Response<Banner[]> {
    const banners = this.bannersService.getBanners();
    console.log("this in getBanners:", this);
    console.log("this.user in getBanners:", this.user);
    return res.status(200).json(banners);
  }
  public getBannerById(
    req: Request,
    res: Response
  ): Response<Banner | { message: string }> {
    const { id } = req.params;
    const banner = this.bannersService.getBannerById(parseInt(id));
    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    return res.status(200).json(banner);
  }
  public updateBanner(
    req: Request,
    res: Response
  ): Response<Banner | { message: string }> {
    const { id } = req.params;
    const updatedBanner: Banner = req.body;
    const result = this.bannersService.updateBanner(
      parseInt(id),
      updatedBanner
    );

    if (!result) {
      return res.status(404).json({ message: "Banner not found" });
    }

    return res.status(200).json(result);
  }

  public deleteBanner(
    req: Request,
    res: Response
  ): Response<{ message: string }> {
    const { id } = req.params;
    const success = this.bannersService.deleteBanner(parseInt(id));

    if (!success) {
      return res.status(404).json({ message: "Banner not found" });
    }

    return res.status(200).json({ message: "Banner deleted successfully" });
  }
}
