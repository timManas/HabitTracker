import asyncHandler from 'express-async-handler'

const verifyLogin = asyncHandler((req, res) => {
  res.send('Verify login')
})

const getUserInfo = asyncHandler((req, res) => {
  res.send('User Info')
})

export { getUserInfo, verifyLogin }
