import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import Habit from '../models/habitModel.js'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

const verifyLogin = asyncHandler(async (req, res) => {
  //   console.log(req.body)
  // Fetch user and email from request
  const emailEntered = String(req.body.email)
  const passwordEntered = String(req.body.password)

  // Check if email/password exist
  const { email, password, name, _id } = await User.findOne({
    email: emailEntered,
  })
  console.log(`email: ${email}  name: ${name}`)

  // If passwords match ... then create JWT Token
  if (String(passwordEntered) === String(password)) {
    console.log('password same')

    const token = jwt.sign(
      { _id, email, name, sub: 'test1234' },
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
  // res.send('ProtectedPage')
})

const getUserEntry = asyncHandler(async (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const { _id } = jwt.verify(token, process.env.JWT_SECRET)
  const { habitsList } = await Habit.findOne({ user: _id })
  res.send(habitsList)
})

const updateUserEntry = asyncHandler(async (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const { _id } = jwt.verify(token, process.env.JWT_SECRET)

  // Fetch the updated Habit info from the request
  const entryId = String(req.body.entryId)
  const updatedTitle = String(req.body.updatedTitle)
  const updatedDescription = String(req.body.updatedDescription)

  // Find array and modify the object inside the array
  await Habit.findOneAndUpdate(
    { user: _id, 'habitsList._id': entryId },
    {
      'habitsList.$.title': updatedTitle,
      'habitsList.$.description': updatedDescription,
    },
    {
      new: true,
    }
  )

  const entry = await Habit.findOne({ user: _id })

  res.send(entry)
})

const createUserEntry = asyncHandler(async (req, res) => {})

const deleteEntry = asyncHandler(async (req, res) => {
  res.send('deleteEntry')
})

export {
  getUserInfo,
  verifyLogin,
  getProtectedPage,
  createUserEntry,
  getUserEntry,
  updateUserEntry,
  deleteEntry,
}
