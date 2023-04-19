/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { initState } from '../initState'

const tokenSlice = createSlice({
  name: 'token',
  initialState: initState.token,
  reducers: {
    getToken(state, action) {
      // eslint-disable-next-line no-return-assign
      return state = action.payload
    },
  },
})

export const { getToken } = tokenSlice.actions
export const getTokenSelector = (state) => state.token
export const tokenReducer = tokenSlice.reducer
