import { Router } from 'express'
import ClientControllers from '../controllers/ClientControllers'
import autenticate from '../middlewares/autenticate'
import { verifyClient } from '../middlewares/verifyClientMiddleware'

const clientRoutes = Router()

clientRoutes.post('/client', ClientControllers.createClient)

clientRoutes.get('/client/favorite', autenticate.autenticate, verifyClient, ClientControllers.myListFavoritesProduct)

clientRoutes.post('/client/favorite/:idProduct', autenticate.autenticate, verifyClient, ClientControllers.favoriteProduct)

clientRoutes.delete('/client/favorite/:idProduct', autenticate.autenticate, verifyClient, ClientControllers.deleteFavoriteProduct)

export default clientRoutes
