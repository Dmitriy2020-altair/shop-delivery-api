import { DB } from '../types/db.js';

class OrdersRepository {
  async create(db: DB, userId: number): Promise<{ id: number }> {
    const result = await db.query<{ id: number }>(
      `
      INSERT INTO orders (user_id)
      VALUES ($1)
      RETURNING id
      `,
      [userId]
    );

    return result.rows[0];
  }
}

export default new OrdersRepository();
