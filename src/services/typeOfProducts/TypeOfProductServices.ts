import TypeOfProductsData from '../../data/typeOfProducts/TypeOfProductsData'

export default new class TypeOfProductServices {
  async listAllTypeProducts () {
    const types = await TypeOfProductsData.listAllTypeOfProducts()

    if (types.length === 0) {
      return { err: 'types not found' }
    }

    return { message: types }
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
