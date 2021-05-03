import { Router } from 'express'
import ProductControllers from '../controllers/ProductControllers'
import autenticate from '../middlewares/autenticate'

const productRoutes = Router()

productRoutes.get('/products', autenticate.autenticate, ProductControllers.listAllProduct)

productRoutes.post('/products', autenticate.autenticate, ProductControllers.createProduct)

productRoutes.put('/products/:idProduct', autenticate.autenticate, ProductControllers.updateProduct)

export default productRoutes
