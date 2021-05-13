import { Knex } from 'knex'
import dbActions from '../connect'

export async function up (knex: Knex): Promise<void> {
  return await dbActions.schema.createTableIfNotExists('purchases', table => {
    table.string('id_purchase')
      .primary()
      .notNullable()

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

    table.integer('the_Amount')
      .notNullable()

    table.float('price')
      .notNullable()

    table.string('status', 10)
      .defaultTo('pending')
      .notNullable()

    table.timestamp('created_At')
      .defaultTo(dbActions.fn.now())
      .notNullable()
  })
}

export async function down (knex: Knex): Promise<void> {
  return await dbActions.schema.dropTableIfExists('purchases')
}
