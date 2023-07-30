import process from 'node:process';
import Fastify from 'fastify';
import { EXAMPLE } from '@weakassdev/shared/example';

const fastify = Fastify({
  logger: true,
});

// Declare a route
fastify.get('/', async function handler(request, reply) {
  return { hello: EXAMPLE };
});

// Run the server!
try {
  await fastify.listen({ port: 3001 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
