import { DateTime } from 'luxon';

import Database from '@ioc:Adonis/Lucid/Database';
import { DatabaseQueryBuilderContract } from '@ioc:Adonis/Lucid/Database';

export type EntitiesCount = {
  [key: `${string}Count`]: number;
};

/**
 * Get the object count in every table passed as an argument
 * @throws if a table does not exists
 * @returns an object where each key represent a count for a specific table. The key name is the table lowercased + `Count` as a suffix
 */
export async function getEntitiesCount(...tables: string[]): Promise<EntitiesCount> {
  const results = await tables.reduce<DatabaseQueryBuilderContract<EntitiesCount>>(
    (query, table) =>
      query.select(Database.from(table).count('*').as(`${table.toLowerCase()}Count`)),
    Database.query(),
  );

  return results.at(0) ?? {};
}

/**
 * Get the object count in every table passed as an argument since the last Monday
 * @throws if a table does not exists
 * @returns an object where each key represent a count for a specific table. The key name is the table lowercased + `Count` as a suffix
 */
export async function getEntitiesCurrentWeekCount(...tables: string[]): Promise<EntitiesCount> {
  const firstDayOfThisWeek = DateTime.now()
    .toUTC()
    .set({ weekday: 1, hour: 0, minute: 0, second: 0 });

  const results = await tables.reduce<DatabaseQueryBuilderContract<EntitiesCount>>(
    (query, table) =>
      query.select(
        Database.from(table)
          .count('*')
          .as(`${table.toLowerCase()}Count`)
          .where('created_at', '>=', firstDayOfThisWeek.toString()),
      ),
    Database.query(),
  );

  return Object.entries(results.at(0) ?? {}).reduce(
    (acc, [key, item]) => ({
      ...acc,
      [key]: +item,
    }),
    {},
  );
}
