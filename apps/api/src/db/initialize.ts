import { FastifyBaseLogger } from 'fastify';
import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

import { env, isProduction } from '@app/env';

/**
 * Initialize the database using `postgres` and `drizzle`
 * In production, it will run the migration function to apply SQL migrations
 * @param logger - @type FastifyBaseLogger
 * @requires env `DATABASE_URL` and env `DRIZZLE_FOLDER` (production only)
 * @throws if env variables are not set
 */
export async function initialize(logger: FastifyBaseLogger) {
  logger.info('DB init...');

  if (isProduction) {
    logger.info('[DB] Running migration...');

    try {
      const migrationClient = postgres(env.DATABASE_URL, { max: 1 });
      await migrate(drizzle(migrationClient), {
        migrationsFolder: env.DRIZZLE_FOLDER,
      });
    } catch (e) {
      logger.error(e);
      process.exit(1);
    }
  } else {
    logger.info('[DB] Not in prod, migration are not applied automatically');
  }

  const queryClient = postgres(env.DATABASE_URL);
  return drizzle(queryClient) satisfies PostgresJsDatabase;
}
