import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL, { max: 1 });
const db = drizzle(sql);

await migrate(db, { migrationsFolder: 'drizzle' })
  .then(() => {
    console.log('Migrations completed successfully');
  })
  .catch(console.error)
  .finally(() => {
    sql.end();
  });
