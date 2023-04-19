import { configureStore } from '@reduxjs/toolkit'
import { REDUX_LS_KEY } from './constants'
import { gitInitState } from './initState'
import { cartReducer } from './slices/cartSlice'
import { favouriteReducer } from './slices/favouriteSlice'
import { filterReducer } from './slices/filterSlice'
import { likesReducer } from './slices/likesSlice'
import { tokenReducer } from './slices/tokenSlice'
import { emailReducer } from './slices/emailSlice'

export const store = configureStore({
  reducer: {
    email: emailReducer,
    cart: cartReducer,
    filter: filterReducer,
    token: tokenReducer,
    favourites: favouriteReducer,
    likes: likesReducer,

  },
  preloadedState: gitInitState(),
})

store.subscribe(() => window.localStorage.setItem(REDUX_LS_KEY, JSON.stringify(store.getState())))
