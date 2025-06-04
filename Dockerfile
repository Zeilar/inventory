# ---------- Base Stage ----------
FROM node:22-alpine AS base
WORKDIR /app

# Copy all files for dev, or just once for prod builder
COPY . .

# ---------- Builder Stage (for production) ----------
FROM base AS builder
ARG MODE=production
RUN if [ "$MODE" = "production" ]; then yarn install --frozen-lockfile && yarn build; fi

# ---------- Production Runner ----------
FROM node:24-slim AS runner

ARG MODE=production
ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /app

# If mode is production, copy standalone files
COPY --from=builder /app/.next/standalone ./ 
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

# ---------- Development Runner ----------
FROM base AS devrunner
ENV NODE_ENV=development
ENV PORT=3000
EXPOSE ${PORT}

# Install all dependencies (no `--frozen-lockfile` to allow changes)
RUN yarn install

# Expose volumes for live edits (optional)
VOLUME ["/app"]

# ---------- Final Selection ----------
FROM ${MODE}-runner AS final
EXPOSE ${PORT}

CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"production\" ]; then node server.js; else yarn dev; fi"]
