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
        name: 'accessories-of-technology'
      },
      {
        id_type: uuidv4(),
        name: 'air-and-ventilation'
      },
      {
        id_type: uuidv4(),
        name: 'audio'
      },
      {
        id_type: uuidv4(),
        name: 'aamera-and-drones'
      },
      {
        id_type: uuidv4(),
        name: 'home-appliances'
      },
      {
        id_type: uuidv4(),
        name: 'sport'
      },
      {
        id_type: uuidv4(),
        name: 'informatic'
      },
      {
        id_type: uuidv4(),
        name: 'pet-shop'
      },
      {
        id_type: uuidv4(),
        name: 'tv'
      },
      {
        id_type: uuidv4(),
        name: 'domestic-utility'
      },
      {
        id_type: uuidv4(),
        name: 'smartphones'
      }
    ])
};
