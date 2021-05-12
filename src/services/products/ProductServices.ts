import { v4 as uuidv4 } from 'uuid'
import crypto from 'crypto'
import CompanyData from '../../data/company/CompanyData'
import ProductData from '../../data/product/ProductData'
import TokenOptions from '../../utils/TokenOptions'
import CompanyServices from '../company/CompanyServices'
import { ICreateProductServices, IUpdateProductServices } from './ProductServicesDTO'
import TypeOfProductServices from '../typeOfProducts/TypeOfProductServices'

export default new class ProductServices {
  async listAllProduct (token: string) {
    const { id } = TokenOptions.verifyToken(token).msg
    const searchCompany = await CompanyData.searchId(id)

    if (searchCompany.length === 0) {
      return { err: 'company not found' }
    }

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

    return { msg: products }
  }

  async createProducts (token: string, data: ICreateProductServices) {
    const searchCompany = await CompanyServices.searchCompany(token)

    if (searchCompany.err) {
      return { err: searchCompany.err }
    }

    const id = searchCompany.msg
    const searchProduct = await ProductData.searchProductName(id, data.name)

    if (searchProduct.length !== 0) {
      return { err: 'product already create' }
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

    return { msg: product }
  }

  async updateProduct (token: string, data: IUpdateProductServices) {
    const searchCompany = await CompanyServices.searchCompany(token)

    if (searchCompany.err) {
      return { err: searchCompany.err }
    }

    const id = searchCompany.msg
    const searchProduct = await ProductData.searchProduct(data.idProduct, id)

    if (searchProduct.length === 0) {
      return { err: 'produt not exist' }
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

    return { msg: product }
  }

  async deleteProduct (token: string, idProduct: string) {
    const searchCompany = await CompanyServices.searchCompany(token)

    if (searchCompany.err) {
      return { err: searchCompany.err }
    }

    const id = searchCompany.msg
    const searchProduct = await ProductData.searchProduct(idProduct, id)

    if (searchProduct.length === 0) {
      return { err: 'produt not exist' }
    }

    await ProductData.deleteProduct(idProduct, id)

    return { msg: 'product delete' }
  }
}()
