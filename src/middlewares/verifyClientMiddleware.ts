import { Request, Response, NextFunction } from 'express'
import ClientData from '../data/client/ClientData'
import TokenOptions from '../utils/TokenOptions'

const verifyClient = async (req: Request, resp: Response, next: NextFunction) => {
  const token = TokenOptions.removeBearer(req)
  const { id } = TokenOptions.verifyToken(token!).msg
  const searchID = await ClientData.searchId(id)

  if (searchID.length === 0) {
    return resp.status(404).json({ message: 'user not found' })
  }

  next()
}

export {
  verifyClient
}
