# Shop Delivery API

pnpm workspace monorepo.

- `apps/backend` — Express + TypeScript API (`http://localhost:3000`)
- `apps/frontend` — Next.js App Router client (`http://localhost:3001`)

## Local development

```bash
pnpm install
pnpm dev:backend
pnpm dev:frontend
```

Copy `apps/backend/.env.example` to `apps/backend/.env` and fill secrets.

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
