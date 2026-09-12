import { readFileSync } from 'node:fs';

import { Signer } from '@aws-sdk/rds-signer';
import pg from 'pg';

import { env } from '../config/env.js';

const { Pool } = pg;

/**
 * SSL for Aurora IAM connections.
 *
 * Default matches libpq `sslmode=require`: TLS encryption without CA verification.
 * Set DATABASE_SSL_CA_PATH to an RDS CA bundle PEM to enable full certificate verification.
 */
function iamSslConfig(): boolean | { rejectUnauthorized: boolean; ca?: string } {
  const caPath = process.env.DATABASE_SSL_CA_PATH;

  if (caPath) {
    return {
      rejectUnauthorized: true,
      ca: readFileSync(caPath, 'utf8'),
    };
  }

  return {
    rejectUnauthorized: false,
  };
}

function createLocalPool(): pg.Pool {
  return new Pool({
    connectionString: env.databaseUrl,
  });
}

function createIamPool(): pg.Pool {
  const { host, port, name, user, region } = env.database;

  const signer = new Signer({
    hostname: host,
    port,
    username: user,
    region,
  });

  return new Pool({
    host,
    port,
    database: name,
    user,
    // Fresh IAM token per new pool connection (token ~15 min TTL).
    password: async () => signer.getAuthToken(),
    ssl: iamSslConfig(),
  });
}

/**
 * Single pg.Pool used by Prisma via PrismaPg.
 * Auth strategy (password vs IAM) is decided here and hidden from the rest of the app.
 */
export function createDatabasePool(): pg.Pool {
  if (env.databaseAuthMode === 'iam') {
    return createIamPool();
  }

  return createLocalPool();
}
