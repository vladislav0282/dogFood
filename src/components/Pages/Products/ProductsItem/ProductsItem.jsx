/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable max-len */

// import { useDispatch } from 'react-redux'
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { addNewProduct, deleteProduct, getAllCartProductsSelector } from '../../../../redux/slices/cartSlice'
import productsitemStyle from './productsitem.module.css'
import { getTokenSelector } from '../../../../redux/slices/tokenSlice'
import { addNewProductFavour, deleteProductFavourite, getAllFavouritesProductsSelector } from '../../../../redux/slices/favouriteSlice'

export function ProductsItem({
  name, price, pictures, wight, id, discount, stock,
}) {
  const cart = useSelector(getAllCartProductsSelector)
  const favourites = useSelector(getAllFavouritesProductsSelector)
  const token = useSelector(getTokenSelector)

  useEffect(
    () => {
      if (!token) {
        Navigate('/signin')
      }
    },
    [token],
  )

  const discountPrise = price * ((100 - discount) / 100)

  const dispatch = useDispatch()
  const moveToCartHandler = () => {
    dispatch(addNewProduct(id))
  }

  const moveToFavouriteHandler = () => {
    dispatch(addNewProductFavour(id))
  }

  const removeFromFavouriteHandler = () => {
    dispatch(deleteProductFavourite(id))
  }

  const removeFromCartHandler = () => {
    dispatch(deleteProduct(id))
  }

  const isInCart = (productsListId) => cart.find((product) => product.id === productsListId)
  const isInFavourites = (productsListId) => favourites.find((product) => product.id === productsListId)

  // const isDiscount = () => {
  //   if (discount !== 0) {
  //     <>
  //       <s>
  //         {price}
  //         {' '}
  //       </s>
  //       <p>
  //         {' '}
  //         {discountPrise}
  //       </p>
  //     </>
  //   }
  // }

  // const isNotDiscount = () => {
  //   if (discount === 0){
  //     <p>
  //         {price}
  //         {' '}
  //       </p>
  //   }
  // }

  return (
    <div className={productsitemStyle.wrapper}>
      <div className={productsitemStyle.card}>
        <div className={productsitemStyle.cardWr}>
          <div style={{
            display: 'flex',
            position: 'relative',
            justifyContent: 'space-between',
            minHeight: '50px',
          }}
          >
            <Link to={`./${id}`}>
              <h6>{name}</h6>
            </Link>
            <button
              type="button"
              onClick={isInFavourites(id) ? removeFromFavouriteHandler : moveToFavouriteHandler}
              className={clsx(
                'btn',
                'btn-outline-danger',
                { 'bg-warning': isInFavourites(id) },
              )}
              // "btn btn-outline-danger card__btn"
            >
              <i className="fa-regular fa-heart fa-lg" />
            </button>
          </div>
          <div style={{
            display: 'flex',
            position: 'relative',
            justifyContent: 'center',
            marginBottom: '5px',
            marginTop: '4px',
          }}
          >
            <img style={{ borderRadius: '8px' }} width="240px" height="130px" src={pictures} />
          </div>
          <div className="d-flex flex-derection-row gap-1">
            <span> цена:</span>
            {discount ? (
              <s>
                {' '}
                {price}
                {' '}
              </s>
            ) : (
              <p>
                {' '}
                {price}
                {' '}
              </p>
            )}
            <p>
              {' '}
              {discount ? discountPrise : ''}
              {' '}
              руб.
            </p>
          </div>
          <p>
            Количество:
            {' '}
            {stock}
            {' '}
            шт.
          </p>
          <p>
            {discount ? 'Скидка:' : ''}
            {' '}
            {discount || ''}
            {discount ? '%:' : ''}
          </p>
          <p>
            Вес:
            {' '}
            {wight}
          </p>

        </div>
        <button
          className="btn btn-primary p-1"
          style={{
            position: 'absolute', bottom: '10px', right: '80px', maxWidth: '160px',
          }}
          type="button"
          onClick={isInCart(id) ? removeFromCartHandler : moveToCartHandler}
        >
          {isInCart(id) ? 'В корзине' : 'Добавить в карзину'}
        </button>
      </div>
    </div>
  )
}

// const { basketCounter } = useSelector((state) => state)
// console.log(basketCounter)

// const checkHandler = () => {
//   if (checked) {
//     dispatch({
//       type: COUNTER_INCREMENT,
//     })
//   } else {
//     dispatch({
//       type: COUNTER_DECREMENT,
//     })
//   }
//   setChecked(!checked)
// }

// setChecked(!checked)

// <>
//   <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
//     <div>Products...</div>
//     <div className="d-flex align-items-center">
//       <div>{products}</div>
//       <img src={pictures} />
//       <p>{products}</p>
//       <p>{name}</p>
//       <p>{price}</p>
//       <p>{description}</p>
//       <p>{wight}</p>
//     </div>
//   </div>
//   <div>{products}</div>
// </>
