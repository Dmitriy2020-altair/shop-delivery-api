import prisma from '../db/prisma.js';

import ordersRepository from '../repositories/orders.repository.js';
import orderItemsRepository from '../repositories/order-items.repository.js';
import productsRepository from '../repositories/products.repository.js';
import { CreateOrderDto } from '../schemas/order.schema.js';
import { AppError } from '../errors/AppError.js';
import { NotFoundError } from '../errors/NotFoundError.js';
import { AuthActor } from '../types/auth.js';

class OrdersService {
  async createOrder(data: CreateOrderDto, actor: AuthActor): Promise<{ id: number }> {
    return prisma.$transaction(async (tx) => {
      const ids = data.items.map((item) => item.productId);

      const uniqueIds = new Set(ids);
      if (uniqueIds.size !== ids.length) {
        throw new AppError('Duplicate products are not allowed', 400);
      }

      const products = await productsRepository.getByIds(tx, ids);

      if (products.length !== data.items.length) {
        throw new NotFoundError('One or more products not found');
      }

      const productMap = new Map(products.map((product) => [product.id, product]));

      for (const item of data.items) {
        const product = productMap.get(item.productId)!;

        if (product.quantity < item.quantity) {
          throw new AppError(`Not enough stock for "${product.name}"`, 400);
        }
      }

      const order = await ordersRepository.create(tx, actor.id);

      await orderItemsRepository.createMany(tx, order.id, data.items);

      await productsRepository.decreaseQuantities(tx, data.items);

      return order;
    });
  }
}

export default new OrdersService();
