import pool from '../db/pool.js';
import type { Product } from '../types/product.js';
import type { CreateProductDto, UpdateProductDto } from '../schemas/product.schema.js';

class ProductRepository {
  async getAll(): Promise<Product[]> {
    const result = await pool.query<Product>(`
      SELECT
        id,
        name,
        price,
        quantity,
        category,
        created_at
      FROM products
    `);

    return result.rows;
  }

  async getById(id: number): Promise<Product | null> {
    const result = await pool.query<Product>(
      `
      SELECT
        id,
        name,
        price,
        quantity,
        category,
        created_at
      FROM products
      WHERE id = $1
    `,
      [id]
    );

    return result.rows[0] ?? null;
  }

  async create(data: CreateProductDto): Promise<Product> {
    const result = await pool.query<Product>(
      `
      INSERT INTO products (name, price, quantity, category)
      VALUES ($1, $2, $3, $4)
      RETURNING
        id,
        name,
        price,
        quantity,
        category,
        created_at
    `,
      [data.name, data.price, data.quantity, data.category]
    );

    return result.rows[0];
  }

  async update(id: number, data: UpdateProductDto): Promise<Product | null> {
    const fields = Object.keys(data) as (keyof UpdateProductDto)[];
    const values = fields.map((field) => data[field]);
    const queryValues = [...values, id];
    const setClause = fields.map((field, index) => `${field} = $${index + 1}`).join(', ');

    const result = await pool.query<Product>(
      `
      UPDATE products
      SET
        ${setClause}
      WHERE id = $${fields.length + 1} 
      RETURNING
        id,
        name,
        price,
        quantity,
        category,
        created_at
    `,
      queryValues
    );

    return result.rows[0] ?? null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await pool.query(`DELETE FROM products WHERE id = $1`, [id]);

    return (result.rowCount ?? 0) > 0;
  }
}

export default new ProductRepository();
