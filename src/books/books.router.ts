import { Router } from "express";
import { BooksController } from "./books.controller";

export class BooksRouter {
  constructor(
    public router = Router(),
    private readonly booksController: BooksController = new BooksController()
  ) {
    this.initRoutes();
  }
  private initRoutes() {
    this.router.post("/create", this.booksController.createBooks);
  }
}
