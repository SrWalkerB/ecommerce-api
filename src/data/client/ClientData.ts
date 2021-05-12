import dbActions from '../../database/connect'
import { ICreateClientData } from './ClientDataDTO'

export default new class ClientData {
  createClient (data: ICreateClientData) {
    return dbActions('client')
      .insert({
        id_client: data.idClient,
        name: data.name,
        lastName: data.lastName,
        cpf: data.cpf
      })
  }

  searchCpf (cpf: number) {
    return dbActions('client')
      .where('cpf', cpf)
  }

  searchId (id: string) {
    return dbActions('client')
      .where('id_client', id)
  }
}()
