import fs from "fs";
import path from "path";
import { Banner } from "./banner.model";

export class BannersService {
  private filePath: string = path.join(__dirname, "../../public/banners.json");
  private readBannersFromFile(): Banner[] {
    const fileContent = fs.readFileSync(this.filePath, "utf-8");
    return JSON.parse(fileContent);
  }

  private writeBannersToFile(banners: Banner[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(banners, null, 2));
  }

  public getBanners(): Banner[] {
    const banners = this.readBannersFromFile();
    return banners;
  }
  public createBanner(newBanner: Banner): Banner | { error: string } {
    

    const banners = this.getBanners();
    const maxId = banners.reduce(
      (max, banner) => (banner.id > max ? banner.id : max),
      0
    );
    newBanner.id = maxId + 1;
    banners.push(newBanner);
    this.writeBannersToFile(banners);
    return newBanner;
  }

  public updateBanner(id: number, updatedBanner: Banner): Banner | null {
    const banners = this.getBanners();
    const bannerIndex = banners.findIndex((banner) => banner.id === id);
    if (bannerIndex === -1) return null;


    banners[bannerIndex] = { ...banners[bannerIndex], ...updatedBanner };
    this.writeBannersToFile(banners);
    return banners[bannerIndex];
  }

  public deleteBanner(id: number): boolean {
    const banners = this.getBanners();
    const bannerIndex = banners.findIndex((banner) => banner.id === id);

    if (bannerIndex === -1) return false;

    banners.splice(bannerIndex, 1);
    this.writeBannersToFile(banners);
    return true;
  }

  public getBannerById(id: number): Banner | null {
    const banners = this.getBanners();
    return banners.find((banner) => banner.id === id) || null;
  }
}
