import { Request, Response } from "express";
import ProductsService from "./products.service";

class ProductController {
  async getAllProducts(req: Request, res: Response) {
    try {
      const page_no = parseInt(req.query.page as string) || 1;
      const per_page = parseInt(req.query.limit as string) || 10;
      const searchKeyword = req.query.name as string;

      const paginatedItems = await ProductsService.getAllProducts(
        page_no,
        per_page,
        searchKeyword
      );

      // Send response with products and pagination metadata
      res.status(200).json(paginatedItems);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
}

export default new ProductController();
