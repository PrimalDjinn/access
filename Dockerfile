FROM node:20.18-alpine

WORKDIR /a11y

COPY package.json pnpm-lock.yaml ./

RUN corepack enable

RUN pnpm install

COPY . .

RUN pnpm build \
    pnpm prune

ENV NITRO_PORT=3000

EXPOSE 3000

CMD [ "pnpm", "start" ]