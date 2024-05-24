import { Request, Response } from "express";
import Product from "./product.schema";

class ProductsService {
  public async getAllProducts(page_no?: number, per_page?: number, searchKeyword?: string) {
    try {
      const total_entity = await Product.countDocuments();

      const page = page_no || 1;
      const limit = per_page || total_entity;
      const total_pages = Math.ceil(total_entity / limit);
      const pre_page = page === 1 ? null : page - 1;
      const next_page = total_pages <= page ? null : page + 1;
      const offset = (page - 1) * limit;

      const searchQuery = searchKeyword
        ? { name: { $regex: searchKeyword, $options: "i" } }
        : {};
      const products = await Product.find(searchQuery).skip(offset).limit(limit);
      const paginatedItems = {
        page,
        per_page: limit,
        pre_page,
        next_page,
        total: total_entity,
        total_pages,
        data: products,
      };

      return paginatedItems;
    } catch (error) {
      throw error;
    }
  }
}
export default new ProductsService();
