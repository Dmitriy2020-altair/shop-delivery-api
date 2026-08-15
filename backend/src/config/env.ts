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
  db: {
    host: required('DB_HOST'),
    port: Number(process.env.DB_PORT) || 5432,
    database: required('DB_NAME'),
    user: required('DB_USER'),
    password: process.env.DB_PASSWORD ?? '',
  },
  jwt: {
    accessSecret: required('JWT_ACCESS_SECRET'),
  
    refreshSecret: required('JWT_REFRESH_SECRET'),
  },
};
