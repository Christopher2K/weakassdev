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
