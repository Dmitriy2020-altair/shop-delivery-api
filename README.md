# Shop Delivery API

## Docker (development)

From the project root:

```bash
docker compose up --build
```

- API: http://localhost:3000
- PostgreSQL: localhost:5432
  - database: `shop_delivery`
  - user: `postgres`
  - password: `postgres`

Apply schema/seed from the `database/` folder after Postgres is up (e.g. via `psql`).
