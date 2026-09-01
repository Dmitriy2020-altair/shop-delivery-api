import type { OrderItemDto } from '../schemas/order.schema.js';
import type { PrismaTransaction } from '../types/db.js';

class OrderItemsRepository {
  async createMany(
    tx: PrismaTransaction,
    orderId: number,
    items: OrderItemDto[],
  ): Promise<void> {
    await tx.order_items.createMany({
      data: items.map((item) => ({
        order_id: orderId,
        product_id: item.productId,
        quantity: item.quantity,
      })),
    });
  }
}

export default new OrderItemsRepository();
