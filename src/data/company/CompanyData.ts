import dbActions from '../../database/connect'
import { ICreateCompanyData } from './CompanyDTO'

export default new class CompanyData {
  createCompany (data: ICreateCompanyData) {
    return dbActions('company')
      .insert({
        id_company: data.id,
        name: data.name,
        cnpj: data.cpnj
      })
  }

  searchCnpj (cnpj: number) {
    return dbActions('company')
      .where('cnpj', cnpj)
  }

  searchId (id: string) {
    return dbActions('company')
      .where('id_company', id)
  }
}()
