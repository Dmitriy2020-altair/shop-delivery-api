FROM node:22-alpine AS builder

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/backend/package.json ./apps/backend/

RUN pnpm install --frozen-lockfile --filter backend...

COPY apps/backend ./apps/backend

WORKDIR /app/apps/backend

# prisma.config.ts loads env.ts; generate does not connect to the database.
ENV DATABASE_URL=postgresql://postgres:postgres@postgres:5432/shop_delivery

RUN pnpm run build

FROM node:22-alpine AS runner

WORKDIR /app

RUN corepack enable

ENV NODE_ENV=production

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/backend/package.json ./apps/backend/

RUN pnpm install --frozen-lockfile --prod --filter backend...

COPY --from=builder /app/apps/backend/dist ./apps/backend/dist

WORKDIR /app/apps/backend

EXPOSE 3000

CMD ["pnpm", "start"]
