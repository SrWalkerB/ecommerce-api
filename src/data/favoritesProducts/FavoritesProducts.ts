import dbActions from '../../database/connect'
import { ICreateAndRemoveFavoritesProducts, IListAllFavoritesProducts } from './FavoritesProductsDTO'

export default new class FavoritesProducts {
  listAllFavoritesProducts (data: IListAllFavoritesProducts) {
    return dbActions('favorites_products')
      .where('id_client', data.idClient)
      .where('id_company', data.idCompany)
  }

  createFavoritesProducts (data: ICreateAndRemoveFavoritesProducts) {
    return dbActions('favorites_products')
      .insert({
        id_product: data.idProduct,
        id_client: data.idClient,
        id_company: data.idCompany
      })
  }

  removeFavoritesProducts (data: ICreateAndRemoveFavoritesProducts) {
    return dbActions('favorites_products')
      .where('id_product', data.idProduct)
      .where('id_client', data.idClient)
      .where('id_company', data.idCompany)
      .del()
  }
}()
