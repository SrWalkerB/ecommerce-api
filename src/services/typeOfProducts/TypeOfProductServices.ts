import TypeOfProductsData from '../../data/typeOfProducts/TypeOfProductsData'

export default new class TypeOfProductServices {
  async listAllTypeProducts () {
    return TypeOfProductsData.listAllTypeOfProducts()
  }

  async searchTypeID (id: string) {
    const searchType = await TypeOfProductsData.searchTypeID(id)

    if (searchType.length === 0) {
      return { err: 'type not found' }
    }

    return searchType
  }

  async searchTypeName (name: string) {
    const searchType = await TypeOfProductsData.searchTypeID(name)

    if (searchType.length === 0) {
      return { err: 'type not found' }
    }

    return searchType
  }
}()
