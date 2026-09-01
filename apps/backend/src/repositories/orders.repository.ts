import type { PrismaTransaction } from '../types/db.js';

class OrdersRepository {
  async create(tx: PrismaTransaction, userId: number): Promise<{ id: number }> {
    return tx.orders.create({
      data: {
        user_id: userId,
      },
      select: {
        id: true,
      },
    });
  }
}

export default new OrdersRepository();
