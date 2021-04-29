import dbActions from '../../database/connect'
import { ICreateAddressData } from './AddressDTO'

export default new class AddressData {
  async createAddress (data: ICreateAddressData) {
    return await dbActions('address')
      .insert({
        id: data.id,
        cep: data.cep,
        street: data.street,
        neighborhood: data.neighborhood,
        number: data.number,
        city: data.city,
        state: data.state,
        coutry: data.coutry
      })
  }

  async searchAddress (id: string) {
    return await dbActions('address')
      .where('id', id)
  }
}()
