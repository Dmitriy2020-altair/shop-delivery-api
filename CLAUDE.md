# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Deployment warning

Every push to `develop` triggers `.github/workflows/backend-ecr.yml`, which builds the backend images, pushes them to ECR and deploys to the EC2 instance through SSM. There is no staging step or PR gate, and `develop` is the only branch on the remote (there is no `main`). Treat `git push` as a production deploy and confirm with the user first.

## Commands

pnpm workspace (`apps/*`), Node >= 22, pnpm 10.11.0. Run from the repo root.

```bash
pnpm install
docker compose up -d postgres          # Postgres 17 on host port 5433
pnpm dev:backend                       # tsx watch, http://localhost:3000
pnpm dev:frontend                      # next dev, http://localhost:3001

pnpm --filter backend test             # prisma generate + vitest run
pnpm --filter backend typecheck
pnpm --filter backend build            # prisma generate + tsc -> dist/
pnpm --filter frontend lint
pnpm --filter frontend typecheck
pnpm --filter frontend build

pnpm api:generate                      # backend OpenAPI -> frontend types (see below)
pnpm --filter backend prisma:generate
pnpm --filter backend prisma:migrate:deploy
```

Single test file or test name:

```bash
pnpm --filter backend exec vitest run src/schemas/order.schema.test.ts
pnpm --filter backend exec vitest run -t "part of the test name"
```

Notes:

- Root `pnpm dev`, `build` and `start` target the backend only.
- The Prisma client is generated into `apps/backend/src/generated/prisma` (gitignored). `test`, `typecheck` and `build` regenerate it, but `dev` does not, so run `prisma:generate` after a fresh clone or a schema change.
- Any Prisma CLI command needs `DATABASE_URL` set (`prisma.config.ts` throws without it), even ones like `generate` that never connect. CI and the Dockerfile pass a placeholder URL for this reason.
- Only the backend has tests (Vitest, `src/**/*.test.ts`, unit level). The frontend has none.
- CI gates are backend `test` + `typecheck` and frontend `lint` + `typecheck` + `build`.

## Environment

- Backend: copy `apps/backend/.env.example` to `apps/backend/.env`. `FRONTEND_URL`, `JWT_ACCESS_SECRET` and `JWT_REFRESH_SECRET` are always required; `src/config/env.ts` throws at import time if they are missing.
- Frontend: `NEXT_PUBLIC_API_URL` (for example `http://localhost:3000/api/v1`) in `apps/frontend/.env.local`.
- `DATABASE_AUTH_MODE` selects how the single `pg.Pool` in `src/db/database.ts` authenticates:
  - `local` (default) uses `DATABASE_URL`.
  - `iam` uses `DATABASE_HOST/PORT/NAME/USER` and `AWS_REGION`, and signs a fresh RDS IAM token per connection. This is the production path.
- Local Postgres listens on host port **5433** (the README still says 5432). Inside docker-compose the backend reaches it at `postgres:5432`.

## Backend architecture (`apps/backend`)

Express 5, TypeScript, ESM with `NodeNext` resolution: relative imports must use the `.js` extension.

Request flow: `routes -> middlewares -> controllers -> services -> repositories -> Prisma`.

- `src/server.ts` checks the DB connection and listens; `src/app.ts` builds the app and mounts routers. `/health`, `/api-docs` and `/openapi.json` are unversioned; business routes live under `/api/v1`.
- **Validation:** Zod schemas in `src/schemas/` are applied with `validateBody(schema)`, which replaces `req.body` with the parsed output. DTO types are inferred from the same schemas.
- **Errors:** throw `AppError(message, statusCode)` or `NotFoundError` from services. `errorHandler` maps those, plus Prisma `P2025` to 404 and `P2003` to 409; anything else becomes a 500.
- **Auth:** access and refresh JWTs are set as httpOnly cookies (`accessToken`, `refreshToken`). `authMiddleware` populates the actor on the request, `requireRole(UserRole.admin)` gates admin routes, and `assertCanAccessUser` enforces owner-or-admin access. Refresh tokens are stored hashed in `refresh_tokens` with a `family_id` for rotation and revocation.
- **Data access:** only repositories talk to Prisma. They select explicit columns and map rows to the domain types in `src/types/` (for example `Decimal` price to `number`). Repository methods that take part in a transaction accept a `PrismaTransaction` as the first argument; services own the `prisma.$transaction` call (see `orders.service.ts`).
- **Prisma:** v7 with the `@prisma/adapter-pg` driver adapter over the shared pool. Models keep the snake_case table and column names of the original SQL schema. Schema changes go through `prisma/migrations/`, which the `migrator` image applies on deploy; `database/schema.sql` and `seed.sql` are the original raw SQL and are not what CI ships.

### OpenAPI contract

The spec is built by swagger-jsdoc from `@openapi` JSDoc blocks in `src/routes/*.ts` and from `src/config/swagger/{schemas,responses}/`. It is not derived from the Zod schemas, so a route or payload change has to be mirrored in those JSDoc blocks by hand.

After changing the API, run `pnpm api:generate`. It exports `apps/backend/openapi.json` and regenerates `apps/frontend/lib/api/generated.ts`; both files are committed.

## Frontend architecture (`apps/frontend`)

Next.js 16 App Router, React 19, Tailwind 4, shadcn (`base-nova` style on Base UI, components in `components/ui/`), zustand, react-hook-form with Zod. Import alias is `@/`.

- `lib/api/client.ts` exports two axios instances with `withCredentials`. `apiClient` carries the 401 interceptor (`lib/api/auth.interceptor.ts`), which performs one shared refresh call and retries the original request. `authClient` has no interceptor.
- `app/providers/api-provider.tsx` installs the interceptor; `auth-provider.tsx` restores the session into `store/auth.store.ts`. `components/RequireAuth.tsx` guards pages.
- Use the types from `lib/api/types.ts` (aliases over `generated.ts`) rather than hand-writing response types that exist in the OpenAPI schema. Only types are generated; API method wrappers are written by hand in `lib/api/`.
- Only auth and the health check call the real API. The products, orders and profile pages still render `lib/mock/*` data through `hooks/useMockResource.ts`, and `lib/api/orders.ts` and `lib/api/products.ts` are placeholders.

## Docker and CI/CD

- `apps/backend/Dockerfile` is built from the repo root and has three stages: `builder`, `migrator` (runs `prisma migrate deploy`) and `runner` (production dependencies plus `dist/`).
- `backend-ecr.yml` pushes `migrator-<sha>`, `<sha>` and `latest` tags, then runs `/home/ec2-user/shop-delivery-deploy/deploy.sh <sha>` on the instance. That script lives on the server, not in this repo.
- `frontend-ci.yml` only runs quality gates; the frontend has no deployment pipeline here.
