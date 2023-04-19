/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable max-len */
import clsx from 'clsx'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewProduct, deleteProduct, getAllCartProductsSelector } from '../../../../redux/slices/cartSlice'
import { changeIsPickProduct, deleteProductFavourite, getAllFavouritesProductsSelector } from '../../../../redux/slices/favouriteSlice'
import { DeleteCartModal } from '../../../Modal/ModalNotActive/DeleteModal'
import favouriteItemSyle from './favouriteItem.module.css'

export function FavouriteItem({

  pictures, name, price, id, discount, wight, stock, isChecked,
}) {
  const cart = useSelector(getAllCartProductsSelector)
  const favourites = useSelector(getAllFavouritesProductsSelector)
  const discountPrise = price * ((100 - discount) / 100)

  const dispatch = useDispatch()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const openDeleteFavouriteHandler = () => {
    dispatch(deleteProductFavourite(id))
  }

  const selectProductHandler = () => {
    dispatch(changeIsPickProduct(id))
  }
  const isInCart = (productsListId) => cart.find((product) => product.id === productsListId)

  const moveToCartHandler = () => {
    dispatch(addNewProduct(id))
  }
  const removeFromCartHandler = () => {
    dispatch(deleteProduct(id))
  }

  const isInFavourites = (productsListId) => favourites.find((product) => product.id === productsListId)
  return (
    <>
      <div className={favouriteItemSyle.wrapper}>
        <div className={favouriteItemSyle.card}>
          <div className={favouriteItemSyle.cardWr}>
            <div style={{
              display: 'flex',
              position: 'relative',
              justifyContent: 'space-between',
              minHeight: '50px',
              marginBottom: '4px',
            }}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={selectProductHandler}
              />
              <h6>{name}</h6>
              <button
                type="button"
                onClick={openDeleteFavouriteHandler}
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
            <div
              style={{
                display: 'flex',
                position: 'relative',
                justifyContent: 'center',
                marginBottom: '5px',
              }}
            >
              <img style={{ borderRadius: '8px' }} width="220x" height="110px" src={pictures} />
            </div>
            {/* <p>
              Описание:
              {' '}
              {description}
            </p> */}
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
            <div className="d-flex" style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <p>
                В наличии:
                {' '}
                {stock}
                {' '}
                шт.
              </p>
              <p>
                {' '}
              </p>
            </div>
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
      </div>
      <DeleteCartModal
        isOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        id={id}
      />
    </>
  )
}
