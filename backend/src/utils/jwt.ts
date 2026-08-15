import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export function generateAccessToken(userId: number): string {
  return jwt.sign(
    {
      sub: userId.toString(),
    },
    env.jwt.accessSecret,
    {
      expiresIn: '15m',
    }
  );
}