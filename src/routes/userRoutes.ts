import { Router } from 'express'
import UserControllers from '../controllers/UserControllers'

const userRoutes = Router()

userRoutes.post('/auth', UserControllers.loginAccount)

export default userRoutes
