import { config } from 'dotenv'
import express from 'express'
import company from './routes/companyRoutes'
import productRoutes from './routes/productRoutes'
import userRoutes from './routes/userRoutes'

config()

const app = express()

app.use(express.json())

app.use(userRoutes)

app.use(company)

app.use(productRoutes)

export default app
