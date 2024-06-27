import { Request, Response } from "express";
import { NumberService } from "./number.service";


export class NumberController {
  constructor(
    private readonly numberService: NumberService = new NumberService()
  ) {
    // Get method names  
    const methodNames = Object.getOwnPropertyNames(
      Object.getPrototypeOf(this)
    ).filter(
      (name) =>
        typeof this[name as keyof this] === "function" &&
        name !== "constructor"
    );
    // To each method, bind reference to 'this'
    methodNames.forEach((name) => {
      const fn = this[name as keyof this] as Function;
      this[name as keyof this] = fn.bind(this);
    });
  }

  public async processNumber(req: Request, res: Response) {
    const { number } = req.body;
        const result = await this.numberService.processNumber(number);
        return res.json(result);
    // return res.status(201).json(createdBanner);
  }
  public async getAllNumbers(req: Request, res: Response) {
    const result = await this.numberService.getAllNumbers();
    res.json(result);
    // return res.status(200).json(banners);
  }
}
