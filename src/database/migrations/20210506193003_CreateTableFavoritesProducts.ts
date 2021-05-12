import { Knex } from 'knex'
import dbActions from '../connect'

export async function up (knex: Knex): Promise<void> {
  return await dbActions.schema.createTableIfNotExists('favorites_products', table => {
    table.string('id_product')
      .references('id_product')
      .inTable('products')
      .onDelete('CASCADE')
      .notNullable()

    table.string('id_client')
      .references('id_client')
      .inTable('client')
      .onDelete('CASCADE')
      .notNullable()

    table.string('id_company')
      .references('id_company')
      .inTable('company')
      .onDelete('CASCADE')
      .notNullable()

    table.timestamp('created_At')
      .defaultTo(dbActions.fn.now())
      .notNullable()
  })
}

export async function down (knex: Knex): Promise<void> {
  return dbActions.schema.dropTableIfExists('favorites_product')
}
