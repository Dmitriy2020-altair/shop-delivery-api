# Shop Delivery API

pnpm workspace monorepo.

- `apps/backend` — Express + TypeScript API (`http://localhost:3000`)
- `apps/frontend` — Next.js App Router client (`http://localhost:3001`)

## API

Business endpoints are versioned under `/api/v1`:

- `GET /health` — health check (not versioned)
- `/api/v1/auth/...`
- `/api/v1/users/...`
- `/api/v1/products/...`
- `/api/v1/orders/...`

OpenAPI:

- Swagger UI: `GET /api-docs`
- Spec: `GET /openapi.json`

### OpenAPI → frontend types

```text
Backend OpenAPI schema
  → apps/backend/openapi.json
  → openapi-typescript
  → apps/frontend/lib/api/generated.ts
```

Regenerate frontend types after OpenAPI changes:

```bash
pnpm api:generate
# or
pnpm --filter frontend api:generate
```

See [`apps/frontend/README.md`](apps/frontend/README.md) for details.

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
