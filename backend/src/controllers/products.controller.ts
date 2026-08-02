import type { Request, Response } from 'express';

import productService from '../services/products.service.js';

class ProductController {
  async getProducts(req: Request, res: Response): Promise<void> {
    const products = await productService.getProducts();

    res.json(products);
  }

  async getProductById(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ message: 'Invalid product id' });
      return;
    }

    const product = await productService.getProductById(id);

    res.json(product);
  }

  async createProduct(req: Request, res: Response): Promise<void> {
    const product = await productService.createProduct(req.body);

    res.status(201).json(product);
  }

  async updateProduct(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ message: 'Invalid product id' });
      return;
    }

    const product = await productService.updateProduct(id, req.body);

    res.json(product);
  }

  async deleteProduct(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ message: 'Invalid product id' });
      return;
    }

    await productService.deleteProduct(id);

    res.status(204).send();
  }
}

export default new ProductController();
