import fs from "fs";
import path from "path";
import { Banner } from "./banner.model";

abstract class FileOperations<T> {
  protected filePath = path.join(__dirname, "../../public/banners.json");

  // Read entities from file
  protected readFile(): T[] {
    try {
      const fileContent = fs.readFileSync(this.filePath, "utf-8");
      return JSON.parse(fileContent);
    } catch (error) {
      console.error("Error reading file:", error);
      return [];
    }
  }

  // Write entities to file
  protected writeFile(entities: T[]): void {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(entities, null, 2));
    } catch (error) {
      console.error("Error writing file:", error);
    }
  }

  // Abstract methods to be implemented by subclasses
  abstract create(newEntity: T): T | { error: string };
  abstract update(id: number, updatedEntity: T): T | null;
  abstract delete(id: number): boolean;
  abstract getById(id: number): T | null;
  abstract getAll(): T[];
}

export class BannersService extends FileOperations<Banner> {
  // Create a new banner
  create(createData: Omit<Banner, "id">): Banner {
    const arr = this.getAll();
    const maxId = arr.reduce(
      (max, elem) => (elem.id > max ? elem.id : max),
      0
    );
    const newEntity = { id: maxId + 1, ...createData };

    arr.push(newEntity);
    this.writeFile(arr);
    return newEntity;
  }

  // Update an existing banner
  update(
    id: number,
    update: Partial<Omit<Banner, "id">>
  ): Banner | null {
    const arr = this.getAll();
    const found = arr.find((elem) => elem.id === id);
    if (!found) return null;
    const filteredArr = arr.filter((elem) => elem.id !== found.id);
    const newEntity = { id: found.id, ...update } as Banner;

    filteredArr.push(newEntity);
    this.writeFile(filteredArr);
    return newEntity;
  }

  // Delete a banner by its ID
  delete(id: number): boolean {
    const arr = this.getAll();
    const i = arr.findIndex((elem) => elem.id === id);
    if (i === -1) return false;
    arr.splice(i, 1);
    this.writeFile(arr);
    return true;
  }

  // Get a banner by its ID
  getById(id: number): Banner | null {
    const banners = this.getAll();
    return banners.find((banner) => banner.id === id) || null;
  }

  // Get all banners
  getAll(): Banner[] {
    return this.readFile();
  }
}
