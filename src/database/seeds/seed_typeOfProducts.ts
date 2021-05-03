import { v4 as uuidv4 } from 'uuid'
import { Knex } from 'knex'

export async function seed (knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('typeOfProducts').del()

  // Inserts seed entries
  await knex('typeOfProducts')
    .insert([
      {
        id_typeProduct: uuidv4(),
        name: 'Accessories-of-technology'
      },
      {
        id_typeProduct: uuidv4(),
        name: 'Air-and-ventilation'
      },
      {
        id_typeProduct: uuidv4(),
        name: 'Audio'
      },
      {
        id_typeProduct: uuidv4(),
        name: 'Camera-and-drones'
      },
      {
        id_typeProduct: uuidv4(),
        name: 'Home-appliances'
      },
      {
        id_typeProduct: uuidv4(),
        name: 'Sport'
      },
      {
        id_typeProduct: uuidv4(),
        name: 'Informatic'
      },
      {
        id_typeProduct: uuidv4(),
        name: 'Pet-Shop'
      },
      {
        id_typeProduct: uuidv4(),
        name: 'Tv'
      },
      {
        id_typeProduct: uuidv4(),
        name: 'Domestic-utility'
      }
    ])
};
