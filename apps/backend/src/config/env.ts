import 'dotenv/config';

function required(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required env variable: ${name}`);
  }

  return value;
}

export type DatabaseAuthMode = 'local' | 'iam';

function databaseAuthMode(): DatabaseAuthMode {
  const mode = process.env.DATABASE_AUTH_MODE ?? 'local';

  if (mode !== 'local' && mode !== 'iam') {
    throw new Error(
      `Invalid DATABASE_AUTH_MODE="${mode}". Expected "local" or "iam".`,
    );
  }

  return mode;
}

const authMode = databaseAuthMode();

export const env = {
  port: Number(process.env.PORT) || 3000,
  frontendUrl: required('FRONTEND_URL'),
  databaseAuthMode: authMode,
  /**
   * Used for local password auth and by Prisma CLI (prisma.config.ts).
   * Required when DATABASE_AUTH_MODE=local.
   */
  databaseUrl:
    authMode === 'local'
      ? required('DATABASE_URL')
      : (process.env.DATABASE_URL ?? ''),
  /**
   * Aurora / IAM connection settings. Required when DATABASE_AUTH_MODE=iam.
   */
  database:
    authMode === 'iam'
      ? {
          host: required('DATABASE_HOST'),
          port: Number(process.env.DATABASE_PORT) || 5432,
          name: required('DATABASE_NAME'),
          user: required('DATABASE_USER'),
          region: required('AWS_REGION'),
        }
      : {
          host: process.env.DATABASE_HOST ?? '',
          port: Number(process.env.DATABASE_PORT) || 5432,
          name: process.env.DATABASE_NAME ?? 'shop_delivery',
          user: process.env.DATABASE_USER ?? 'shop_delivery_app',
          region: process.env.AWS_REGION ?? 'us-east-1',
        },
  jwt: {
    accessSecret: required('JWT_ACCESS_SECRET'),
    refreshSecret: required('JWT_REFRESH_SECRET'),
  },
};
