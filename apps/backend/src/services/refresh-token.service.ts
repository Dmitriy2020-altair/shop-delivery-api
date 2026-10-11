import crypto from 'node:crypto';

import prisma from '../db/prisma.js';
import refreshTokenRepository from '../repositories/refresh-tokens.repository.js';
import { generateAccessToken } from '../utils/jwt.js';
import { AppError } from '../errors/AppError.js';
import type { PrismaTransaction } from '../types/db.js';

class RefreshTokenService {
  private generateRefreshToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  private hashRefreshToken(refreshToken: string): string {
    return crypto.createHash('sha256').update(refreshToken).digest('hex');
  }

  private getRefreshTokenExpiresAt(): Date {
    return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  }

  private async createToken(
    tx: PrismaTransaction,
    userId: number,
    familyId: string,
  ): Promise<string> {
    const refreshToken = this.generateRefreshToken();
    const tokenHash = this.hashRefreshToken(refreshToken);
    const expiresAt = this.getRefreshTokenExpiresAt();

    await refreshTokenRepository.create(tx, userId, tokenHash, familyId, expiresAt);

    return refreshToken;
  }

  async create(userId: number): Promise<string> {
    const familyId = crypto.randomUUID();

    return this.createToken(prisma, userId, familyId);
  }

  async rotate(refreshToken: string) {
    const tokenHash = this.hashRefreshToken(refreshToken);

    const storedToken = await refreshTokenRepository.findByTokenHash(tokenHash);

    if (!storedToken) {
      throw new AppError('Invalid refresh token', 401);
    }

    if (storedToken.revokedAt) {
      await refreshTokenRepository.revokeFamily(storedToken.familyId);

      throw new AppError('Refresh token reuse detected', 401);
    }

    if (storedToken.expiresAt <= new Date()) {
      throw new AppError('Refresh token expired', 401);
    }

    const newRefreshToken = await prisma.$transaction(async (tx) => {
      const revokedCount = await refreshTokenRepository.revoke(tx, storedToken.id);

      // A concurrent request rotated this token first. Only one rotation may win;
      // the family is left alone so the winner's token stays valid.
      if (revokedCount === 0) {
        throw new AppError('Invalid refresh token', 401);
      }

      return this.createToken(tx, storedToken.userId, storedToken.familyId);
    });

    const newAccessToken = generateAccessToken(storedToken.userId);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  async revoke(refreshToken: string): Promise<void> {
    const tokenHash = this.hashRefreshToken(refreshToken);

    const storedToken = await refreshTokenRepository.findByTokenHash(tokenHash);

    if (!storedToken) {
      return;
    }

    await refreshTokenRepository.revoke(prisma, storedToken.id);
  }
}

export default new RefreshTokenService();
