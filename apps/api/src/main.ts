import process from 'node:process';

import { buildApp } from './app';
import { env } from './env';

const fastify = buildApp({});

try {
  await fastify.listen({ port: env.PORT, host: '0.0.0.0' });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
