import { Pool } from 'pg';

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'shop_delivery',
  user: 'dmytrokuzmin',
});

export default pool;
