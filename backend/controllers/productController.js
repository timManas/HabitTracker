import asyncHandler from 'express-async-handler'

const getAllProducts = asyncHandler((req, res) => {
  res.send('HomePage Controllers')
})

export default getAllProducts
