import BaseSchema from '@ioc:Adonis/Lucid/Schema';

import {
  userRoleDbName,
  userStatusDbName,
  userStatusSchema,
  userRoleSchema,
} from '@weakassdev/shared/models';

export default class extends BaseSchema {
  protected tableName = 'User';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.raw('gen_random_uuid()'));
      table.string('username', 25).unique().notNullable();
      table.text('password').nullable();
      table.string('email').nullable().unique();
      table.string('avatar_url').nullable();
      table.text('biography').nullable();
      table.jsonb('external_links').defaultTo({ value: [] });

      table
        .enum('role', [userRoleSchema.Values.USER, userRoleSchema.Values.ADMIN], {
          useNative: true,
          existingType: false,
          enumName: userRoleDbName,
        })
        .defaultTo(userRoleSchema.Values.USER)
        .notNullable();

      table
        .enum(
          'status',
          [
            userStatusSchema.Values.ACTIVE,
            userStatusSchema.Values.BANNED,
            userStatusSchema.Values.DELETED,
          ],
          {
            useNative: true,
            existingType: false,
            enumName: userStatusDbName,
          },
        )
        .defaultTo(userStatusSchema.Values.ACTIVE)
        .notNullable();

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: false });
      table.timestamp('updated_at', { useTz: false });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
    this.schema.raw(`DROP TYPE "${userRoleDbName}";`);
    this.schema.raw(`DROP TYPE "${userStatusDbName}";`);
  }
}
