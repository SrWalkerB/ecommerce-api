import { config } from 'dotenv'
import cors from 'cors'
import express from 'express'
import company from './routes/companyRoutes'
import productRoutes from './routes/productRoutes'
import userRoutes from './routes/userRoutes'
import clientRoutes from './routes/clientRoutes'

config()

const app = express()

app.use(cors())

app.use(express.json())

app.use(userRoutes)

app.use(company)

app.use(clientRoutes)

app.use(productRoutes)

export default app
