import { Knex } from 'knex'
import dbActions from '../connect'

export async function up (knex: Knex): Promise<void> {
  return await dbActions.schema.createTableIfNotExists('products', table => {
    table.string('id_product')
      .primary()
      .notNullable()

    table.string('id_company')
      .references('id_company')
      .inTable('company')
      .onDelete('CASCADE')
      .notNullable()

    table.string('name', 50)
      .notNullable()

    table.string('description')
      .notNullable()

    table.float('price')
      .notNullable()

    table.string('id_type')
      .references('id_typeProduct')
      .inTable('typeOfProducts')
      .defaultTo('product')
      .notNullable()

    table.bigInteger('stock')
      .notNullable()

    table.string('image')
      .notNullable()

    table.timestamp('created_At')
      .defaultTo(dbActions.fn.now())
      .notNullable()
  })
}

export async function down (knex: Knex): Promise<void> {
  return await dbActions.schema.dropTableIfExists('products')
}
