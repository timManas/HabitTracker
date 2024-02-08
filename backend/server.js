import express, { json } from 'express'
import dotenv from 'dotenv'
dotenv.config({ path: '../.env' })
import productRouter from './routes/productRoutes.js'
import userRouter from './routes/userRoutes.js'
import connectDB from './config/db.js'
import passportjwt, { ExtractJwt } from 'passport-jwt'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import bodyParser from 'body-parser'

const PORT = 5000
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(passport.initialize())
const jwtStrategy = passportjwt.Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
}
passport.use(
  new jwtStrategy(jwtOptions, (jwtPayload, done) => {
    console.log('payload: ' + JSON.stringify(jwtPayload))
    if (jwtPayload.sub === 'test1234') {
      done(null, { id: 'test1234' })
    } else {
      done(null, false)
    }
  })
)

connectDB()

app.use(express.json())

app.use('/products', productRouter)
app.use('/auth', userRouter)

app.listen(PORT, () => {
  console.log(`App listenining on PORT: ${PORT}`)
})
