import { Request, Response } from 'express'
import UserServices from '../services/users/UserServices'

export default new class UserControllers {
  async loginAccount (req: Request, resp: Response) {
    try {
      const { email, password } = req.body

      const login = await UserServices.loginUser(email, password)

      if (login.err) {
        return resp.status(404).json({ err: login.err })
      }

      return resp.status(200).json({ token: login.token })
    } catch (error) {
      console.log(error)
      return resp.status(500).json({ err: 'err not expect' })
    }
  }

  async myProfile (req: Request, resp: Response) {
    try {
      const token = req.header('Authorization')

      const profile = await UserServices.myProfile(token!)

      return resp.status(200).json(profile.msg)
    } catch (error) {
      console.log(error)
      return resp.status(500).json({ err: 'err not expect' })
    }
  }
}()
