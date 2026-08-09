import type { Request, Response } from 'express';

import authService from '../services/auth.service.js';
import type { RegisterDto, LoginDto } from '../schemas/auth.schema.js';

class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    const user = await authService.register(req.body as RegisterDto);

    res.status(201).json(user);
  }

  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body as LoginDto;

    const user = await authService.login({ email, password });

    res.cookie('accessToken', user.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000,
    });

    res.status(200).json({
      id: user.id,
      email: user.email,
    });
  }
}

export default new AuthController();
