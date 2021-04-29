import { Router } from 'express'
import UserControllers from '../controllers/UserControllers'
import autenticate from '../middlewares/autenticate'

const userRoutes = Router()

userRoutes.post('/auth', UserControllers.loginAccount)

userRoutes.get('/profile', autenticate.autenticate, UserControllers.myProfile)

export default userRoutes
