import { createSlice } from '@reduxjs/toolkit'
import { initState } from '../initState'

const favouriteSlice = createSlice({
  name: 'favourites',
  initialState: initState.favourites,
  reducers: {
    changeIsPickProduct(state, action) {
      const currentProduct = state.find((product) => product.id === action.payload)
      if (currentProduct) currentProduct.isChecked = !currentProduct.isChecked
    },

    deleteProductFavourite(state, action) {
      return state.filter((product) => product.id !== action.payload)
    },
    clearFavourites() {
      return []
    },

    chekAllProduct(state) {
      return state.map((product) => ({
        ...product, isChecked: true,
      }))
    },
    nonChekAllProduct(state) {
      return state.map((product) => ({
        ...product, isChecked: false,
      }))
    },
    addNewProductFavour: {
      reducer(state, action) {
        const currentProduct = state.find((product) => product.id === action.payload)
        if (!currentProduct) state.unshift(action.payload)
      },
      prepare(id) {
        return {
          payload: {
            id,
            isChecked: false,
            count: 1,
          },
        }
      },
    },
  },
})

export const {
  // eslint-disable-next-line max-len
  changeIsPickProduct, deleteProductFavourite, clearFavourites, addNewProductFavour, chekAllProduct, nonChekAllProduct,
} = favouriteSlice.actions
export const getAllFavouritesProductsSelector = (state) => state.favourites
export const favouriteReducer = favouriteSlice.reducer
