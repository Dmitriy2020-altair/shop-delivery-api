import prisma from '../db/prisma.js';
import { Prisma } from '../generated/prisma/client.js';
import type { Product } from '../types/product.js';
import type { CreateProductDto, UpdateProductDto } from '../schemas/product.schema.js';
import type { PrismaTransaction } from '../types/db.js';
import type { OrderItemDto } from '../schemas/order.schema.js';
import type { products } from '../generated/prisma/client.js';

const productSelect = {
  id: true,
  name: true,
  price: true,
  quantity: true,
  category: true,
  created_at: true,
} as const;

function mapProduct(row: Pick<products, keyof typeof productSelect>): Product {
  return {
    id: row.id,
    name: row.name,
    price: row.price.toNumber(),
    quantity: row.quantity,
    category: row.category,
    created_at: row.created_at,
  };
}

class ProductRepository {
  async getAll(): Promise<Product[]> {
    const rows = await prisma.products.findMany({
      select: productSelect,
    });

    return rows.map(mapProduct);
  }

  async getById(id: number): Promise<Product | null> {
    const row = await prisma.products.findUnique({
      where: { id },
      select: productSelect,
    });

    return row ? mapProduct(row) : null;
  }

  async getByIds(tx: PrismaTransaction, ids: number[]): Promise<Product[]> {
    const rows = await tx.products.findMany({
      where: { id: { in: ids } },
      select: productSelect,
    });

    return rows.map(mapProduct);
  }

  async create(data: CreateProductDto): Promise<Product> {
    const row = await prisma.products.create({
      data,
      select: productSelect,
    });

    return mapProduct(row);
  }

  async update(id: number, data: UpdateProductDto): Promise<Product | null> {
    try {
      const row = await prisma.products.update({
        where: { id },
        data,
        select: productSelect,
      });

      return mapProduct(row);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        return null;
      }

      throw error;
    }
  }

  async decreaseQuantities(tx: PrismaTransaction, items: OrderItemDto[]): Promise<void> {
    for (const item of items) {
      await tx.products.update({
        where: { id: item.productId },
        data: {
          quantity: {
            decrement: item.quantity,
          },
        },
      });
    }
  }

  async delete(id: number): Promise<boolean> {
    const result = await prisma.products.deleteMany({
      where: { id },
    });

    return result.count > 0;
  }
}

export default new ProductRepository();
