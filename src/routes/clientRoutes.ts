import { Router } from 'express'
import ClientControllers from '../controllers/ClientControllers'
import autenticate from '../middlewares/autenticate'

const clientRoutes = Router()

clientRoutes.post('/client', ClientControllers.createClient)

clientRoutes.get('/client/favorite', autenticate.autenticate, ClientControllers.myListFavoritesProduct)

clientRoutes.post('/client/favorite/:idProduct', autenticate.autenticate, ClientControllers.favoriteProduct)

clientRoutes.delete('/client/favorite/:idProduct', autenticate.autenticate, ClientControllers.deleteFavoriteProduct)

export default clientRoutes
