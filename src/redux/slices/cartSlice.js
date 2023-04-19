import { createSlice } from '@reduxjs/toolkit'
import { initState } from '../initState'

const cartSlice = createSlice({
  name: 'cart',
  initialState: initState.cart,
  reducers: {
    changeIsPickProduct(state, action) {
      const currentProduct = state.find((product) => product.id === action.payload)
      if (currentProduct) currentProduct.isChecked = !currentProduct.isChecked
    },

    deleteProduct(state, action) {
      return state.filter((product) => product.id !== action.payload)
    },
    clearBasket() {
      return []
    },
    productIncrement(state, action) {
      const currentProduct = state.find((product) => product.id === action.payload)
      if (currentProduct) {
        currentProduct.count += 1
      }
    },
    productDecrement(state, action) {
      const currentProduct = state.find((product) => product.id === action.payload)
      if (currentProduct) {
        currentProduct.count -= 1
      }
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
    addNewProduct: {
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
  changeIsPickProduct, deleteProduct, clearBasket, addNewProduct, productIncrement, productDecrement, chekAllProduct, nonChekAllProduct,
} = cartSlice.actions
export const getAllCartProductsSelector = (state) => state.cart
export const cartReducer = cartSlice.reducer
