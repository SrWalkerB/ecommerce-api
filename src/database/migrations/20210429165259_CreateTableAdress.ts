import { Knex } from 'knex'
import dbActions from '../connect'

export async function up (knex: Knex): Promise<void> {
  return await dbActions.schema.createTableIfNotExists('address', table => {
    table.string('id')
      .references('id_user')
      .inTable('users')
      .notNullable()

    table.integer('cep', 8)
      .notNullable()

    table.string('street', 50)
      .notNullable()

    table.string('neighborhood', 50)
      .notNullable()

    table.string('number', 15)
      .notNullable()

    table.string('city', 50)
      .notNullable()

    table.string('state', 50)
      .notNullable()

    table.string('coutry', 50)
      .notNullable()

    table.timestamp('created_At')
      .defaultTo(dbActions.fn.now())
      .notNullable()
  })
}

export async function down (knex: Knex): Promise<void> {
  return await dbActions.schema.dropTableIfExists('address')
}
