import { Request, Response } from 'express'
import ClientServices from '../services/client/ClientServices'
import TokenOptions from '../utils/TokenOptions'

export default new class ClientControllers {
  async createClient (req: Request, resp: Response) {
    try {
      const { name, lastName, cpf, email, password } = req.body

      const create = await ClientServices.createUsers({
        name,
        lastName,
        cpf,
        email,
        password
      })

      if (create.message !== 'sucesso') {
        return resp.status(400).json({ message: create.message })
      }

      return resp.status(201).json(create)
    } catch (error) {
      console.log(error)
      return resp.status(500).json({ message: 'err not expect' })
    }
  }

  async favoriteProduct (req: Request, resp: Response) {
    try {
      const token = TokenOptions.removeBearer(req)
      const { idProduct } = req.params
      const favorite = await ClientServices.favoriteProduct(token!, idProduct)

      return resp.status(200).json(favorite)
    } catch (error) {
      console.log(error)
      return resp.status(500).json({ message: 'err not expect' })
    }
  }
}()
