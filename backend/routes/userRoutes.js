import express from 'express'
import { getUserInfo, verifyLogin } from '../controllers/userController.js'
import verifyToken from '../middleware/authMiddleware.js'

const userRouter = express.Router()

userRouter.post('/login', verifyLogin)
userRouter.get('/info', verifyToken, getUserInfo)

export default userRouter
