import express from 'express'
import {
  verifyLogin,
  createUserEntry,
  getUserEntry,
  updateUserEntry,
  deleteEntry,
} from '../controllers/userController.js'
import {
  verifyToken,
  verifyUsingPassport,
} from '../middleware/authMiddleware.js'
import passport from 'passport'

const userRouter = express.Router()

// Validate login and issue JWT Token
userRouter.post('/login', verifyLogin)

// Crud Operations

userRouter.post(
  '/entry',
  passport.authenticate('jwt', { session: false }),
  createUserEntry
)

userRouter.get(
  '/entry',
  passport.authenticate('jwt', { session: false }),
  getUserEntry
)

userRouter.put(
  '/entry',
  passport.authenticate('jwt', { session: false }),
  updateUserEntry
)

userRouter.delete(
  '/entry',
  passport.authenticate('jwt', { session: false }),
  deleteEntry
)

export default userRouter
