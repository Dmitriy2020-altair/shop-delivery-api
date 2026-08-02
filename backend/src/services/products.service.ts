import productRepository from '../repositories/products.repository.js';
import { NotFoundError } from '../errors/NotFoundError.js';
import type {
  CreateProductDto,
  Product,
  UpdateProductDto,
} from '../types/product.js';

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
