import { Router } from 'express'
import ClientControllers from '../controllers/ClientControllers'
import autenticate from '../middlewares/autenticate'

const clientRoutes = Router()

clientRoutes.post('/client', ClientControllers.createClient)

clientRoutes.get('/client/favorite', ClientControllers.myListFavoritesProduct)

clientRoutes.post('/client/favorite/:idProduct', autenticate.autenticate, ClientControllers.favoriteProduct)

clientRoutes.delete('/client/favorite/:idProduct', ClientControllers.deleteFavoriteProduct)

export default clientRoutes
