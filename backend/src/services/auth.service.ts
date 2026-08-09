import bcrypt from 'bcrypt';

import usersRepository from '../repositories/users.repository.js';
import type { LoginDto, RegisterDto } from '../schemas/auth.schema.js';
import { AppError } from '../errors/AppError.js';
import { generateAccessToken } from '../utils/jwt.js';
class AuthService {
  async register(data: RegisterDto) {
    const passwordHash = await bcrypt.hash(data.password, 12);

    const user = await usersRepository.create(data.email, passwordHash);

    return user;
  }

  async login(data: LoginDto) {
    const { email, password } = data;

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      throw new AppError('Invalid email or password', 401);
    }
    const accessToken = generateAccessToken(user.id);

    return {
      id: user.id,
      email: user.email,
      accessToken,
    };
  }
}

export default new AuthService();
