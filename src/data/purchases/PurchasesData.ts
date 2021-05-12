import dbActions from '../../database/connect'
import { ICreatePurchasesData } from './PurchasesDTO'

export default new class PurchasesData {
  listAllPurchasesClient (idClient: string) {
    return dbActions('purchases')
      .where('id_client', idClient)
  }

  listAllRequestSalesCompany (idCompany: string) {
    return dbActions('purchases')
      .where('id_company', idCompany)
  }

  listAllPurchaseStatusClient (idClient: string, status: string) {
    return dbActions('purchases')
      .where('id_client', idClient)
      .where('status', status)
  }

  listAllRequestStatusCompany (idCompany: string, status: string) {
    return dbActions('purchases')
      .where('id_company', idCompany)
      .where('status', status)
  }

  searchPurchases (idPurchase: string) {
    return dbActions('purchases')
      .where('id_purchase', idPurchase)
  }

  createPurchases (data: ICreatePurchasesData) {
    return dbActions('purchases')
      .insert({
        id_purchase: data.idPurchase,
        id_product: data.idProduct,
        id_client: data.idClient,
        id_company: data.idCompany,
        the_Amount: data.theAmount,
        price: data.price
      })
  }

  deletePurchases (idProduct: string) {
    return dbActions('purchases')
      .where('id_purchase', idProduct)
      .del()
  }
}()
