import pool from '../db/pool.js';

import ordersRepository from '../repositories/orders.repository.js';
import orderItemsRepository from '../repositories/order-items.repository.js';
import productsRepository from '../repositories/products.repository.js';
import { CreateOrderDto } from '../schemas/order.schema.js';
import { AppError } from '../errors/AppError.js';
import { NotFoundError } from '../errors/NotFoundError.js';

class OrdersService {
  async createOrder(data: CreateOrderDto): Promise<{ id: number }> {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      const ids = data.items.map((item) => item.productId);

      const uniqueIds = new Set(ids);
      // Check if there are duplicate products
      if (uniqueIds.size !== ids.length) {
        throw new AppError('Duplicate products are not allowed', 400);
      }
      // Get products by ids
      const products = await productsRepository.getByIds(
        client,
        ids,
      );

      // Check if all products were found
      if (products.length !== data.items.length) {
        throw new NotFoundError('One or more products not found');
      }
      // Create a map of products by id
      const productMap = new Map(products.map((product) => [product.id, product]));
      // Check if there is enough stock for each product
      for (const item of data.items) {
        const product = productMap.get(item.productId)!;

        if (product.quantity < item.quantity) {
          throw new AppError(`Not enough stock for "${product.name}"`, 400);
        }
      }

      const order = await ordersRepository.create(
        client,
        2, // временно захардкодим userId
      );

      await orderItemsRepository.createMany(
        client,
        order.id,
        data.items
      );

      await productsRepository.decreaseQuantities(
        client,
        data.items,
      );

      await client.query('COMMIT');
      return order;
    } catch (error) {
      await client.query('ROLLBACK');

      throw error;
    } finally {
      client.release();
    }
  }
}

export default new OrdersService();
