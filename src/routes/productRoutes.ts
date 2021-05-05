import { Router } from 'express'
import ProductControllers from '../controllers/ProductControllers'
import autenticate from '../middlewares/autenticate'

const productRoutes = Router()

productRoutes.get('/products', autenticate.autenticate, ProductControllers.listAllProduct)

productRoutes.get('/typesAllProducts', ProductControllers.listAllTypeOfProduct)

productRoutes.get('/productsByTypes/:type', ProductControllers.searchProductsByTypes)

productRoutes.post('/products', autenticate.autenticate, ProductControllers.createProduct)

productRoutes.put('/products/:idProduct', autenticate.autenticate, ProductControllers.updateProduct)

productRoutes.delete('/products/:idProduct', autenticate.autenticate, ProductControllers.deleteProduct)

export default productRoutes
