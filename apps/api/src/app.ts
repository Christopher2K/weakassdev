import fastify, { FastifyServerOptions } from 'fastify';

import { drizzlePlugin } from '@app/plugins';
import { type Env, env } from '@app/env';

import { EXAMPLE } from '@weakassdev/shared';

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
  app.get('/', async function handler() {
    return { hello6: EXAMPLE };
  });

  return app;
}
