import { Request, Response } from 'express'
import ProductServices from '../services/products/ProductServices'
import TypeOfProductServices from '../services/typeOfProducts/TypeOfProductServices'
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
      return resp.status(500).json({ message: 'err not expect' })
    }
  }

  async listAllTypeOfProduct (req: Request, resp: Response) {
    try {
      const types = await TypeOfProductServices.listAllTypeProducts()

      if (types.err) {
        return resp.status(404).json({ message: types.err })
      }

      return resp.status(200).json(types.message)
    } catch (error) {
      console.log(error)
      return resp.status(500).json({ message: 'err not expect' })
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
      return resp.status(500).json({ message: 'err not expect' })
    }
  }

  async updateProduct (req: Request, resp: Response) {
    try {
      const token = TokenOptions.removeBearer(req)
      const { idProduct } = req.params
      const {
        name,
        description,
        price,
        type,
        stock,
        image
      } = req.body

      const update = await ProductServices.updateProduct(token!, {
        idProduct,
        name,
        description,
        price,
        type,
        stock,
        image
      })

      if (update.err) {
        return resp.status(404).json({ message: update.err })
      }

      return resp.status(200).json(update.msg)
    } catch (error) {
      console.log(error)
      return resp.status(500).json({ message: 'err not expect' })
    }
  }

  async deleteProduct (req: Request, resp: Response) {
    try {
      const { idProduct } = req.params
      const token = TokenOptions.removeBearer(req)
      const del = await ProductServices.deleteProduct(token!, idProduct)

      if (del.err) {
        return resp.status(404).json({ message: del.err })
      }

      return resp.status(200).json({ message: del.msg })
    } catch (error) {
      console.log(error)
      return resp.status(500).json({ message: 'err not expect' })
    }
  }
}()
