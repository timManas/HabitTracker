import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'

const verifyLogin = asyncHandler(async (req, res) => {
  //   console.log(req.body)
  // Fetch user and email from request
  const emailEntered = String(req.body.email)
  const passwordEntered = String(req.body.password)

  // Check if email/password exist
  const { email, password, name } = await User.findOne({ email: emailEntered })
  console.log(`email: ${email}  name: ${name}`)

  // If passwords match ... then create JWT Token
  if (String(passwordEntered) === String(password)) {
    console.log('password same')

    const token = jwt.sign(
      { email, name, sub: 'test1234' },
      process.env.JWT_SECRET
    )
    console.log('token: ' + token)
    res.send(token)
    return
  }

  // return token
  res.sendStatus(500)
})

const getUserInfo = asyncHandler((req, res) => {
  res.send('User Info')
})

const getProtectedPage = asyncHandler((req, res) => {
  res.send('ProtectedPage')
})

export { getUserInfo, verifyLogin, getProtectedPage }
