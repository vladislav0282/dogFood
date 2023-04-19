/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  chekAllProduct, clearFavourites, getAllFavouritesProductsSelector, nonChekAllProduct,
} from '../../../../redux/slices/favouriteSlice'
import { FavouriteItem } from '../FavouritesItem/FavouriteItem'
import favouriteStyle from './favouriteStyle.module.css'
import { withQuery } from '../../../HOCs/withQuery'
import { getTokenSelector } from '../../../../redux/slices/tokenSlice'
import { dogFoodApi } from '../../../../api/DogFoodApi'
import { getQueryCartKey } from '../../../../utils'

function FavouriteInner({ data }) {
  const products = data
  const favourites = useSelector(getAllFavouritesProductsSelector)
  const dispatch = useDispatch()
  // const navigate = useNavigate()
  const clearFavouriteHandler = () => {
    dispatch(clearFavourites())
  }

  const isAllChecked = products.every((el) => el.isChecked)

  const selectAllProductsHandler = () => {
    if (!isAllChecked) dispatch(chekAllProduct())
    else dispatch(nonChekAllProduct())
  }

  return (
    <div className="d-flex justify-content-center flex-column" style={{ marginTop: '180px' }}>
      {!favourites[0]
      && (
        <>
          <h3>Нет избранных товаров</h3>
          <Link to="/products">К покупкам</Link>
          <Link to="/">На главную страницу</Link>
        </>
      )}
      {products[0] && (
      <ul>
        <div className="d-flex flex-row m-1" />
        <div className={favouriteStyle.header}>
          <h3 className="text-center">Избранные товары</h3>
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

            <button type="button" className="btn btn-danger" style={{ minWidth: '160px', minHeight: '30px' }} onClick={clearFavouriteHandler}>
              Удалить все
            </button>
          </div>
        </div>
        <div className="d-flex flex-row gap-2" style={{ flexWrap: 'nowrap', justifyContent: 'space-around' }}>
          <div className={favouriteStyle.left}>
            {products.map((product) => (
              <FavouriteItem
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
        </div>
        <div className="d-flex flex-row" style={{ flexWrap: 'nowrap', alignItems: 'flex-start', gap: '2px' }} />
      </ul>
      )}
    </div>
  )
}

const FavouriteInnerWithQuery = withQuery(FavouriteInner)

export function Favourites() {
  const token = useSelector(getTokenSelector)
  const favourites = useSelector(getAllFavouritesProductsSelector)
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
    queryKey: [getQueryCartKey(favourites.lenght)],
    queryFn: () => dogFoodApi.getProductsByIds(favourites.map((product) => product.id), token),
    keepPreviousData: true,
    enabled: !!token,
  })

  const products = favourites.map((product) => {
    const productFromBack = data.find((productBack) => productBack._id === product.id)
    if (productFromBack) {
      return { ...product, ...productFromBack }
    }
    return product
  })

  return <FavouriteInnerWithQuery data={products} isLoading={isLoading} isError={isError} refetch={refetch} error={error} />
}
export default Favourites
