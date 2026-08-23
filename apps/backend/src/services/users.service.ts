import userRepository from '../repositories/users.repository.js';
import { NotFoundError } from '../errors/NotFoundError.js';
import { AppError } from '../errors/AppError.js';
import { User, UserRole } from '../types/user.js';
import { UpdateUserDto } from '../schemas/user.schema.js';

type AuthActor = {
  id: number;
  role: UserRole;
};

class UserService {
  private assertCanAccessUser(actor: AuthActor, targetId: number): void {
    if (actor.role === UserRole.ADMIN) {
      return;
    }

    if (actor.id === targetId) {
      return;
    }

    throw new AppError('Forbidden', 403);
  }

  async getUsers(): Promise<User[]> {
    return userRepository.getAll();
  }

  async getUserById(id: number, actor: AuthActor): Promise<User> {
    this.assertCanAccessUser(actor, id);

    const user = await userRepository.getById(id);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }

  async updateUser(id: number, data: UpdateUserDto, actor: AuthActor): Promise<User> {
    this.assertCanAccessUser(actor, id);

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
