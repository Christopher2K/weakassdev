import { test } from '@japa/runner';
import Database from '@ioc:Adonis/Lucid/Database';

test.group('[post model tests]', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction();
    return () => Database.rollbackGlobalTransaction();
  });
});
