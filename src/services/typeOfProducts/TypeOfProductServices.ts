import CompanyData from '../../data/company/CompanyData'
import ProductData from '../../data/product/ProductData'
import TypeOfProductsData from '../../data/typeOfProducts/TypeOfProductsData'

export default new class TypeOfProductServices {
  async listAllTypeProducts () {
    const types = await TypeOfProductsData.listAllTypeOfProducts()

    if (types.length === 0) {
      return { err: 'types not found' }
    }

    return { message: types }
  }

  async searchProductByType (type: string) {
    const searchType = await TypeOfProductsData.searchTypeName(type.toLowerCase())
    const products = []

    if (searchType.length === 0) {
      return { message: 'type not found' }
    }

    const [{ id_type: idType, name }] = searchType
    const listAllProducts = await ProductData.listAllTypeProduct(idType)

    for (let x = 0; x < listAllProducts.length; x++) {
      const [{ name: nameCompany }] = await CompanyData.searchId(listAllProducts[x].id_company)

      products.push({
        id_product: listAllProducts[x].id_product,
        name: listAllProducts[x].name,
        company: nameCompany,
        description: listAllProducts[x].description,
        price: listAllProducts[x].price,
        type: name,
        stock: listAllProducts[x].stock,
        image: listAllProducts[x].image
      })
    }

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
