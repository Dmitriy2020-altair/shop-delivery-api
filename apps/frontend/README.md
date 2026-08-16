# Frontend

Next.js App Router client for Shop Delivery (`http://localhost:3001`).

## OpenAPI → TypeScript types

The frontend consumes the backend OpenAPI contract as generated TypeScript types.

```text
Backend OpenAPI (swagger-jsdoc)
        ↓
apps/backend/openapi.json   (export)
        ↓
openapi-typescript
        ↓
apps/frontend/lib/api/generated.ts
        ↓
UI / API modules (typed contract only for now)
```

### Generate types

From the repo root:

```bash
pnpm --filter frontend api:generate
# or
pnpm api:generate
```

What this does:

1. Exports the same schema served at `GET /openapi.json` via `pnpm --filter backend openapi:export`
2. Runs `openapi-typescript` into `lib/api/generated.ts`

If the backend is already running, you can also generate directly from the live schema:

```bash
pnpm --filter frontend api:generate:url
# optional:
OPENAPI_URL=http://localhost:3000/openapi.json pnpm --filter frontend api:generate:url
```

### Using generated types

Prefer aliases in `lib/api/types.ts` (or import from `generated.ts` directly):

```ts
import type { HealthResponse } from "@/lib/api/types";

const data = (await response.json()) as HealthResponse;
```

Do not hand-write response types that already exist in the OpenAPI schema.

API method wrappers are not generated yet — only the typed contract.
