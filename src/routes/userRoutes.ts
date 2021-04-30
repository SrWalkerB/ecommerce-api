import { Router } from 'express'
import UserControllers from '../controllers/UserControllers'
import autenticate from '../middlewares/autenticate'

const userRoutes = Router()

userRoutes.post('/auth', UserControllers.loginAccount)

userRoutes.get('/profile', autenticate.autenticate, UserControllers.myProfile)

userRoutes.post('/profile/address', autenticate.autenticate, UserControllers.createAddress)

userRoutes.delete('/profile', autenticate.autenticate, UserControllers.deleteUser)

export default userRoutes
