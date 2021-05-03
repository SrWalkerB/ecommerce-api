import dbActions from '../../database/connect'
import { ICreateProductData, IUpdateProductData } from './ProductDataDTO'

export default new class ProductData {
  searchProduct (idProduct: string, idCompany: string) {
    return dbActions('products')
      .where('id_product', idProduct)
      .where('id_company', idCompany)
  }

  searchProductName (idCompany: string, name: string) {
    return dbActions('products')
      .where('id_company', idCompany)
      .where('name', name)
  }

  listAllProduct (idCompany: string) {
    return dbActions('products')
      .where('id_company', idCompany)
  }

  listAllTypeProduct (type: string) {
    return dbActions('products')
      .where('type', type)
  }

  createProduct (data: ICreateProductData) {
    return dbActions('product').insert({
      id_product: data.idProduct,
      id_company: data.idCompany,
      name: data.name,
      price: data.price,
      type: data.type,
      stock: data.stock,
      image: data.image
    })
  }

  updateProduct (data: IUpdateProductData) {
    return dbActions('products')
      .where('id_product', data.idProduct)
      .where('id_company', data.idCompany)
      .update({
        name: data.name,
        price: data.price,
        type: data.type,
        stock: data.stock,
        image: data.image
      })
  }

  deleteProduct (idProduct: string, idCompany: string) {
    return dbActions('products')
      .where('id_product', idProduct)
      .where('id_company', idCompany)
      .del()
  }
}()
