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
      return resp.status(500).json({ err: 'err not espect' })
    }
  }
}()
