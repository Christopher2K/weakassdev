import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

export async function dbInitialize() {
  console.debug('[DB] DB init...');
  const DATABASE_URL = process.env.DATABASE_URL;
  const IS_PRODUCTION = process.env.NODE_ENV === 'production';

  if (!DATABASE_URL) {
    console.error('DATABASE_URL variable is not set');
    process.exit(1);
  }

  if (IS_PRODUCTION) {
    console.debug('[DB] Running migration...');

    const DRIZZLE_FOLDER = process.env.DRIZZLE_FOLDER;
    if (!DRIZZLE_FOLDER) {
      console.error('DRIZZLE_FOLDER variable is not set');
      process.exit(1);
    }

    const migrationClient = postgres(DATABASE_URL, { max: 1 });
    await migrate(drizzle(migrationClient), {
      migrationsFolder: DRIZZLE_FOLDER,
    });
  } else {
    console.log('[DB] Not in prod, migration are not applied automatically');
  }

  const queryClient = postgres(DATABASE_URL);
  return drizzle(queryClient) satisfies PostgresJsDatabase;
}
