import { Router } from 'express'
import ClientControllers from '../controllers/ClientControllers'

const clientRoutes = Router()

clientRoutes.post('/client', ClientControllers.createClient)

clientRoutes.post('/client/favorite/:idProduct', ClientControllers.favoriteProduct)

clientRoutes.delete('/client/favorite/:idProduct', ClientControllers.deleteFavoriteProduct)

export default clientRoutes
