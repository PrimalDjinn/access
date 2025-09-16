FROM node:22-slim

WORKDIR /ally

COPY package.json pnpm-*.yaml ./

RUN corepack enable

RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    bash \
    chromium \
    chromium-sandbox \
    fonts-noto \
    ca-certificates \
    libnss3 \
    libatk-bridge2.0-0 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libcups2 \
    libpangocairo-1.0-0 \
    libgbm1 \
    libasound2 \
    dumb-init \
    && rm -rf /var/lib/apt/lists/*

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

RUN pnpm install

COPY . .

ENV DATABASE_URL=file:./db.sqlite3

RUN pnpm build \
    && pnpm prune

ENV NITRO_PORT=3000

EXPOSE 3000


RUN addgroup --system appgroup \
    && adduser --system --ingroup appgroup --home /home/appuser appuser \
    && chown -R appuser:appgroup /home/appuser

RUN touch db.sqlite3 \
    && chmod 664 db.sqlite3 \
    && chown appuser:appgroup db.sqlite3 \
    && pnpm migrate \
    && chown -R appuser:appgroup /ally

USER appuser

CMD [ "pnpm", "start" ]
