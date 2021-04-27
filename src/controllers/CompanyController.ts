import { Request, Response } from 'express'
import CompanyServices from '../services/company/CompanyServices'

export default new class CompanyController {
  async createCompany (req: Request, resp: Response) {
    try {
      const { name, cnpj, email, password } = req.body

      const create = await CompanyServices.createCompany({
        name,
        cnpj,
        email,
        password
      })

      return resp.status(201).json({ msg: create.msg })
    } catch (error) {
      console.log(error)
      return resp.status(500).json({ err: 'Err not expect' })
    }
  }
}()
