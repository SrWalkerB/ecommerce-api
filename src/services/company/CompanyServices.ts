import { ICreateCompanyServices } from './CompanyDTO'

class CompanyServices {
  async createCompany (data: ICreateCompanyServices) {
    return { msg: 'Create' }
  }
}

export default new CompanyServices()
