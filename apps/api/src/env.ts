import z from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string(),
  PORT: z.string().transform(Number).default('8001'),
  NODE_ENV: z.enum(['production', 'test', 'development']).default('development'),
  DRIZZLE_FOLDER: z.string(),
});

export type Env = z.infer<typeof envSchema>;

/**
 * Contains type safe and valid environment variable this app needs
 */
export let env: Env;

try {
  env = envSchema.parse(process.env);
} catch (e) {
  console.error('[ENV] Incorrect env setting');
  console.error(e);
  process.exit(1);
}

export const isProduction = env.NODE_ENV === 'production';
