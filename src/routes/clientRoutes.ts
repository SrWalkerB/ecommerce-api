import { Router } from 'express'
import ClientControllers from '../controllers/ClientControllers'

const clientRoutes = Router()

clientRoutes.post('/client', ClientControllers.createClient)

export default clientRoutes
