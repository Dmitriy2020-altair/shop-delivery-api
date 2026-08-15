import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import userRepository from '../repositories/users.repository.js';
import { UserRole } from '../types/user.js';

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const token = req.cookies.accessToken;

  if (!token) {
    res.status(401).json({
      message: 'Authentication required',
    });
    return;
  }

  try {
    const payload = jwt.verify(token, env.jwt.accessSecret);

    if (typeof payload === 'string' || !payload.sub) {
      res.status(401).json({
        message: 'Invalid token payload',
      });
      return;
    }

    const userId = Number(payload.sub);

    if (!Number.isInteger(userId)) {
      res.status(401).json({
        message: 'Invalid user id',
      });
      return;
    }

    const user = await userRepository.getAuthUserById(userId);

    if (!user) {
      res.status(401).json({
        message: 'User not found',
      });
      return;
    }

    req.user = {
      id: userId,
      role: user.role,
    };

    next();
  } catch (error) {
    res.status(401).json({
      message: 'Invalid or expired token',
    });
  }
}
