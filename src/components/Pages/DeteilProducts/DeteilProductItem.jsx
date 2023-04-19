/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/alt-text */
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { clsx } from 'clsx'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { addNewProduct, deleteProduct, getAllCartProductsSelector } from '../../../redux/slices/cartSlice'
import { addNewProductFavour, deleteProductFavourite, getAllFavouritesProductsSelector } from '../../../redux/slices/favouriteSlice'

import productDeteilStyle from './productDeteilStyle.module.css'
// import { prepareData } from './utils'
import { prepareData } from './utils'
import { ReviewsDeteil } from './ReviewsDeteil'
import { ModalEdit } from '../../Modal/Modal/ModalEdit/ModalEdit'
import { ReviewsForm } from './ReviewsForm/ReviewsForm'
import { ModalDelete } from '../../Modal/Modal/ModalDeleteProd/ModalDelete'
import { REVIEWS } from '../../../redux/constants'
import { getTokenSelector } from '../../../redux/slices/tokenSlice'
import { dogFoodApi } from '../../../api/DogFoodApi'
// import { getEmailSelector } from '../../../redux/slices/emailSlice'

export function DeteilProductItem({
  name, description, pictures, price, wight, stock, discount, id, likes, createdAt, currentEmail, email,
}) {
  const token = useSelector(getTokenSelector)
  const isAuthtor = (email === currentEmail)
  const dispatch = useDispatch()
  const cart = useSelector(getAllCartProductsSelector)
  const favourites = useSelector(getAllFavouritesProductsSelector)
  const isInFavourites = (productsListId) => favourites.find((product) => product.id === productsListId)
  const navigate = useNavigate()
  useEffect(
    () => {
      if (!token) {
        navigate('/signin')
      }
    },
    [token],
  )
  // console.log({ reviews })
  // console.log({ authorName })

  const [isDeleteModalHandler, setiIsDeleteModalHandler] = useState(false)
  const closeDeleteModalHandler = () => {
    setiIsDeleteModalHandler(false)
  }
  const openDeleteModalHandler = () => {
    setiIsDeleteModalHandler(true)
  }

  const [isDeleteModalDeleteHandler, setIsDeleteModalDeleteHandler] = useState(false)
  const closeDeleteModalDeleteHandler = () => {
    setIsDeleteModalDeleteHandler(false)
  }
  const openDeleteModalDeleteHandler = () => {
    setIsDeleteModalDeleteHandler(true)
  }

  const stockLikes = Object.keys(likes).length

  const createdAtPrepeir = prepareData(createdAt)

  const discountPrise = price * ((100 - discount) / 100)

  const moveToCartHandler = () => {
    dispatch(addNewProduct(id))
  }

  const removeFromCartHandler = () => {
    dispatch(deleteProduct(id))
  }

  const removeFromFavouriteHandler = () => {
    dispatch(deleteProductFavourite(id))
  }
  const moveToFavouriteHandler = () => {
    dispatch(addNewProductFavour(id))
  }

  const isInCart = (productsListId) => cart.find((product) => product.id === productsListId)

  const {
    data, isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: [REVIEWS, id],
    queryFn: () => dogFoodApi.getRewiewsByProductId(id, token),
    enabled: !!token && id !== undefined,
  })

  if (isLoading) return <p>Загружается</p>
  if (isError) {
    return (
      <div className="d-flex flex-column justify-content-center">

        <p>
          Error happend:
          {' '}
          {error.message}
        </p>

        <button
          onClick={refetch}
          type="button"
          className="btn btn-primary"
        >
          Refetch
        </button>
      </div>
    )
  }

  const reviews = data
  const reviewsCount = Object.keys(reviews).length

  return (
    <div className={productDeteilStyle.wrapper}>
      <div className={productDeteilStyle.card}>
        <div className={productDeteilStyle.cardWr}>
          <div style={{
            display: 'flex',
            position: 'relative',
            justifyContent: 'space-between',
            minHeight: '50px',
          }}
          >
            <h6>{name}</h6>
            <button
              type="button"
              onClick={isInFavourites(id) ? removeFromFavouriteHandler : moveToFavouriteHandler}
              className={clsx(
                'btn',
                'btn-outline-danger',
                { 'bg-warning': isInFavourites(id) },
              )}
            >
              <i className="fa-regular fa-heart fa-lg" />
            </button>
          </div>
          <div style={{
            display: 'flex',
            position: 'relative',
            justifyContent: 'space-around',
            marginBottom: '5px',
            marginTop: '4px',
          }}
          >
            <img style={{ borderRadius: '8px' }} width="240px" height="130px" src={pictures} />
            <div className="d-flex flex-column">
              <p>{description}</p>
              <div className="d-flex flex-derection-row">
                <p>
                  Количество лайков:
                  {' '}
                  {stockLikes}
                </p>
                <div className="cart-right-info-stock">
                  <button type="button">+</button>
                </div>
              </div>
              <p>
                Дата создания:
                {' '}
                {createdAtPrepeir}

              </p>
            </div>
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
          <div className="d-flex flex-derection-row justify-content-center">
            <button className="btn btn-primary p-1 mx-1" style={{ minWidth: '180px' }} type="button" onClick={isInCart(id) ? removeFromCartHandler : moveToCartHandler}>
              {isInCart(id) ? 'В корзине' : 'Добавить в корзину'}
            </button>
            <ModalEdit pictures={pictures} name={name} price={price} discount={discount} stock={stock} wight={wight} description={description} id={id} isOpen={isDeleteModalHandler} closeHandler={closeDeleteModalHandler} />
            <ModalDelete id={id} isOpen={isDeleteModalDeleteHandler} closeHandler={closeDeleteModalDeleteHandler} />
            {isAuthtor && (
              <button onClick={openDeleteModalHandler} className="btn btn btn-secondary p-1" style={{ minWidth: '180px' }} type="button">
                Редактировать
              </button>
            )}
            {isAuthtor && (
            <button onClick={openDeleteModalDeleteHandler} className="btn btn btn-danger p-1 mx-1" style={{ minWidth: '180px' }} type="button">
              Удалить
            </button>
            )}
          </div>
        </div>
      </div>
      <div className={productDeteilStyle.cardLeft}>
        <div className="d-flex flex-derection-row justify-content-center">
          <h5 className="p-1 m-1">
            Отзывы о товаре
            {' '}
            {reviewsCount}
          </h5>
        </div>
        <div>
          <ReviewsForm
            id={id}
          />
        </div>
        <div>
          {reviews.map((review) => (
            <ReviewsDeteil
              key={review._id}
              id={review._id}
              author={review.author.name}
              text={review.text}
              rating={review.rating}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
