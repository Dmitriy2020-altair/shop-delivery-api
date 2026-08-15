import crypto from 'node:crypto';

import refreshTokenRepository from '../repositories/refresh-tokens.repository.js';
import { generateAccessToken } from '../utils/jwt.js';
import { AppError } from '../errors/AppError.js';

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

  private async createToken(userId: number, familyId: string): Promise<string> {
    const refreshToken = this.generateRefreshToken();
    const tokenHash = this.hashRefreshToken(refreshToken);
    const expiresAt = this.getRefreshTokenExpiresAt();

    await refreshTokenRepository.create(userId, tokenHash, familyId, expiresAt);

    return refreshToken;
  }

  async create(userId: number): Promise<string> {
    const familyId = crypto.randomUUID();

    return this.createToken(userId, familyId);
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

    await refreshTokenRepository.revoke(storedToken.id);

    const newRefreshToken = await this.createToken(storedToken.userId, storedToken.familyId);

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

    await refreshTokenRepository.revoke(storedToken.id);
  }
}

export default new RefreshTokenService();
