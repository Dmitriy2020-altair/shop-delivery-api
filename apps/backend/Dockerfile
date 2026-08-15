FROM node:24-alpine

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/backend/package.json ./apps/backend/

RUN pnpm install --frozen-lockfile --filter backend...

COPY apps/backend ./apps/backend

WORKDIR /app/apps/backend

EXPOSE 3000

CMD ["pnpm", "dev"]
