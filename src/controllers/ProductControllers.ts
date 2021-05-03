import { Request, Response } from 'express'
import ProductServices from '../services/products/ProductServices'
import TokenOptions from '../utils/TokenOptions'

export default new class ProductControllers {
  async listAllProduct (req: Request, resp: Response) {
    try {
      const token = TokenOptions.removeBearer(req)
      const list = await ProductServices.listAllProduct(token!)

      if (list.err) {
        return resp.status(404).json({ message: list.err })
      }

      return resp.status(200).json(list.msg)
    } catch (error) {
      console.log(error)
      return resp.status(500).json({ message: 'err not espect' })
    }
  }

  async createProduct (req: Request, resp: Response) {
    try {
      const token = TokenOptions.removeBearer(req)
      const {
        name,
        description,
        price,
        type,
        stock,
        image
      } = req.body

      const create = await ProductServices.createProducts(token!, {
        name,
        description,
        price,
        type,
        stock,
        image
      })

      if (create.err === 'product already create') {
        return resp.status(404).json({ message: create.err })
      }

      if (create.err) {
        return resp.status(404).json({ message: create.err })
      }

      return resp.status(201).json(create.msg)
    } catch (error) {
      console.log(error)
      return resp.status(500).json({ message: 'err not espect' })
    }
  }
}()
