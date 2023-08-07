import fastify, { FastifyServerOptions } from 'fastify';

import { drizzlePlugin } from '@app/plugins';
import { type Env, env } from '@app/env';
import { V1 } from '@app/controllers/v1';

const logConfig: Record<Env['NODE_ENV'], FastifyServerOptions['logger']> = {
  development: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
  production: true,
  test: false,
};

type BuildAppArgs = {};

export function buildApp({}: BuildAppArgs) {
  const app = fastify({
    logger: logConfig[env.NODE_ENV],
    ignoreTrailingSlash: true,
  });

  // PLUGINS
  app.register(drizzlePlugin);

  // CONTROLLERS
  app.register(V1, { prefix: '/v1' });

  return app;
}
