import { v4 as uuidv4 } from 'uuid'
import crypto from 'crypto'
import CompanyData from '../../data/company/CompanyData'
import { ICreateCompanyServices } from './CompanyDTO'
import UserServices from '../users/UserServices'
import TokenOptions from '../../utils/TokenOptions'

class CompanyServices {
  async createCompany (data: ICreateCompanyServices) {
    const resultSearch = await this.verificationCompany(data.cnpj, data.email)

    if (resultSearch.err) {
      return { err: resultSearch.err }
    }

    const id = `${uuidv4()}-${crypto.randomBytes(16).toString('hex')}`

    const createUser = await UserServices.createUser({
      id: id,
      type: 'pj',
      email: data.email,
      password: data.password
    })

    if (createUser?.err) {
      return { err: createUser.err }
    }

    await CompanyData.createCompany({
      id: id,
      name: data.name,
      cpnj: data.cnpj
    })

    return { msg: 'create' }
  }

  async verificationCompany (cnpj: number, email: string) {
    const verifyCnpj = await CompanyData.searchCnpj(cnpj)

    if (cnpj.toString().length !== 11) {
      return { err: 'cnpj need have 11 digits' }
    }

    if (verifyCnpj.length !== 0) {
      return { err: 'cnpj already create' }
    }

    return { msg: 'validate' }
  }

  async searchCompany (token: string) {
    const { id } = TokenOptions.verifyToken(token).msg
    const searchCompany = await CompanyData.searchId(id)

    if (searchCompany.length === 0) {
      return { err: 'company not found' }
    }

    return { msg: id }
  }
}

export default new CompanyServices()
