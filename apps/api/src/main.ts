import process from 'node:process';
import Fastify from 'fastify';
import { EXAMPLE } from '@weakassdev/shared';

const APP_PORT = +process.env.PORT!;

const fastify = Fastify({
  logger: true,
});

// Declare a route
fastify.get('/', async function handler() {
  return { hello6: EXAMPLE };
});

// Run the server!
try {
  await fastify.listen({ port: APP_PORT, host: '0.0.0.0' });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
