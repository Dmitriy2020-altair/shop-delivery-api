import type { OrderItemDto } from '../schemas/order.schema.js';
import type { DB } from '../types/db.js';

class OrderItemsRepository {
  async createMany(db: DB, orderId: number, items: OrderItemDto[]): Promise<void> {
    const COLUMNS_PER_ROW = 3;

    const placeholders = items
      .map((_, index) => {
        const offset = index * COLUMNS_PER_ROW;

        return `($${offset + 1}, $${offset + 2}, $${offset + 3})`;
      })
      .join(', ');

    const values = items.flatMap((item) => [orderId, item.productId, item.quantity]);

    await db.query(
      `
      INSERT INTO order_items (
        order_id,
        product_id,
        quantity
      )
      VALUES
        ${placeholders}
      `,
      values
    );
  }
}

export default new OrderItemsRepository();
