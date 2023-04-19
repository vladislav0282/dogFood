/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/alt-text */
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import {
  changeIsPickProduct, getAllCartProductsSelector, productIncrement, productDecrement,
} from '../../../redux/slices/cartSlice'
import basketitemSyle from './basketitem.module.css'
import { DeleteCartModal } from '../../Modal/ModalNotActive/DeleteModal'

export function BasketItem({

  pictures, name, price, id, discount, wight, stock, count, isChecked,
}) {
  const cart = useSelector(getAllCartProductsSelector)

  const dispatch = useDispatch()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const openDeleteModalHandler = () => {
    setIsDeleteModalOpen(true)
  }

  const discountPrise = price * ((100 - discount) / 100)

  const selectProductHandler = () => {
    dispatch(changeIsPickProduct(id))
  }

  const incrementCountHandler = () => {
    if (count < stock) { dispatch(productIncrement(id)) }
  }

  const decrementCountHandler = () => {
    if (count > 1) { dispatch(productDecrement(id)) }
  }
  return (
    <>
      <div className={basketitemSyle.wrapper}>
        <div className={basketitemSyle.card}>
          <div className={basketitemSyle.cardWr}>
            <div style={{
              display: 'flex',
              position: 'relative',
              justifyContent: 'center',
              minHeight: '50px',
            }}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={selectProductHandler}
              />
              <h6>{name}</h6>
            </div>
            <div style={{
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
              <div className="cart-right-info-stock">
                <button onClick={decrementCountHandler} type="button">-</button>
                <span>{ count }</span>
                <button onClick={incrementCountHandler} type="button">+</button>
              </div>
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
              className="btn btn-danger py-1"
              style={{
                position: 'absolute', bottom: '10px', right: '80px', maxWidth: '160px',
              }}
              type="button"
              onClick={openDeleteModalHandler}
            >
              Удалить
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
