// @ts-check

export const up = (knex) => (
  knex.schema.createTable('tasks', (table) => {
    table.increments('id').unsigned().primary();
    table.string('name').notNullable();
    table.string('description');
    table
      .integer('status_id')
      .references('id')
      .inTable('statuses')
    table
      .integer('creator_id')
      .references('id')
      .inTable('users')
    table
      .integer('executor_id')
      .references('id')
      .inTable('users')
    table.timestamp('created_at').defaultTo(knex.fn.now());
  })
);

export const down = (knex) => knex.schema.dropTable('tasks');
