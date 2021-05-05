import { Request, Response } from 'express'
import ClientServices from '../services/client/ClientServices'

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
}()
