import ProductData from '../../data/product/ProductData'
import TypeOfProductsData from '../../data/typeOfProducts/TypeOfProductsData'
import TokenOptions from '../../utils/TokenOptions'

export default new class TypeOfProductServices {
  async listAllTypeProducts () {
    const types = await TypeOfProductsData.listAllTypeOfProducts()

    if (types.length === 0) {
      return { err: 'types not found' }
    }

    return { message: types }
  }

  async searchProductByType (token: string, type: string) {
    const { id } = TokenOptions.verifyToken(token).msg
    const searchType = await TypeOfProductsData.searchTypeName(type)

    if (searchType.length === 0) {
      return { message: 'type not found' }
    }

    const [{ id_type: idType, name }] = searchType
    const listAllProducts = await ProductData.listAllTypeProduct(id, idType)

    const products = listAllProducts.map(result => {
      return {
        id_product: result.id_product,
        name: result.name,
        description: result.description,
        price: result.price,
        type: name,
        stock: result.stock,
        image: result.image
      }
    })

    return { message: 'sucess', body: products }
  }

  async searchTypeID (id: string) {
    const searchType = await TypeOfProductsData.searchTypeID(id)

    if (searchType.length === 0) {
      return { err: 'type not found' }
    }

    return { message: searchType }
  }

  async searchTypeName (name: string) {
    const searchType = await TypeOfProductsData.searchTypeID(name)

    if (searchType.length === 0) {
      return { err: 'type not found' }
    }

    return { message: searchType }
  }
}()
