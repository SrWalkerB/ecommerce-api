import { Knex } from 'knex'
import dbActions from '../connect'

export async function up (knex: Knex): Promise<void> {
  return await dbActions.schema.createTableIfNotExists('typeOfProducts', table => {
    table.string('id_typeProduct')
      .primary()
      .notNullable()

    table.string('name', 50)
      .unique()
      .notNullable()

    table.timestamp('created_At')
      .defaultTo(dbActions.fn.now())
      .notNullable()
  })
}

export async function down (knex: Knex): Promise<void> {
  return await dbActions.schema.dropTableIfExists('typeOfProducts')
}
