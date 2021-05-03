import { Router } from 'express'
import ProductControllers from '../controllers/ProductControllers'
import autenticate from '../middlewares/autenticate'

const productRoutes = Router()

productRoutes.get('/products', autenticate.autenticate, ProductControllers.listAllProduct)

export default productRoutes
