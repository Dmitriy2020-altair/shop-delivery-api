import type { Request, Response } from 'express';

import productService from '../services/products.service.js';
import type { UpdateProductDto } from '../schemas/product.schema.js';

class ProductController {
  async getProducts(req: Request, res: Response): Promise<void> {
    const products = await productService.getProducts();

    res.json(products);
  }

  async getProductById(req: Request, res: Response): Promise<void> {
    const product = await productService.getProductById(res.locals.id);

    res.json(product);
  }

  async createProduct(req: Request, res: Response): Promise<void> {
    const product = await productService.createProduct(req.body);

    res.status(201).json(product);
  }

  async updateProduct(req: Request, res: Response): Promise<void> {
    const product = await productService.updateProduct(res.locals.id, req.body as UpdateProductDto);

    res.json(product);
  }

  async deleteProduct(req: Request, res: Response): Promise<void> {
    await productService.deleteProduct(res.locals.id);

    res.status(204).send();
  }
}

export default new ProductController();
