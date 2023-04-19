/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { initState } from '../initState'

const emailSlice = createSlice({
  name: 'email',
  initialState: initState.email,
  reducers: {
    getEmail(state, action) {
      // eslint-disable-next-line no-return-assign
      return state = action.payload
    },
  },
})

export const { getEmail } = emailSlice.actions
export const getEmailSelector = (state) => state.email
export const emailReducer = emailSlice.reducer
