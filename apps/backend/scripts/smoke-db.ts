/**
 * Temporary smoke test: Prisma → PrismaPg → pg.Pool → (local | IAM) → PostgreSQL.
 * Uses the existing Prisma client — does not create a separate connection path.
 *
 * Local:  pnpm exec tsx scripts/smoke-db.ts
 * EC2:    DATABASE_AUTH_MODE=iam ... pnpm exec tsx scripts/smoke-db.ts
 */
import prisma from '../src/db/prisma.js';

try {
  const rows = await prisma.$queryRaw<
    Array<{ current_database: string; current_user: string }>
  >`SELECT current_database(), current_user`;

  console.log('DB smoke test OK:');
  console.log(rows);
} catch (error) {
  console.error('DB smoke test FAILED:');
  console.error(error);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
  // External pg.Pool is not disposed by Prisma by default; exit so the process does not hang.
  process.exit(process.exitCode ?? 0);
}
