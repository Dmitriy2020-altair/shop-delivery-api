import 'dotenv/config';

function required(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required env variable: ${name}`);
  }

  return value;
}

export const env = {
  port: Number(process.env.PORT) || 3000,
  frontendUrl: required('FRONTEND_URL'),
  databaseUrl: required('DATABASE_URL'),
  jwt: {
    accessSecret: required('JWT_ACCESS_SECRET'),
  
    refreshSecret: required('JWT_REFRESH_SECRET'),
  },
};
