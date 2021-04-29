import dbActions from '../../database/connect'
import { ICreateUserData } from './UserDataDTO'

export default new class UserData {
  createUser (data: ICreateUserData) {
    return dbActions('users')
      .insert({
        id_user: data.id,
        email: data.email,
        password: data.password,
        type: data.type
      })
  }

  searchEmail (email: string) {
    return dbActions('users')
      .where('email', email)
  }

  searchId (id: string) {
    return dbActions('users')
      .where('id_user', id)
  }
}()
