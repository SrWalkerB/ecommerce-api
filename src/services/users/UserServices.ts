import bcrypt from 'bcrypt'
import CompanyData from '../../data/company/CompanyData'
import UserData from '../../data/users/UserData'
import { ICreateUserData } from '../../data/users/UserDataDTO'
import TokenOptions from '../../utils/TokenOptions'

export default new class UserServices {
  async createUser (data: ICreateUserData) {
    const validate = await this.verificationUser(data.email, data.password)

    if (validate.err) {
      return { err: validate.err }
    }

    await UserData.createUser({
      id: data.id,
      email: data.email,
      password: data.password,
      type: data.type
    })
  }

  async verificationUser (email: string, password: string) {
    const verifyEmail = await UserData.searchEmail(email)

    if (password.length <= 7) {
      return { err: 'password need have 8 caracters' }
    }

    if (verifyEmail.length !== 0) {
      return { err: 'email already create' }
    }

    return { msg: 'validate' }
  }

  async loginUser (email: string, password: string) {
    const searchMail = await UserData.searchEmail(email)

    if (searchMail.length === 0) {
      return { err: 'account not found' }
    }

    const [{ id_user: idUser, password: passwordHash }] = searchMail!

    const verify = bcrypt.compareSync(password, passwordHash)

    if (!verify) {
      return { err: 'accout not found' }
    }

    const token = TokenOptions.createToken(idUser)

    return { token: token }
  }

  async myProfile (token: string) {
    const { id } = TokenOptions.verifyToken(token).msg
    const searchUser = await UserData.searchId(id)

    const [{ id_user: idUser, email, type }] = searchUser

    let user = {}

    switch (type) {
      case 'pj': {
        const [{ name, cnpj }] = await CompanyData.searchId(idUser)
        user = {
          id_user: idUser,
          name: name,
          cnpj: cnpj,
          email: email,
          type: type
        }
        break
      }

      case 'client': {
        user = {
          id: idUser,
          email: email,
          type: type
        }
      }
    }

    return { msg: user }
  }
}()
