import dbActions from '../../database/connect'
import { ICreateCompanyData } from './CompanyDTO'

export default new class CompanyData {
  createCompany (data: ICreateCompanyData) {
    return dbActions('company')
      .insert({
        id: data.id,
        name: data.name,
        cnpj: data.cpnj,
        email: data.email,
        password: data.password
      })
  }

  searchCnpj (cnpj: number) {
    return dbActions('company')
      .where('cnpj', cnpj)
  }

  searchEmailCompany (email: string) {
    return dbActions('company')
      .where('email', email)
  }
}()
