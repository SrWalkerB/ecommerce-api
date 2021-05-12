import { Router } from 'express'
import ProductControllers from '../controllers/ProductControllers'
import autenticate from '../middlewares/autenticate'
import { verifyCompany } from '../middlewares/verifyCompanyMiddleware copy'

const productRoutes = Router()

productRoutes.get('/typesAllProducts', ProductControllers.listAllTypeOfProduct)

productRoutes.get('/productsByTypes/:type', ProductControllers.searchProductsByTypes)

productRoutes.get('/products', autenticate.autenticate, verifyCompany, ProductControllers.listAllProduct)

productRoutes.post('/products', autenticate.autenticate, verifyCompany, ProductControllers.createProduct)

productRoutes.put('/products/:idProduct', autenticate.autenticate, verifyCompany, ProductControllers.updateProduct)

productRoutes.delete('/products/:idProduct', autenticate.autenticate, verifyCompany, ProductControllers.deleteProduct)

export default productRoutes
