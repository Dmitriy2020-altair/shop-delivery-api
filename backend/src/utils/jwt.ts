import jwt from 'jsonwebtoken';

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;

export function generateAccessToken(userId: number): string {
  return jwt.sign(
    {
      sub: userId.toString(),
    },
    JWT_ACCESS_SECRET,
    {
      expiresIn: '15m',
    }
  );
}