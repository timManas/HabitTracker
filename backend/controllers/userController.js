import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import Habit from '../models/habitModel.js'
import jwt from 'jsonwebtoken'

const verifyLogin = asyncHandler(async (req, res) => {
  console.log(req.body)
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

const createUserEntry = asyncHandler(async (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const { _id } = jwt.verify(token, process.env.JWT_SECRET)

  const title = String(req.body.title)
  const priority = Number(req.body.priority)
  const description = String(req.body.description)

  // Add new Entry inside Array
  await Habit.findOneAndUpdate(
    { user: _id },
    {
      $push: {
        habitsList: {
          title,
          priority,
          description,
        },
      },
    },
    { new: true }
  )

  const entry = await Habit.findOne({ user: _id })
  res.send(entry)
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
      $push: {
        habitsList: { title: updatedTitle, description: updatedDescription },
      },
    },
    {
      new: true,
    }
  )

  const entry = await Habit.findOne({ user: _id })

  res.send(entry)
})

const deleteEntry = asyncHandler(async (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const { _id } = jwt.verify(token, process.env.JWT_SECRET)

  const entryId = req.body.entryId
  console.log('entryId: ' + entryId)

  await Habit.findOneAndUpdate(
    {
      user: _id,
    },
    { $pull: { habitsList: { _id: entryId } } },
    { new: true }
  )

  const entry = await Habit.findOne({ user: _id })
  res.send(entry)
})

export {
  verifyLogin,
  createUserEntry,
  getUserEntry,
  updateUserEntry,
  deleteEntry,
}
