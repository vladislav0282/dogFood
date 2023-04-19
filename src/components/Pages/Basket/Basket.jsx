/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link, useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { dogFoodApi } from '../../../api/DogFoodApi'
import { getQueryCartKey } from '../../../utils'
import { getTokenSelector } from '../../../redux/slices/tokenSlice'
import basketStyle from './basketStyle.module.css'
import { BasketItem } from './BasketItem'
import {
  chekAllProduct, clearBasket, getAllCartProductsSelector, nonChekAllProduct,
} from '../../../redux/slices/cartSlice'
import { withQuery } from '../../HOCs/withQuery'

function BasketInner({ data }) {
  const products = data
  const cart = useSelector(getAllCartProductsSelector)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const clearBasketHandler = () => {
    dispatch(clearBasket())
  }

  const isAllChecked = products.every((el) => el.isChecked)
  const findAllCheckedProducts = () => {
    const allCheckedProducts = []
    cart.forEach((product) => {
      if (product.isChecked === true) allCheckedProducts.push(product)
    })
    return allCheckedProducts
  }
  const selectAllProductsHandler = () => {
    if (!isAllChecked) dispatch(chekAllProduct())
    else dispatch(nonChekAllProduct())
  }

  const getBasketProductsById = (idItem) => products.find((product) => product.id === idItem)
  const sumAllCartProducts = () => findAllCheckedProducts().reduce((sum, product) => {
    const updatedSum = sum + product.count * getBasketProductsById(product.id).price
    return updatedSum
  }, 0)

  const sumDidscauntAllCartProducts = () => findAllCheckedProducts().reduce((sum, product) => {
    const updatedSumDidscaunt = sum + product.count * getBasketProductsById(product.id).price * ((getBasketProductsById(product.id).discount) / 100)
    return updatedSumDidscaunt
  }, 0)

  const totalSumAllCartProducts = sumAllCartProducts() - sumDidscauntAllCartProducts()

  return (
    <div className="d-flex justify-content-center flex-column" style={{ marginTop: '180px' }}>
      {!cart[0]
      && (
        <>
          <h3>Карзина пуста</h3>
          <Link to="/products">К покупкам</Link>
          <Link to="/">На главную страницу</Link>
        </>
      )}
      {products[0] && (
      <ul>
        <div className="d-flex flex-row m-1" />
        <div className={basketStyle.header}>
          <h3 className="text-center">Товары в карзине</h3>
          <div className="d-flex flex-row" style={{ justifyContent: 'space-between', paddingLeft: '5vh', paddingRight: '5vh' }}>
            <div className="d-flex flex-row">
              <input
                id="select_all"
                type="checkbox"
                checked={isAllChecked}
                onChange={selectAllProductsHandler}
              />
              <label htmlFor="select_all">Выделить все</label>
            </div>

            <button type="button" className="btn btn-danger" style={{ minWidth: '160px', minHeight: '30px' }} onClick={clearBasketHandler}>
              Очистить карзину
            </button>
          </div>
        </div>
        <div className="d-flex flex-row gap-2" style={{ flexWrap: 'nowrap', justifyContent: 'space-around' }}>
          <div className={basketStyle.left}>
            {products.map((product) => (
              <BasketItem
                key={product._id}
                id={product._id}
                name={product.name}
                price={product.price}
                pictures={product.pictures}
                wight={product.wight}
                description={product.description}
                isChecked={product.isChecked}
                discount={product.discount}
                stock={product.stock}
                count={product.count}
              />
            ))}
          </div>
          <div className={basketStyle.right}>
            <h6 className="text-center">Информация о заказе</h6>
            <div className={basketStyle.rightInner}>
              <p>
                Сумма:
                {' '}
                {sumAllCartProducts()}
                {' '}
                руб.
              </p>
              <p>
                Скидка:
                {' '}
                {sumDidscauntAllCartProducts()}
                {' '}
                руб.
              </p>
              <p style={{ color: 'darkgreen' }}>
                К оплате:
                {' '}
                <span style={{ fontWeight: '700' }}>
                  {' '}
                  {totalSumAllCartProducts}
                  {' '}
                  руб.
                </span>
              </p>
            </div>
            <div className="d-flex justify-content-center flex-row">
              <button type="button" className="btn btn-primary" style={{ minWidth: '160px', minHeight: '30px' }}>
                Перейти к оплате
              </button>
            </div>
          </div>

        </div>

        <div className="d-flex flex-row" style={{ flexWrap: 'nowrap', alignItems: 'flex-start', gap: '2px' }} />

      </ul>
      )}
    </div>
  )
}

const BasketInnerWithQuery = withQuery(BasketInner)

export function Basket() {
  const token = useSelector(getTokenSelector)
  const cart = useSelector(getAllCartProductsSelector)
  const navigate = useNavigate()
  useEffect( // useEffect Непускает в карзину без токена
    () => {
      if (!token) {
        navigate('/signin')
      }
    },
    [token],
  )
  const {
    data = [], isLoading, isError, error, refetch,
  } = useQuery({
    queryKey: [getQueryCartKey(cart.lenght)],
    queryFn: () => dogFoodApi.getProductsByIds(cart.map((product) => product.id), token),
    keepPreviousData: true,
    enabled: !!token,
  })

  const products = cart.map((product) => {
    const productFromBack = data.find((productBack) => productBack._id === product.id)
    if (productFromBack) {
      return { ...product, ...productFromBack }
    }
    return product
  })

  return <BasketInnerWithQuery data={products} isLoading={isLoading} isError={isError} refetch={refetch} error={error} />
}
export default Basket
// const searchBasketHandler = (e) => {
//   const newFilterValue = e.target.value
//   setSearchParams({
//     ...Object.entries(searchParams.entries()),
//     q: newFilterValue,
//   })
// }

// if (isLoading) return <Louder />

// if (isError) {
//   return (
//     <p>
//       Произошла ошибка:
//       {' '}
//       {error.message}
//     </p>
//   )
// }

// let products = data

// if (currentFilterNameFromQuery) {
//   products = getFilteredProducts(data, currentFilterNameFromQuery)
// }
