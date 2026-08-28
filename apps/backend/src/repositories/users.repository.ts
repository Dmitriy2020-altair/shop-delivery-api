import type { User, UserWithPassword } from '../types/user.js';
import type { UpdateUserDto } from '../schemas/user.schema.js';
import prisma from '../db/prisma.js';

class UserRepository {
  async getAll(): Promise<User[]> {
    return prisma.users.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        created_at: true,
      },
    });
  }

  async getById(id: number): Promise<User | null> {
    return prisma.users.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        created_at: true,
        role: true,
      },
    });
  }

  async getAuthUserById(id: number): Promise<User | null> {
    return prisma.users.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        role: true,
        created_at: true,
      },
    });
  }

  async findByEmail(email: string): Promise<UserWithPassword | null> {
    const user = await prisma.users.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        password_hash: true,
        role: true,
      },
    });

    if (!user) return null;

    return {
      id: user.id,
      email: user.email,
      passwordHash: user.password_hash,
      role: user.role,
    };
  }

  async create(email: string, passwordHash: string): Promise<User | null> {
    return prisma.users.create({
      data: {
        email,
        password_hash: passwordHash,
      },
      select: {
        id: true,
        email: true,
        role: true,
        created_at: true,
      },
    });
  }

  async update(id: number, data: UpdateUserDto): Promise<User> {
    return prisma.users.update({
      where: {
        id,
      },
      data,
      select: {
        id: true,
        email: true,
        role: true,
        created_at: true,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.users.delete({
      where: {
        id,
      },
    });
  }
}

export default new UserRepository();
