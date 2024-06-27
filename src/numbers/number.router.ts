import { Router } from "express";
import { NumberController } from "./number.controller";

export class NumberRouter {
  constructor(
    public router = Router(),
    private readonly numberController: NumberController = new NumberController()
  ) {
    this.initRoutes();
  }
  private initRoutes() {
    this.router.post("/", this.numberController.processNumber);
    this.router.get("/", this.numberController.getAllNumbers);
  }
}
