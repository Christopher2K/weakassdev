FROM node:18.15-bullseye-slim

ENV SHELL=bash
ENV PNPM_HOME=/root/.local/share/pnpm
ENV PATH="${PATH}:${PNPM_HOME}"

RUN corepack enable

WORKDIR /code

COPY turbo.json /code/turbo.json

COPY package.json /code/package.json
COPY pnpm-*.yaml /code/

COPY apps/api/package.json /code/apps/api/package.json
COPY apps/api/pnpm-*.yaml /code/apps/api/

COPY apps/web/package.json /code/apps/web/package.json
COPY apps/web/pnpm-*.yaml /code/apps/web/

COPY libs/shared/package.json /code/libs/shared/package.json
COPY libs/shared/pnpm-*.yaml /code/libs/shared/

RUN pnpm install --ignore-scripts
