import { Request, Response } from "express";
import { BannersService } from "./banners.service";
import { Banner } from "./banner.model";


export class BannersController {
  constructor(
    private readonly bannersService: BannersService = new BannersService()
  ) {
    // Get method names  
    // const methodNames = Object.getOwnPropertyNames(
    //   Object.getPrototypeOf(this)
    // ).filter(
    //   (name) =>
    //     typeof this[name as keyof this] === "function" &&
    //     name !== "constructor"
    // );
    // // To each method, bind reference to 'this'
    // methodNames.forEach((name) => {
    //   const fn = this[name as keyof this] as Function;
    //   this[name as keyof this] = fn.bind(this);
    // });

    this.createBanner = this.createBanner.bind(this);
    this.getBanners = this.getBanners.bind(this);
    this.getBannerById = this.getBannerById.bind(this);
    this.updateBanner = this.updateBanner.bind(this);
    this.deleteBanner = this.deleteBanner.bind(this);
  }

  public createBanner(req: Request, res: Response): Response<Banner> {
    const newBanner: Banner = req.body;
    const createdBanner = this.bannersService.create(newBanner);
    return res.status(201).json(createdBanner);
  }
  public getBanners(req: Request, res: Response): Response<Banner[]> {
    const banners = this.bannersService.getAll();
    console.log("this in getBanners:", this);
    return res.status(200).json(banners);
  }
  public getBannerById(
    req: Request,
    res: Response
  ): Response<Banner | { message: string }> {
    const { id } = req.params;
    const banner = this.bannersService.getById(parseInt(id));
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
    const result = this.bannersService.update(
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
    const success = this.bannersService.delete(parseInt(id));

    if (!success) {
      return res.status(404).json({ message: "Banner not found" });
    }

    return res.status(200).json({ message: "Banner deleted successfully" });
  }
}
