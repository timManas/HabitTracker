import express from 'express'
import { getUserInfo, verifyLogin } from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.get('/login', verifyLogin)
userRouter.get('/info', getUserInfo)

export default userRouter
