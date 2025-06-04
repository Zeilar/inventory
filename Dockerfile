FROM node:24-alpine AS builder

WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile

RUN yarn build

FROM node:24-slim

WORKDIR /app

COPY --from=builder /app/.next/standalone .
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static .next/static

EXPOSE ${PORT}

CMD ["node", "server.js"]
