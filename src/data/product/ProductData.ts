import dbActions from '../../database/connect'
import { ICreateProductData, IUpdateProductData } from './ProductDataDTO'

export default new class ProductData {
  searchProduct (idProduct: string, idCompany: string) {
    return dbActions('products')
      .where('id_product', idProduct)
      .where('id_company', idCompany)
  }

  searchProductID (idProduct: string) {
    return dbActions('products')
      .where('id_product', idProduct)
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

  listAllTypeProduct (idType: string) {
    return dbActions('products')
      .where('id_types', idType)
  }

  createProduct (data: ICreateProductData) {
    return dbActions('products').insert({
      id_product: data.idProduct,
      id_company: data.idCompany,
      name: data.name,
      description: data.description,
      price: data.price,
      id_types: data.type,
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
        description: data.description,
        id_types: data.type,
        stock: data.stock,
        image: data.image
      })
  }

  updateStockProduct (idProduct: string, idCompany: string, newStock: number) {
    return dbActions('products')
      .where('id_product', idProduct)
      .where('id_company', idCompany)
      .update({
        stock: newStock
      })
  }

  deleteProduct (idProduct: string, idCompany: string) {
    return dbActions('products')
      .where('id_product', idProduct)
      .where('id_company', idCompany)
      .del()
  }
}()
