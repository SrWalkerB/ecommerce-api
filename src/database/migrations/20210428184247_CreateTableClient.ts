import { Knex } from 'knex'
import dbActions from '../connect'

export async function up (knex: Knex): Promise<void> {
  return await dbActions.schema.createTableIfNotExists('client', table => {
    table.string('id_client')
      .references('id_user')
      .inTable('users')
      .onDelete('CASCADE')
      .primary()
      .notNullable()

    table.string('name', 30)
      .notNullable()

    table.string('lastName', 30)
      .notNullable()

    table.string('cpf', 11)
      .notNullable()

    table.timestamp('created_At')
      .defaultTo(dbActions.fn.now())
      .notNullable()
  })
}

export async function down (knex: Knex): Promise<void> {
  return await dbActions.schema.dropTableIfExists('client')
}
