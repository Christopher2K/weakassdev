import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'UserPostReaction';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.raw('gen_random_uuid()'));
      table.string('reaction', 25).notNullable();

      table.uuid('user_id').references('User.id').onDelete('RESTRICT');
      table.uuid('post_id').references('Post.id').onDelete('RESTRICT');

      table.unique(['post_id', 'user_id'], {
        useConstraint: true,
      });

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: false });
      table.timestamp('updated_at', { useTz: false });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
