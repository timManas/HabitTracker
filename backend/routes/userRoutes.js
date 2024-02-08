import express from 'express'
import {
  getUserInfo,
  verifyLogin,
  getProtectedPage,
} from '../controllers/userController.js'
import {
  verifyToken,
  verifyUsingPassport,
} from '../middleware/authMiddleware.js'
import passport from 'passport'

const userRouter = express.Router()

userRouter.post('/login', verifyLogin)
userRouter.get('/info', verifyToken, getUserInfo)
// userRouter.get('/protected', verifyUsingPassport, getProtectedPage) // Dont do this
userRouter.get(
  '/protected',
  passport.authenticate('jwt', { session: false }),
  getProtectedPage
)

export default userRouter
