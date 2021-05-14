import { Request, Response } from 'express'
import ProductServices from '../services/products/ProductServices'
import TypeOfProductServices from '../services/typeOfProducts/TypeOfProductServices'
import TokenOptions from '../utils/TokenOptions'

export default new class ProductControllers {
  async listAllProduct (req: Request, resp: Response) {
    try {
      const token = TokenOptions.removeBearer(req)
      const list = await ProductServices.listAllProduct(token!)

      return resp.status(200).json(list.message)
    } catch (error) {
      console.log(error)
      return resp.status(500).json({ message: 'err not expect' })
    }
  }

  async listAllTypeOfProduct (req: Request, resp: Response) {
    try {
      const types = await TypeOfProductServices.listAllTypeProducts()

      if (types.message === 'types not found') {
        return resp.status(404).json({ message: types.message })
      }

      return resp.status(200).json(types.message)
    } catch (error) {
      console.log(error)
      return resp.status(500).json({ message: 'err not expect' })
    }
  }

  async searchProductsByTypes (req: Request, resp: Response) {
    try {
      const { type } = req.params
      const allProducts = await TypeOfProductServices.searchProductByType(type)

      if (allProducts.message !== 'sucess') {
        return resp.status(404).json({ message: allProducts.message })
      }

      return resp.status(200).json(allProducts)
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

      if (create.message === 'product already create') {
        return resp.status(404).json({ message: create.message })
      }

      if (create.message !== 'success') {
        return resp.status(404).json({ message: create.message })
      }

      return resp.status(201).json(create)
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

      if (update.message !== 'success') {
        return resp.status(404).json({ message: update.message })
      }

      return resp.status(200).json(update)
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

      if (del.message !== 'success') {
        return resp.status(404).json({ message: del.message })
      }

      return resp.status(200).json({ message: del.message })
    } catch (error) {
      console.log(error)
      return resp.status(500).json({ message: 'err not expect' })
    }
  }
}()
