import prisma from '../db/prisma.js';
import type { RefreshToken } from '../types/auth.js';
import type { refresh_tokens } from '../generated/prisma/client.js';

function mapRefreshToken(row: refresh_tokens): RefreshToken {
  return {
    id: row.id,
    userId: row.user_id,
    tokenHash: row.token_hash,
    familyId: row.family_id,
    expiresAt: row.expires_at,
    revokedAt: row.revoked_at,
    createdAt: row.created_at,
  };
}

class RefreshTokenRepository {
  async create(
    userId: number,
    tokenHash: string,
    familyId: string,
    expiresAt: Date,
  ): Promise<RefreshToken> {
    const row = await prisma.refresh_tokens.create({
      data: {
        user_id: userId,
        token_hash: tokenHash,
        family_id: familyId,
        expires_at: expiresAt,
      },
    });

    return mapRefreshToken(row);
  }

  async findByTokenHash(tokenHash: string): Promise<RefreshToken | null> {
    const row = await prisma.refresh_tokens.findFirst({
      where: { token_hash: tokenHash },
    });

    return row ? mapRefreshToken(row) : null;
  }

  async revoke(id: number): Promise<void> {
    await prisma.refresh_tokens.updateMany({
      where: {
        id,
        revoked_at: null,
      },
      data: {
        revoked_at: new Date(),
      },
    });
  }

  async revokeFamily(familyId: string): Promise<void> {
    await prisma.refresh_tokens.updateMany({
      where: {
        family_id: familyId,
        revoked_at: null,
      },
      data: {
        revoked_at: new Date(),
      },
    });
  }
}

export default new RefreshTokenRepository();
