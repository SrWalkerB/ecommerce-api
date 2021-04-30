import { Request, Response } from 'express'
import UserServices from '../services/users/UserServices'
import TokenOptions from '../utils/TokenOptions'

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
      const token = TokenOptions.removeBearer(req)
      const profile = await UserServices.myProfile(token!)

      if (profile.err) {
        return resp.status(404).json({ err: profile.err })
      }

      return resp.status(200).json(profile.msg)
    } catch (error) {
      console.log(error)
      return resp.status(500).json({ err: 'err not expect' })
    }
  }

  async createAddress (req: Request, resp: Response) {
    try {
      const token = TokenOptions.removeBearer(req)
      const { cep, street, neighborhood, number, city, state, coutry } = req.body

      const address = await UserServices.createAddress(token!, {
        cep,
        street,
        neighborhood,
        number,
        city,
        state,
        coutry
      })

      if (address.err) {
        return resp.status(400).json({ err: address.err })
      }

      return resp.status(201).json(address)
    } catch (error) {
      console.log(error)
      return resp.status(500).json({ err: 'err not expect' })
    }
  }

  async deleteUser (req: Request, resp: Response) {
    try {
      const token = TokenOptions.removeBearer(req)

      const del = await UserServices.deleteUser(token!)

      if (del.err) {
        return resp.status(404).json({ err: del.err })
      }

      return resp.status(200).json({ msg: del.msg })
    } catch (error) {
      console.log(error)
      return resp.status(500).json({ err: 'error not expect' })
    }
  }
}()
