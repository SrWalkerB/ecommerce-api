import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import CompanyData from '../../data/company/CompanyData'
import { ICreateCompanyServices } from './CompanyDTO'

class CompanyServices {
  async createCompany (data: ICreateCompanyServices) {
    const resultSearch = await this.verificationCompany(data.cnpj, data.email)

    if (resultSearch.err) {
      return { err: resultSearch.err }
    }

    await CompanyData.createCompany({
      id: uuidv4(),
      name: data.name,
      cpnj: data.cnpj,
      email: data.email,
      password: bcrypt.hashSync(data.password, 8)
    })

    return { msg: 'create' }
  }

  async verificationCompany (cnpj: number, email: string) {
    const verifyCnpj = await CompanyData.searchCnpj(cnpj)
    const verifyemail = await CompanyData.searchEmailCompany(email)

    if (cnpj.toString().length !== 11) {
      return { err: 'cnpj need have 11 digits' }
    }

    if (verifyCnpj.length !== 0) {
      return { err: 'cnpj already create' }
    }

    if (verifyemail.length !== 0) {
      return { err: 'email already create' }
    }

    return { msg: 'validate' }
  }
}

export default new CompanyServices()
