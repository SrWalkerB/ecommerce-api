import { Knex } from 'knex'
import dbActions from '../connect'

export async function up (knex: Knex): Promise<void> {
  return await dbActions.schema.createTableIfNotExists('company', table => {
    table.string('id')
      .notNullable()

    table.string('name', 60)
      .notNullable()

    table.string('cnpj', 11)
      .notNullable()

    table.string('email')
      .notNullable()

    table.string('password')
      .notNullable()

    table.string('created_At')
      .defaultTo(dbActions.fn.now())
      .notNullable()
  })
}

export async function down (knex: Knex): Promise<void> {
  return await dbActions.schema.dropTableIfExists('company')
}
