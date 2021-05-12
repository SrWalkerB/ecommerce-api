import dbActions from '../../database/connect'

export default new class TypeOfProducts {
  async listAllTypeOfProducts () {
    return await dbActions('type_of_products')
  }

  async searchTypeID (id: string) {
    return await dbActions('type_of_products')
      .where('id_type', id)
  }

  async searchTypeName (name: string) {
    return await dbActions('type_of_products')
      .where('name', name)
  }
}()
