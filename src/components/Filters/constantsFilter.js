/* eslint-disable max-len */
const LOW_PRICE = 'LOW_PRICE'
const HIGH_PRICE = 'HIGH_PRICE'
const SALES = 'SALES'
const NEW_DATE = 'NEW_DATE'
const OLD_DATE = 'OLD_DATE'

export const PRICE_FILTER = {
  type: [LOW_PRICE, HIGH_PRICE],
  name: 'Цена',
}

export const SALES_FILTER = {
  type: SALES,
  name: 'Распродажа',
}

export const DATE_FILTER = {
  type: [NEW_DATE, OLD_DATE],
  name: 'Дата',
}

export const FILTER_QUERY_NAME = 'filterType'

export const getFilteredProducts = ([...products], filterType) => {
  switch (filterType) {
    case LOW_PRICE:
      return products.sort((a, b) => b.price - a.price)
    case HIGH_PRICE:
      return products.sort((a, b) => a.price - b.price)
    case SALES:
      return products.filter((product) => !!product.discount)
    case NEW_DATE:
      return products.sort((a, b) => (+b.created_at.match(/\d/g).join('')) - (+a.created_at.match(/\d/g).join('')))
    case OLD_DATE:
      return products.sort((a, b) => (+a.created_at.match(/\d/g).join('')) - (+b.created_at.match(/\d/g).join('')))
    default:
      return products
  }
}
