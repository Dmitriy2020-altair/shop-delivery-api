import { Pool } from 'pg';

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'shop_delivery',
  user: 'postgres',
  password: 'YOUR_PASSWORD',
});

export default pool;
