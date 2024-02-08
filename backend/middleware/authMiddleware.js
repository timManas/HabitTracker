import passport from 'passport'
import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'

const verifyToken = (req, res, next) => {
  // Fetch token
  const token = req.headers.authorization.split(' ')[1]
  console.log('token: ' + token)
  // Validate token
  try {
    // Do you see the issue here ?
    // Verify only decodes the token ...YOU STILL NEED TO ENSURE THE data in the token is VALID
    // WHICH WE DID NOT DO ...
    const data = jwt.verify(token, process.env.JWT_SECRET)
    console.log(data)
    next()
  } catch (err) {
    console.log('Error: ' + err)
    res.sendStatus(500)
  }
}

const verifyUsingPassport = (req, res, next) => {
  try {
    passport.authenticate('jwt', { session: false })
    next()
  } catch (error) {
    res.sendStatus(500)
  }
}

export { verifyToken, verifyUsingPassport }
