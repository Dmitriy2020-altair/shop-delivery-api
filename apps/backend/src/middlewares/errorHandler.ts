import type { NextFunction, Request, Response } from 'express';
import { Prisma } from '../generated/prisma/client.js';

import { AppError } from '../errors/AppError.js';

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2025') {
      res.status(404).json({ message: 'Resource not found' });
      return;
    }

    if (err.code === 'P2003') {
      res.status(409).json({
        message: 'Operation conflicts with existing related data',
      });
      return;
    }
  }
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ message: err.message });
    return;
  }

  console.error(err);

  res.status(500).json({ message: 'Internal server error' });
}
