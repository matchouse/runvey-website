# syntax=docker/dockerfile:1

# Production image for runvey-website (Next.js standalone server).
#
#   docker build -t runvey-website .
#   docker run -d --name runvey-website -p 3000:3000 --restart unless-stopped runvey-website
#
# Put a reverse proxy (Caddy, Nginx, Traefik) in front for TLS.

ARG NODE_VERSION=26
ARG PNPM_VERSION=12.15.0

# ---------------------------------------------------------------------------
# base: Node + pnpm
# ---------------------------------------------------------------------------
FROM node:${NODE_VERSION}-trixie-slim AS base
ARG PNPM_VERSION
ENV PNPM_HOME=/pnpm \
    PATH=/pnpm:$PATH \
    NEXT_TELEMETRY_DISABLED=1
RUN npm install -g --no-fund --no-audit pnpm@${PNPM_VERSION}
WORKDIR /app

# ---------------------------------------------------------------------------
# deps: install from the lockfile only, so this layer is cached until
# package.json / pnpm-lock.yaml / pnpm-workspace.yaml change
# ---------------------------------------------------------------------------
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm config set store-dir /pnpm/store && \
    pnpm install --frozen-lockfile

# ---------------------------------------------------------------------------
# build: produce .next/standalone
# ---------------------------------------------------------------------------
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# ---------------------------------------------------------------------------
# runtime: only the standalone server, static assets and public files
# ---------------------------------------------------------------------------
FROM node:${NODE_VERSION}-trixie-slim AS runtime
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    HOSTNAME=0.0.0.0 \
    PORT=3000
WORKDIR /app

# The image already ships an unprivileged "node" user (uid 1000).
# App files stay owned by root, so the running server can't modify its own
# code. Only the image-optimisation cache is writable, since Next writes it.
COPY --from=build /app/public ./public
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
RUN mkdir -p .next/cache && chown node:node .next/cache

USER node
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD ["node", "-e", "fetch('http://127.0.0.1:'+process.env.PORT+'/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"]

# Run node directly (no npm/pnpm wrapper) so SIGTERM reaches the server
# and `docker stop` shuts it down cleanly.
CMD ["node", "server.js"]
