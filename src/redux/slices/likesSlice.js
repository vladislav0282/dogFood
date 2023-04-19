/* eslint-disable no-return-assign */
import { createSlice } from '@reduxjs/toolkit'
import { initState } from '../initState'

const likesSlice = createSlice({
  name: 'likes',
  initialState: initState.likes,
  reducers: {
    stocklikes(state, action) {
      // eslint-disable-next-line no-param-reassign
      return state = action.payload
    },

  },
})

export const { stocklikes } = likesSlice.actions
export const getAllLikesSelector = (state) => state.likes
export const likesReducer = likesSlice.reducer
