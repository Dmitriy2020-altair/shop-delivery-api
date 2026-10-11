import { beforeEach, describe, expect, it, vi } from 'vitest';

import { AppError } from '../errors/AppError.js';

type Row = {
  id: number;
  user_id: number;
  token_hash: string;
  family_id: string;
  expires_at: Date;
  revoked_at: Date | null;
  created_at: Date;
};

type UpdateManyArgs = {
  where: { id?: number; family_id?: string; revoked_at: null };
  data: { revoked_at: Date };
};

// In-memory stand-in for the Prisma client. Every call yields to the event loop
// first, so concurrent callers interleave the way separate DB round trips do.
const db = vi.hoisted(() => {
  const rows: Row[] = [];
  let nextId = 1;

  const roundTrip = () => new Promise<void>((resolve) => setImmediate(resolve));

  const client = {
    refresh_tokens: {
      async findFirst({ where }: { where: { token_hash: string } }) {
        await roundTrip();

        const row = rows.find((r) => r.token_hash === where.token_hash);

        return row ? { ...row } : null;
      },

      async create({ data }: { data: Omit<Row, 'id' | 'revoked_at' | 'created_at'> }) {
        await roundTrip();

        const row: Row = { id: nextId++, revoked_at: null, created_at: new Date(), ...data };
        rows.push(row);

        return { ...row };
      },

      async updateMany({ where, data }: UpdateManyArgs) {
        await roundTrip();

        const matched = rows.filter(
          (r) =>
            r.revoked_at === null &&
            (where.id === undefined || r.id === where.id) &&
            (where.family_id === undefined || r.family_id === where.family_id),
        );

        for (const row of matched) {
          row.revoked_at = data.revoked_at;
        }

        return { count: matched.length };
      },
    },

    async $transaction<T>(fn: (tx: unknown) => Promise<T>): Promise<T> {
      return fn(client);
    },
  };

  return {
    rows,
    client,
    reset() {
      rows.length = 0;
      nextId = 1;
    },
  };
});

vi.mock('../db/prisma.js', () => ({ default: db.client }));
vi.mock('../utils/jwt.js', () => ({
  generateAccessToken: (userId: number) => `access-token-${userId}`,
}));

const { default: refreshTokenService } = await import('./refresh-token.service.js');

const activeRows = () => db.rows.filter((row) => row.revoked_at === null);

describe('RefreshTokenService.rotate', () => {
  beforeEach(() => {
    db.reset();
  });

  it('lets only one of two concurrent rotations of the same token succeed', async () => {
    const token = await refreshTokenService.create(1);

    const results = await Promise.allSettled([
      refreshTokenService.rotate(token),
      refreshTokenService.rotate(token),
    ]);

    const fulfilled = results.filter((result) => result.status === 'fulfilled');
    const rejected = results.filter((result) => result.status === 'rejected');

    expect(fulfilled).toHaveLength(1);
    expect(rejected).toHaveLength(1);

    expect(rejected[0].reason).toBeInstanceOf(AppError);
    expect((rejected[0].reason as AppError).statusCode).toBe(401);

    // The loser must not revoke the family: the winner's token stays usable.
    expect(activeRows()).toHaveLength(1);
    await expect(
      refreshTokenService.rotate(fulfilled[0].value.refreshToken),
    ).resolves.toMatchObject({ accessToken: 'access-token-1' });
  });

  it('rotates a valid token sequentially', async () => {
    const token = await refreshTokenService.create(1);

    const rotated = await refreshTokenService.rotate(token);

    expect(rotated.refreshToken).not.toBe(token);
    expect(rotated.accessToken).toBe('access-token-1');
    expect(db.rows).toHaveLength(2);
    expect(activeRows()).toHaveLength(1);
    expect(new Set(db.rows.map((row) => row.family_id)).size).toBe(1);
  });

  it('revokes the whole family when an already rotated token is replayed', async () => {
    const token = await refreshTokenService.create(1);
    await refreshTokenService.rotate(token);

    await expect(refreshTokenService.rotate(token)).rejects.toMatchObject({
      statusCode: 401,
      message: 'Refresh token reuse detected',
    });

    expect(activeRows()).toHaveLength(0);
  });
});
