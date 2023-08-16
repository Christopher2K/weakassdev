import BaseSchema from '@ioc:Adonis/Lucid/Schema';

import { postStatusDbName, postStatusSchema } from '@weakassdev/shared/models';

export default class extends BaseSchema {
  protected tableName = 'Post';

  public async up() {
    this.schema.raw(`DROP TYPE IF EXISTS "${postStatusDbName}";`);

    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.raw('gen_random_uuid()'));
      table.text('content').notNullable();
      table
        .enum(
          'status',
          [
            postStatusSchema.Values.DELETED,
            postStatusSchema.Values.FLAGGED,
            postStatusSchema.Values.ARCHIVED,
            postStatusSchema.Values.PUBLISHED,
          ],
          {
            useNative: true,
            existingType: false,
            enumName: postStatusDbName,
          },
        )
        .defaultTo(postStatusSchema.Values.PUBLISHED)
        .notNullable();

      table.uuid('author_id').references('User.id').onDelete('RESTRICT').notNullable();

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: false });
      table.timestamp('updated_at', { useTz: false });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
    this.schema.raw(`DROP TYPE "${postStatusDbName}";`);
  }
}
