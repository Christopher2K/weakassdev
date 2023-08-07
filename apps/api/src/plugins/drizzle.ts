import { FastifyPluginAsync } from 'fastify';

import { initialize } from '@app/db/initialize';

/**
 * Make `PostgresJsDatabase` available at `fastify.db`
 * Keep the return type in sync with [src/@types/fastify.d.ts](../@types/fastify.d.ts)
 */
export const drizzlePlugin: FastifyPluginAsync<{}> = async (fastify, _options) => {
  const logger = fastify.log;
  const db = await initialize(logger);
  fastify.decorate('db', db);
};
