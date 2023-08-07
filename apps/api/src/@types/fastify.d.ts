import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

declare module 'fastify' {
  interface FastifyInstance {
    db: PostgresJsDatabase;
  }
}
