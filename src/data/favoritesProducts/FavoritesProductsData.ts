import dbActions from '../../database/connect'
import { ICreateAndRemoveFavoritesProducts } from './FavoritesProductsDataDTO'

export default new class FavoritesProducts {
  searchFavoriteProductClient (idClient: string, idProduct: string) {
    return dbActions('favorites_products')
      .where('id_client', idClient)
      .where('id_product', idProduct)
  }

  listAllFavoritesProducts (idClient: string) {
    return dbActions('favorites_products')
      .where('id_client', idClient)
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
