import userRepository from '../repositories/users.repository.js';
import { NotFoundError } from '../errors/NotFoundError.js';
import { AppError } from '../errors/AppError.js';
import { User } from '../types/user.js';
import { UpdateUserDto } from '../schemas/user.schema.js';
import { AuthActor } from '../types/auth.js';
import { assertCanAccessUser } from '../auth/assert-can-access-user.js';

class UserService {
  async getUsers(): Promise<User[]> {
    return userRepository.getAll();
  }

  async getUserById(id: number, actor: AuthActor): Promise<User> {
    assertCanAccessUser(actor, id);

    const user = await userRepository.getById(id);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }

  async updateUser(id: number, data: UpdateUserDto, actor: AuthActor): Promise<User> {
    assertCanAccessUser(actor, id);

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
    await userRepository.delete(id);
  }
}

export default new UserService();
