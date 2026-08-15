import pool from './pool.js';

export async function checkConnection(): Promise<void> {
  try {
    const result = await pool.query('SELECT NOW()');

    console.log('✅ PostgreSQL connected');
    console.log(result.rows[0]);
  } catch (error) {
    console.error('❌ Failed to connect to PostgreSQL');
    console.error(error);

    process.exit(1);
  }
}
