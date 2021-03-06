import { v4 as uuidv4 } from 'uuid'
import crypto from 'crypto'
import ProductData from '../../data/product/ProductData'
import TokenOptions from '../../utils/TokenOptions'
import CompanyServices from '../company/CompanyServices'
import { ICreateProductServices, IUpdateProductServices } from './ProductServicesDTO'
import TypeOfProductServices from '../typeOfProducts/TypeOfProductServices'

export default new class ProductServices {
  async listAllProduct (token: string) {
    const { id } = TokenOptions.verifyToken(token).msg
    const allProducts = await ProductData.listAllProduct(id)
    const products = []

    for (let x = 0; x < allProducts.length; x++) {
      const searchTypeProduct = await TypeOfProductServices.searchTypeID(allProducts[x].id_types)
      const [{ name: nameType }]: any = searchTypeProduct.message

      products.push({
        id_product: allProducts[x].id_product,
        id_company: allProducts[x].id_company,
        name: allProducts[x].name,
        description: allProducts[x].description,
        price: allProducts[x].price,
        id_type: nameType,
        stock: allProducts[x].stock,
        image: allProducts[x].image,
        created_At: allProducts[x].created_At
      })
    }

    return { message: products }
  }

  async createProducts (token: string, data: ICreateProductServices) {
    const searchCompany = await CompanyServices.searchCompany(token)

    if (searchCompany.err) {
      return { message: searchCompany.err }
    }

    const id = searchCompany.msg
    const searchProduct = await ProductData.searchProductName(id, data.name)

    if (searchProduct.length !== 0) {
      return { message: 'product already create' }
    }

    const product = {
      idProduct: `${uuidv4()}-${crypto.randomBytes(16).toString('hex')}`,
      idCompany: id,
      name: data.name,
      description: data.description,
      type: data.type,
      stock: data.stock,
      image: data.image,
      price: data.price
    }

    await ProductData.createProduct({
      idProduct: product.idProduct,
      idCompany: product.idCompany,
      name: product.name,
      description: product.description,
      type: product.type,
      stock: product.stock,
      image: product.image,
      price: product.price
    })

    return { message: 'success', body: [product] }
  }

  async updateProduct (token: string, data: IUpdateProductServices) {
    const { id } = TokenOptions.verifyToken(token).msg
    const searchProduct = await ProductData.searchProduct(data.idProduct, id)

    if (searchProduct.length === 0) {
      return { message: 'produt not exist' }
    }

    const product = {
      idCompany: id,
      idProduct: data.idProduct,
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock,
      type: data.type,
      image: data.image
    }

    await ProductData.updateProduct({
      idCompany: product.idCompany,
      idProduct: product.idProduct,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      type: product.type,
      image: product.image
    })

    return { message: 'success', body: product }
  }

  async deleteProduct (token: string, idProduct: string) {
    const { id } = TokenOptions.verifyToken(token).msg
    const searchProduct = await ProductData.searchProduct(idProduct, id)

    if (searchProduct.length === 0) {
      return { message: 'product not exist' }
    }

    await ProductData.deleteProduct(idProduct, id)

    return { message: 'success' }
  }
}()
