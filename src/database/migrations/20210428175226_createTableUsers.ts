import { Knex } from 'knex'
import dbActions from '../connect'

export async function up (knex: Knex): Promise<void> {
  return await dbActions.schema.createTableIfNotExists('users', table => {
    table.string('id_user')
      .primary()
      .notNullable()

    table.string('email')
      .notNullable()

    table.string('password')
      .notNullable()

    table.string('type', 6)
      .notNullable()

    table.string('created_At')
      .defaultTo(dbActions.fn.now())
      .notNullable()
  })
}

export async function down (knex: Knex): Promise<void> {
  return await dbActions.schema.dropTableIfExists('users')
}
