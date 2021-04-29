import { Request } from 'express'
import jwt from 'jsonwebtoken'

export default new class TokenOptions {
  createToken (data: string) {
    return jwt.sign({ id: data }, process.env.TOKEN_KEY!, { expiresIn: '2h' })
  }

  verifyToken (token: string): any {
    return jwt.verify(token, process.env.TOKEN_KEY!, (err, decoded) => {
      if (err) {
        return { err: 'invalid token' }
      }

      return { msg: decoded }
    })
  }

  removeBearer (req: Request) {
    return req.header('Authorization')?.replace('Bearer ', '')
  }
}()
