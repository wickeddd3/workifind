# syntax=docker/dockerfile:1

# ---------------------------------------------------------------------------
# Base: shared OS deps (Prisma needs openssl; libc6-compat for alpine).
# ---------------------------------------------------------------------------
FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# ---------------------------------------------------------------------------
# Deps: install node_modules from a clean, reproducible lockfile.
# --ignore-scripts avoids running the prisma postinstall before the schema
# is present; the client is generated explicitly in the builder stage.
# ---------------------------------------------------------------------------
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

# ---------------------------------------------------------------------------
# Builder: generate the Prisma client and produce the standalone build.
#
# NEXT_PUBLIC_* are non-secret build args, inlined into the client bundle.
# Server secrets are passed as BuildKit secrets so they never land in an image
# layer or the build cache. All of it is confined to this stage — the final
# `runner` starts FROM base again, so nothing here is baked into the image.
# ---------------------------------------------------------------------------
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ARG NEXT_PUBLIC_CLERK_SIGN_UP_URL
ARG NEXT_PUBLIC_CLERK_SIGN_IN_URL
ARG NEXT_CLERK_SIGN_UP_FALLBACK_URL
ARG NEXT_CLERK_SIGN_IN_FALLBACK_URL
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL \
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY \
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=$NEXT_PUBLIC_CLERK_SIGN_UP_URL \
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=$NEXT_PUBLIC_CLERK_SIGN_IN_URL \
    NEXT_CLERK_SIGN_UP_FALLBACK_URL=$NEXT_CLERK_SIGN_UP_FALLBACK_URL \
    NEXT_CLERK_SIGN_IN_FALLBACK_URL=$NEXT_CLERK_SIGN_IN_FALLBACK_URL

# `build` runs `prisma generate && next build` (see package.json). Server
# secrets are optional (|| true) so a build without static DB/Clerk access
# still succeeds. Provide them like:
#   docker build \
#     --secret id=clerk_secret_key,env=CLERK_SECRET_KEY \
#     --secret id=postgres_url,env=POSTGRES_URL \
#     --secret id=postgres_url_non_pooling,env=POSTGRES_URL_NON_POOLING .
RUN --mount=type=secret,id=clerk_secret_key \
    --mount=type=secret,id=postgres_url \
    --mount=type=secret,id=postgres_url_non_pooling \
    export CLERK_SECRET_KEY="$(cat /run/secrets/clerk_secret_key 2>/dev/null || true)"; \
    export POSTGRES_URL="$(cat /run/secrets/postgres_url 2>/dev/null || true)"; \
    export POSTGRES_URL_NON_POOLING="$(cat /run/secrets/postgres_url_non_pooling 2>/dev/null || true)"; \
    npm run build

# ---------------------------------------------------------------------------
# Runner: minimal, non-root runtime image. Only the standalone server, static
# assets, public files, and the Prisma schema/engine are copied in.
# ---------------------------------------------------------------------------
FROM base AS runner
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

# next.config sets output: "standalone", which bundles a minimal server.js
# plus only the node_modules it traced as needed.
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Prisma schema + migrations + generated engine, so `prisma migrate deploy`
# can be run against this image if desired.
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
