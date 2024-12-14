FROM node:20.18-alpine

WORKDIR /ally

COPY package.json pnpm-lock.yaml ./

RUN corepack enable

RUN apk update && apk add --no-cache \
    curl \
    bash \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    font-noto-cjk \
    libstdc++ \
    udev \
    wget \
    dumb-init

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

RUN pnpm install && pnpm add @libsql/linux-x64-musl

COPY . .

RUN touch db.sqlite && chmod 447 db.sqlite && pnpm migrate

RUN pnpm build \
    && pnpm prune

ENV NITRO_PORT=3000

EXPOSE 3000

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
RUN chown appuser:appgroup db.sqlite
USER appuser


CMD [ "pnpm", "start" ]