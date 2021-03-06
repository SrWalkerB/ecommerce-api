import bcrypt from 'bcrypt'
import AddressData from '../../data/address/AddressData'
import ClientData from '../../data/client/ClientData'
import CompanyData from '../../data/company/CompanyData'
import UserData from '../../data/users/UserData'
import { ICreateUserData } from '../../data/users/UserDataDTO'
import TokenOptions from '../../utils/TokenOptions'
import { ICreateAddressServices } from './UserDTO'

export default new class UserServices {
  async createUser (data: ICreateUserData) {
    const validate = await this.verificationUser(data.email, data.password)

    if (validate.err) {
      return { err: validate.err }
    }

    await UserData.createUser({
      id: data.id,
      email: data.email,
      password: bcrypt.hashSync(data.password, 8),
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
      return { message: 'account not found' }
    }

    const [{ id_user: idUser, password: passwordHash }] = searchMail!

    const verify = bcrypt.compareSync(password, passwordHash)

    if (!verify) {
      return { message: 'accout not found' }
    }

    const token = TokenOptions.createToken(idUser)

    return { message: token }
  }

  async myProfile (token: string) {
    const { id } = TokenOptions.verifyToken(token).msg
    const searchUser = await UserData.searchId(id)

    if (searchUser.length === 0) {
      return { message: 'user not found' }
    }

    const [{ id_user: idUser, email, type }] = searchUser

    let user = {}

    switch (type) {
      case 'pj': {
        const [{ name, cnpj }] = await CompanyData.searchId(idUser)
        const searchAddress = await AddressData.searchAddress(idUser)
        let address: any = '0'

        if (searchAddress.length === 0) {
          address = 'not informed'
        }

        if (searchAddress.length !== 0) {
          const [{ cep, street, neighborhood, number, city, state, coutry }] = searchAddress

          address = {
            cep: cep,
            street: street,
            neighborhood: neighborhood,
            number: number,
            city: city,
            state: state,
            coutry: coutry
          }
        }

        user = {
          id_user: idUser,
          name: name,
          cnpj: cnpj,
          email: email,
          type: type,
          address: address
        }
        break
      }

      case 'client': {
        const [{ name, lastName, cpf }] = await ClientData.searchId(idUser)
        const searchAddress = await AddressData.searchAddress(idUser)
        let address: any = '0'

        if (searchAddress.length === 0) {
          address = 'not informed'
        }

        if (searchAddress.length !== 0) {
          const [{ cep, street, neighborhood, number, city, state, coutry }] = searchAddress

          address = {
            cep: cep,
            street: street,
            neighborhood: neighborhood,
            number: number,
            city: city,
            state: state,
            coutry: coutry
          }
        }

        user = {
          id: idUser,
          name: name,
          lastName: lastName,
          cpf: cpf,
          email: email,
          type: type,
          address: address
        }
        break
      }
    }

    return { message: 'success', body: [user] }
  }

  async createAddress (token: string, data: ICreateAddressServices) {
    const { id } = TokenOptions.verifyToken(token).msg
    const searchAddress = await AddressData.searchAddress(id)

    if (searchAddress.length !== 0) {
      return { message: 'address already create' }
    }

    const address = {
      id: id,
      cep: data.cep,
      street: data.street,
      number: data.number,
      neighborhood: data.neighborhood,
      city: data.city,
      state: data.state,
      coutry: data.coutry
    }

    await AddressData.createAddress({
      id: address.id,
      cep: address.cep,
      street: address.street,
      number: address.number,
      neighborhood: address.neighborhood,
      city: address.city,
      state: address.state,
      coutry: address.coutry
    })

    return { message: 'success', body: [address] }
  }

  async deleteUser (token: string) {
    const { id } = TokenOptions.verifyToken(token).msg
    const searchUser = await UserData.searchId(id)

    if (searchUser.length === 0) {
      return { message: 'user not found' }
    }

    await UserData.deleteUserId(id)

    return { message: 'success' }
  }
}()
