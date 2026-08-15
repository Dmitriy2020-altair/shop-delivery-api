import type { Request, Response } from 'express';

import authService from '../services/auth.service.js';
import type { RegisterDto, LoginDto } from '../schemas/auth.schema.js';
import { AppError } from '../errors/AppError.js';
import refreshTokenService from '../services/refresh-token.service.js';

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

    res.cookie('refreshToken', user.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    console.log(res.getHeader('Set-Cookie'));

    res.status(200).json({
      id: user.id,
      email: user.email,
    });
  }

  async logout(req: Request, res: Response): Promise<void> {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      await refreshTokenService.revoke(refreshToken);
    }

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    res.status(200).json({
      message: 'Logged out',
    });
  }

  async refresh(req: Request, res: Response): Promise<void> {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new AppError('Refresh token required', 401);
    }

    const tokens = await refreshTokenService.rotate(refreshToken);

    res.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000,
    });

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: 'Token refreshed',
    });
  }
}

export default new AuthController();
