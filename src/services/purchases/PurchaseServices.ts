import { v4 as uuidv4 } from 'uuid'
import crypto from 'crypto'
import ProductData from '../../data/product/ProductData'
import PurchasesData from '../../data/purchases/PurchasesData'
import TokenOptions from '../../utils/TokenOptions'
import { ICreatePurchaseServices } from './PurchaseServicesDTO'

export default new class PurchaseServices {
  async listAllPurchasesClient (token: string) {
    const { id } = TokenOptions.verifyToken(token).msg
    const searchPurchase = await PurchasesData.listAllPurchasesClient(id)

    if (searchPurchase.length === 0) {
      return { message: 'not exist purchases' }
    }

    return { message: 'success', body: [searchPurchase] }
  }

  async createPurchase (data: ICreatePurchaseServices) {
    const { id: idClient } = TokenOptions.verifyToken(data.token).msg
    const searchProduct = await ProductData.searchProductID(data.idProduct)

    if (searchProduct.length === 0) {
      return { message: 'product not found' }
    }

    const [{ id_company: idCompany, name, price, stock }] = searchProduct
    const newStock = stock - data.theAmount

    if (data.theAmount > stock) {
      return { message: `the amount invalid, stock: ${stock}` }
    }

    const purchase = {
      idPurchase: `${uuidv4()}-${crypto.randomBytes(16).toString('hex')}`,
      idClient: idClient,
      idCompany: idCompany,
      idProduct: data.idProduct,
      nameProduct: name,
      price: price,
      theAmount: data.theAmount
    }

    await ProductData.updateStockProduct(data.idProduct, idCompany, newStock)

    await PurchasesData.createPurchases({
      idPurchase: purchase.idPurchase,
      idProduct: purchase.idProduct,
      idCompany: purchase.idCompany,
      idClient: purchase.idClient,
      price: purchase.price,
      theAmount: purchase.theAmount
    })

    return { message: 'sucess', body: [purchase] }
  }
}()
