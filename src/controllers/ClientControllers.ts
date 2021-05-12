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

  async myListFavoritesProduct (req: Request, resp: Response) {
    try {
      const token = TokenOptions.removeBearer(req)
      const products = await ClientServices.listFavoritesProduct(token!)

      if (products.message !== 'sucess') {
        return resp.status(404).json({ message: products.message })
      }

      return resp.status(200).json(products)
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

      if (favorite.message === 'product already favorite') {
        return resp.status(400).json({ message: favorite.message })
      }

      if (favorite.message !== 'sucesso') {
        return resp.status(404).json({ message: favorite.message })
      }

      return resp.status(201).json(favorite)
    } catch (error) {
      console.log(error)
      return resp.status(500).json({ message: 'err not expect' })
    }
  }

  async deleteFavoriteProduct (req: Request, resp: Response) {
    try {
      const token = TokenOptions.removeBearer(req)
      const { idProduct } = req.params

      const del = await ClientServices.RemoveFavoriteProduct(token!, idProduct)

      if (del.message !== 'sucess') {
        return resp.status(404).json({ message: del.message })
      }

      return resp.status(200).json({ message: del.message })
    } catch (error) {
      console.log(error)
      return resp.status(500).json({ message: 'err not expect' })
    }
  }
}()
