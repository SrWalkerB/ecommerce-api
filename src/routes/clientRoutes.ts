import { Router } from 'express'
import ClientControllers from '../controllers/ClientControllers'

const clientRoutes = Router()

clientRoutes.post('/client', ClientControllers.createClient)

clientRoutes.post('/client/favorite/:idProduct', ClientControllers.favoriteProduct)

export default clientRoutes
