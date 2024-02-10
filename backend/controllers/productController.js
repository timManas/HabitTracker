import asyncHandler from 'express-async-handler'

const getAllProducts = asyncHandler(async (req, res) => {
  console.log('Fetch All Products')
  res.send('HomePage Controllers')
})

export default getAllProducts
