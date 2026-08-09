import bcrypt from 'bcrypt';

import usersRepository from '../repositories/users.repository.js';
import type { RegisterDto } from '../schemas/auth.schema.js';

class AuthService {
  async register(data: RegisterDto) {
    const passwordHash = await bcrypt.hash(data.password, 12);

    const user = await usersRepository.create(data.email, passwordHash);

    return user;
  }
}

export default new AuthService();
