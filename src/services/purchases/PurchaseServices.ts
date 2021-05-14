import { v4 as uuidv4 } from 'uuid'
import crypto from 'crypto'
import ProductData from '../../data/product/ProductData'
import PurchasesData from '../../data/purchases/PurchasesData'
import TokenOptions from '../../utils/TokenOptions'
import { ICreatePurchaseServices } from './PurchaseServicesDTO'
import ClientData from '../../data/client/ClientData'
import AddressData from '../../data/address/AddressData'

export default new class PurchaseServices {
  async listAllPurchasesClient (token: string) {
    const { id } = TokenOptions.verifyToken(token).msg
    const searchPurchase = await PurchasesData.listAllPurchasesClient(id)

    if (searchPurchase.length === 0) {
      return { message: 'not exist purchases' }
    }

    return { message: 'success', body: [searchPurchase] }
  }

  async listSalesPendingCompany (token: string) {
    const buy = []
    const { id } = TokenOptions.verifyToken(token).msg
    const searchSalesPending = await PurchasesData.listAllRequestSalesCompanyPending(id)

    for (let x = 0; x < searchSalesPending.length; x++) {
      const [{
        id_purchase: idPurchase,
        id_client: idClient,
        id_product: idProduct,
        the_Amount: theAmount,
        price,
        status
      }] = searchSalesPending

      const [{
        name,
        lastName,
        cpf
      }] = await ClientData.searchId(idClient)

      const [{
        cep,
        street,
        neighborhood,
        number,
        city,
        state,
        coutry
      }] = await AddressData.searchAddress(idClient)

      const [{ name: productName }] = await ProductData.searchProductID(idProduct)

      buy.push({
        idPurchase: idPurchase,
        product: {
          idProduct: idProduct,
          name: productName,
          theAmount: theAmount,
          price: price,
          status: status
        },
        client: {
          name: name,
          lastName: lastName,
          cpf: cpf,
          address: {
            cep: cep,
            street: street,
            number: number,
            neighborhood: neighborhood,
            city: city,
            state: state,
            coutry: coutry
          }
        }
      })
    }

    if (searchSalesPending.length === 0) {
      return { message: 'not exist sales pending' }
    }

    return { message: 'success', body: buy }
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
