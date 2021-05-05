import { v4 as uuidv4 } from 'uuid'
import { Knex } from 'knex'

export async function seed (knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('type_of_products').del()

  // Inserts seed entries
  await knex('type_of_products')
    .insert([
      {
        id_type: uuidv4(),
        name: 'Accessories-of-technology'
      },
      {
        id_type: uuidv4(),
        name: 'Air-and-ventilation'
      },
      {
        id_type: uuidv4(),
        name: 'Audio'
      },
      {
        id_type: uuidv4(),
        name: 'Camera-and-drones'
      },
      {
        id_type: uuidv4(),
        name: 'Home-appliances'
      },
      {
        id_type: uuidv4(),
        name: 'Sport'
      },
      {
        id_type: uuidv4(),
        name: 'Informatic'
      },
      {
        id_type: uuidv4(),
        name: 'Pet-Shop'
      },
      {
        id_type: uuidv4(),
        name: 'Tv'
      },
      {
        id_type: uuidv4(),
        name: 'Domestic-utility'
      },
      {
        id_type: uuidv4(),
        name: 'Smartphones'
      }
    ])
};
