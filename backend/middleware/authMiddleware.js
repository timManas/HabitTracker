import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'

const verifyToken = (req, res, next) => {
  // Fetch token
  const token = req.headers.authorization.split(' ')[1]
  console.log('token: ' + token)
  // Validate token
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET)
    console.log(data)
    next()
  } catch (err) {
    console.log('Error: ' + err)
    res.sendStatus(500)
  }
}

export default verifyToken
