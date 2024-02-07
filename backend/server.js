import express from 'express'
import productRouter from './routes/productRoutes.js'
import userRouter from './routes/userRoutes.js'

const PORT = 5000
const app = express()

app.use('/products', productRouter)
app.use('/auth', userRouter)

app.listen(PORT, () => {
  console.log(`App listenining on PORT: ${PORT}`)
})
