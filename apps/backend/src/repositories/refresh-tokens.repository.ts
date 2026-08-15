import pool from '../db/pool.js';
import { RefreshToken } from '../types/auth.js';

class RefreshTokenRepository {
  async create(
    userId: number,
    tokenHash: string,
    familyId: string,
    expiresAt: Date
  ): Promise<RefreshToken> {
    const result = await pool.query<RefreshToken>(
      `
      INSERT INTO refresh_tokens (
        user_id,
        token_hash,
        family_id,
        expires_at
      )
      VALUES ($1, $2, $3, $4)
      RETURNING
        id,
        user_id AS "userId",
        token_hash AS "tokenHash",
        family_id AS "familyId",
        expires_at AS "expiresAt",
        revoked_at AS "revokedAt",
        created_at AS "createdAt"
      `,
      [userId, tokenHash, familyId, expiresAt]
    );

    const token = result.rows[0];

    if (!token) {
      throw new Error('Failed to create refresh token');
    }

    return token;
  }
  async findByTokenHash(tokenHash: string): Promise<RefreshToken | null> {
    const result = await pool.query<RefreshToken>(
      `
      SELECT
        id,
        user_id AS "userId",
        token_hash AS "tokenHash",
        family_id AS "familyId",
        expires_at AS "expiresAt",
        revoked_at AS "revokedAt",
        created_at AS "createdAt"
      FROM refresh_tokens
      WHERE token_hash = $1
      `,
      [tokenHash]
    );

    return result.rows[0] ?? null;
  }

  async revoke(id: number): Promise<void> {
    await pool.query(
      `
      UPDATE refresh_tokens
      SET revoked_at = NOW()
      WHERE id = $1
        AND revoked_at IS NULL
      `,
      [id]
    );
  }

  async revokeFamily(familyId: string): Promise<void> {
    await pool.query(
      `
      UPDATE refresh_tokens
      SET revoked_at = NOW()
      WHERE family_id = $1
      AND revoked_at IS NULL
      `,
      [familyId]
    );
  }
}

export default new RefreshTokenRepository();
