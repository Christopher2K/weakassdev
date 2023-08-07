import process from 'node:process';
import Fastify from 'fastify';

import { drizzlePlugin } from '@app/plugins';

import { EXAMPLE } from '@weakassdev/shared';

const APP_PORT = +process.env.PORT! || +process.env.API_PORT!;

const fastify = Fastify({
  logger: true,
  ignoreTrailingSlash: true,
});

fastify.register(drizzlePlugin);

// Declare a route
fastify.get('/', async function handler() {
  return { hello6: EXAMPLE };
});

// Run the server!
(() => {
  try {
    fastify.listen({ port: APP_PORT, host: '0.0.0.0' });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
})();
