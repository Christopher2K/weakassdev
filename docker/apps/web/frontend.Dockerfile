FROM node:18.15-bullseye-slim as builder

RUN corepack enable
RUN mkdir -p /usr/app
WORKDIR /usr/app
COPY package.json /usr/app
COPY pnpm-*.yaml /usr/app
COPY apps/api/package.json /usr/app/apps/api/package.json
COPY apps/api/pnpm-*.yaml /usr/app/apps/api
COPY apps/web/package.json /usr/app/apps/web/package.json
COPY apps/web/pnpm-*.yaml /usr/app/apps/web
COPY libs/shared/package.json /usr/app/libs/shared/package.json
COPY libs/shared/pnpm-*.yaml /usr/app/libs/shared/
RUN pnpm install
COPY . /usr/app
RUN pnpm build:web

FROM caddy:2.7-alpine as runner

COPY --from=builder /usr/app/apps/web/dist /srv
COPY ./docker/apps/web/Caddyfile /etc/caddy/Caddyfile
EXPOSE 80

