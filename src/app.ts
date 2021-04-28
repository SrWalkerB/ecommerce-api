import { config } from 'dotenv'
import express from 'express'
import company from './routes/companyRoutes'
import userRoutes from './routes/userRoutes'

config()

const app = express()

app.use(express.json())

app.use(userRoutes)

app.use(company)

export default app
