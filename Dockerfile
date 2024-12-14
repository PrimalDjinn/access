FROM node:20.18-slim

WORKDIR /ally

COPY package.json pnpm-lock.yaml ./

RUN corepack enable

RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    bash \
    chromium \
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
RUN touch db.sqlite3 && chmod 447 db.sqlite3 && pnpm migrate

RUN pnpm build \
    && pnpm prune

ENV NITRO_PORT=3000

EXPOSE 3000


RUN addgroup --system appgroup && adduser --system --ingroup appgroup --home /home/appuser appuser
RUN chown -R appuser:appgroup /home/appuser
RUN chown appuser:appgroup db.sqlite3
USER appuser

CMD [ "pnpm", "start" ]