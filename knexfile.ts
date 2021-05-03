import { config } from 'dotenv'

config()

export default {
  development: {
    client: process.env.CLIENT,
    connection: {
      database: process.env.DATABASE,
      user: process.env.USER,
      host: process.env.HOST,
      password: process.env.PASSWORD
    },
    migrations: {
      tableName: 'migrations',
      directory: './src/database/migrations'
    }
  }

}
