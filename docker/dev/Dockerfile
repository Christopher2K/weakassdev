FROM node:18.15-bullseye

ENV SHELL=bash

RUN corepack enable

WORKDIR /usr/src/app

COPY turbo.json ./
COPY package.json ./
COPY yarn.lock ./

COPY apps/api/package.json ./apps/api/

COPY apps/web/package.json ./apps/web/

COPY libs/shared/package.json ./libs/shared/

COPY libs/config/package.json ./libs/config/

RUN yarn install
