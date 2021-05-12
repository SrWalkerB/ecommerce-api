import { Request, Response, NextFunction } from 'express'
import TokenOptions from '../utils/TokenOptions'

export default {
  autenticate: (req: Request, resp: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '')

    if (!token) {
      return resp.status(403).send()
    }

    const verifyToken = TokenOptions.verifyToken(token)

    if (verifyToken.err) {
      return resp.status(403).send()
    }

    next()
  }
}
