import express, { json } from 'express'
import dotenv from 'dotenv'
dotenv.config({ path: '../.env' })
import productRouter from './routes/productRoutes.js'
import userRouter from './routes/userRoutes.js'
import connectDB from './config/db.js'

const PORT = 5000
const app = express()

connectDB()

app.use(express.json())

app.use('/products', productRouter)
app.use('/auth', userRouter)

app.listen(PORT, () => {
  console.log(`App listenining on PORT: ${PORT}`)
})
