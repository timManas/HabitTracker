import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: '',
    name: '',
    email: '',
  },
  reducers: {
    setId: (state, action) => {
      state.id = action.payload
    },
    setName: (state, action) => {
      state.name = action.payload
    },
    setEmail: (state, action) => {
      state.email = action.payload
    },
  },
})

export const { setId, setName, setEmail } = userSlice.actions

export default userSlice.reducer
