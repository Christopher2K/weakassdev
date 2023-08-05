import type { Config } from 'drizzle-kit';

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) throw Error('DATABASE_URL is not defined');

export default {
  schema: './src/db/index.ts',
  out: './drizzle',
  dbCredentials: {
    connectionString: dbUrl,
  },
} satisfies Config;
