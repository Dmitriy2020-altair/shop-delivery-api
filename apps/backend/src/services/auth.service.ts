import bcrypt from 'bcrypt';

import usersRepository from '../repositories/users.repository.js';
import type { LoginDto, RegisterDto } from '../schemas/auth.schema.js';
import { AppError } from '../errors/AppError.js';
import { generateAccessToken } from '../utils/jwt.js';
import { Prisma } from '../generated/prisma/client.js';
import refreshTokenService from './refresh-token.service.js';

class AuthService {
  async register(data: RegisterDto) {
    const passwordHash = await bcrypt.hash(data.password, 12);

    try {
      const user = await usersRepository.create(data.email, passwordHash);

      return user;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new AppError('An account with this email already exists.', 409);
      }

      throw error;
    }
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
    const refreshToken = await refreshTokenService.create(user.id);

    return {
      id: user.id,
      email: user.email,
      accessToken,
      refreshToken,
    };
  }
}

export default new AuthService();
