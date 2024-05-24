import { Router } from 'express';
import ProductsController from './products.controller';

const productsRouter = Router();


productsRouter.get('/get', ProductsController.getAllProducts);


export default productsRouter;
