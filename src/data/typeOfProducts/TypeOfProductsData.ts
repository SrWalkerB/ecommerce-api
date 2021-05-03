import dbActions from '../../database/connect'

export default new class TypeOfProducts {
  async listAllTypeOfProducts () {
    return await dbActions('typeOfProducts')
  }

  async searchTypeID (id: string) {
    return await dbActions('typeOfProducts')
      .where('id_typeProduct', id)
  }

  async searchTypeName (name: string) {
    return await dbActions('typeOfProducts')
      .where('id_typeProduct', name)
  }
}()
