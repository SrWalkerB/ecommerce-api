import { Request, Response } from 'express'
import CompanyServices from '../services/company/CompanyServices'
import PurchaseServices from '../services/purchases/PurchaseServices'
import TokenOptions from '../utils/TokenOptions'

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

      if (create.message !== 'success') {
        return resp.status(400).json({ message: create.message })
      }

      return resp.status(201).json(create)
    } catch (error) {
      console.log(error)
      return resp.status(500).json({ message: 'Err not expect' })
    }
  }

  async listMySalesPending (req: Request, resp: Response) {
    const token = TokenOptions.removeBearer(req)
    const sales = await PurchaseServices.listSalesPendingCompany(token!)

    if (sales.message !== 'success') {
      return resp.status(404).json({ message: sales.message })
    }

    return resp.status(200).json(sales)
  }
}()
