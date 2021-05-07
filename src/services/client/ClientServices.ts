import { v4 as uuidv4 } from 'uuid'
import crypto from 'crypto'
import UserServices from '../users/UserServices'
import { ICreateClientServices } from './ClientServicesDTO'
import ClientData from '../../data/client/ClientData'
import TokenOptions from '../../utils/TokenOptions'
import UserData from '../../data/users/UserData'
import ProductData from '../../data/product/ProductData'
import FavoritesProductsData from '../../data/favoritesProducts/FavoritesProductsData'

export default new class ClientServices {
  async createUsers (data: ICreateClientServices) {
    const validateClient = await this.ValidateClient(data)

    if (validateClient.message) {
      return { message: validateClient.message }
    }

    const client = {
      id: `${uuidv4()}-${crypto.randomBytes(16).toString('hex')}`,
      cpf: data.cpf,
      email: data.email,
      lastName: data.lastName,
      password: data.password
    }

    await UserServices.createUser({
      id: client.id,
      email: client.email,
      password: client.password,
      type: 'client'
    })

    await ClientData.createClient({
      idClient: client.id,
      cpf: data.cpf,
      name: data.name,
      lastName: data.lastName
    })

    return { message: 'sucesso', body: client }
  }

  async favoriteProduct (token: string, idProduct: string) {
    const { id } = TokenOptions.verifyToken(token).msg
    const searchUser = await UserData.searchId(id)
    const searchProduct = await ProductData.searchProductID(idProduct)
    const searchFavoriteProductClient = await FavoritesProductsData.searchFavoriteProductClient(id, idProduct)

    if (searchUser.length === 0) {
      return { message: 'user not found' }
    }

    if (searchProduct.length === 0) {
      return { message: 'product not found' }
    }

    if (searchFavoriteProductClient.length !== 0) {
      return { message: 'product already favorite' }
    }

    const [{ id_company: idCompany }] = searchProduct

    const product = {
      idClient: id,
      idProduct: idProduct,
      idCompany: idCompany
    }

    await FavoritesProductsData.createFavoritesProducts({
      idClient: product.idClient,
      idCompany: product.idCompany,
      idProduct: product.idProduct
    })

    return { message: 'sucesso', body: [product] }
  }

  async RemoveFavoriteProduct (token: string, idProduct: string) {
    const { id } = TokenOptions.verifyToken(token).msg
    const searchClient = await ClientData.searchId(id)
    const searchProduct = await ProductData.searchProductID(idProduct)
    const searchFavoriteProduct = await FavoritesProductsData.searchFavoriteProductClient(id, idProduct)

    if (searchClient.length === 0) {
      return { message: 'client not found' }
    }

    if (searchProduct.length === 0) {
      return { message: 'product not found' }
    }

    if (searchFavoriteProduct.length === 0) {
      return { message: 'favorite product not create' }
    }

    const [{ id_company: idCompany }] = searchProduct

    await FavoritesProductsData.removeFavoritesProducts({
      idClient: id,
      idProduct: idProduct,
      idCompany: idCompany
    })

    return { message: 'sucesso' }
  }

  private async SearchCpf (cpf: number) {
    const searchCpf = await ClientData.searchCpf(cpf)

    if (searchCpf.length !== 0) {
      return { message: 'cpf already used' }
    }

    return { message: '' }
  }

  private async ValidateClient (data: ICreateClientServices) {
    const searchMail = await UserServices.verificationUser(data.email, data.password)
    const searchCpf = await this.SearchCpf(data.cpf)

    if (data.cpf.toString().length !== 11) {
      return { message: 'cpf invalid' }
    }

    if (data.name.length < 2) {
      return { message: 'name need have 2 caracters' }
    }

    if (data.lastName.length < 3) {
      return { message: 'lastName need have 3 caracters' }
    }

    if (!data.email.includes('@') || data.email.length < 6) {
      return { message: 'email invalid' }
    }

    if (searchMail.err) {
      return { message: searchMail.err }
    }

    if (searchCpf.message) {
      return { message: searchCpf.message }
    }

    return { message: '' }
  }
}()
