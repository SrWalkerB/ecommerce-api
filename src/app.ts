import { config } from 'dotenv'
import express from 'express'
import company from './routes/company'

config()

const app = express()

app.use(express.json())

app.use(company)

export default app
