import userRepository from '../repositories/users.repository.js';
import { NotFoundError } from '../errors/NotFoundError.js';
import { AppError } from '../errors/AppError.js';
import { User } from '../types/user.js';
import { CreateUserDto, UpdateUserDto } from '../schemas/user.schema.js';

class UserService {
  async getUsers(): Promise<User[]> {
    return userRepository.getAll();
  }

  async getUserById(id: number): Promise<User> {
    const user = await userRepository.getById(id);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }

  async createUser(data: CreateUserDto): Promise<User | null> {
    return userRepository.create(data);
  }

  async updateUser(id: number, data: UpdateUserDto): Promise<User> {
    if (Object.keys(data).length === 0) {
      throw new AppError('At least one field is required for update', 400);
    }
    const user = await userRepository.update(id, data);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }

  async deleteUser(id: number): Promise<void> {
    const deleted = await userRepository.delete(id);

    if (!deleted) {
      throw new NotFoundError('User not found');
    }
  }
}

export default new UserService();
