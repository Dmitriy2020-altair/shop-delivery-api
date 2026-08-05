import productRepository from '../repositories/products.repository.js';
import { NotFoundError } from '../errors/NotFoundError.js';
import type { Product } from '../types/product.js';
import type { CreateProductDto, UpdateProductDto } from '../schemas/product.schema.js';
import { AppError } from '../errors/AppError.js';

class ProductService {
  async getProducts(): Promise<Product[]> {
    return productRepository.getAll();
  }

  async getProductById(id: number): Promise<Product> {
    const product = await productRepository.getById(id);

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    return product;
  }

  async createProduct(data: CreateProductDto): Promise<Product> {
    return productRepository.create(data);
  }

  async updateProduct(id: number, data: UpdateProductDto): Promise<Product> {
    if (Object.keys(data).length === 0) {
      throw new AppError('At least one field is required for update', 400);
    }
    const product = await productRepository.update(id, data);

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    return product;
  }

  async deleteProduct(id: number): Promise<void> {
    const deleted = await productRepository.delete(id);

    if (!deleted) {
      throw new NotFoundError('Product not found');
    }
  }
}

export default new ProductService();
