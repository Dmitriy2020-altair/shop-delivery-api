import pool from '../db/pool.js';
import type { User } from '../types/user.js';
import type { UpdateUserDto } from '../schemas/user.schema.js';

class UserRepository {
  async getAll(): Promise<User[]> {
    const result = await pool.query<User>(`
      SELECT 
        id,
        email,
        created_at
      FROM users
    `);

    return result.rows;
  }

  async getById(id: number): Promise<User | null> {
    const result = await pool.query<User>(
      `
      SELECT 
        id,
        email,
        created_at
      FROM users
      WHERE id=$1
    `,
      [id]
    );

    return result.rows[0] ?? null;
  }

  async create(email: string, passwordHash: string): Promise<User | null> {
    const result = await pool.query<User>(
      `
      INSERT INTO users (
        email,
        password_hash
      )
      VALUES ($1, $2)
      RETURNING
        id,
        email,
        created_at
      `,
      [email, passwordHash]
    );

    return result.rows[0] ?? null;
  }

  async update(id: number, data: UpdateUserDto): Promise<User | null> {
    const fields = Object.keys(data) as (keyof UpdateUserDto)[];
    const values = fields.map((field) => data[field]);
    const setClause = fields.map((field, index) => `${field} = $${index + 1}`).join(', ');
    const queryValues = [...values, id];

    const result = await pool.query<User>(
      `
      UPDATE users 
      SET
        ${setClause}
      WHERE id = $${fields.length + 1}
      RETURNING
        id,
        email,
        created_at
    `,
      queryValues
    );

    return result.rows[0] ?? null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await pool.query(`DELETE FROM users WHERE id = $1`, [id]);

    return (result.rowCount ?? 0) > 0;
  }
}

export default new UserRepository();
