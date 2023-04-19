/* eslint-disable max-len */
import { createPortal } from 'react-dom'
import { useEffect } from 'react'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import modalDeleteStyle from './modalDeleteStyle.module.css'
import { getTokenSelector } from '../../../../redux/slices/tokenSlice'

function ModalDeleteInner({ children, closeHandler, id }) {
  const navigate = useNavigate()
  // const dispatch = useDispatch()
  const token = useSelector(getTokenSelector)
  // const creatid = useSelector(getCreatidSelector)
  // const { productId } = useParams()

  useEffect(
    () => {
      if (!token) {
        navigate('/signin')
      }
    },
    [token],
  )

  useEffect(() => {
    const closeModalByEscape = (e) => {
      if (e.key === 'Escape') {
        closeHandler()
      }
    }

    document.addEventListener('keydown', closeModalByEscape)

    return () => {
      document.removeEventListener('keydown', closeModalByEscape)
    }
  }, [])

  const closeModalByClickX = () => {
    closeHandler()
  }

  const closeModalByClickClose = () => {
    closeHandler()
  }
  const {
    mutateAsync, isLoading,
  } = useMutation({
    mutationFn: () => fetch(`https://api.react-learning.ru/products/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },

    }).then((res) => res.json()),
  })

  console.log(isLoading)

  const submitProductDeleteHandler = async (values) => {
    await mutateAsync(values, id)
    navigate('/products')
  }

  return (
    <div className={modalDeleteStyle.modalInner}>
      <button className={classNames('btn', 'btn-primary', 'btn-sm', modalDeleteStyle.closeBtn)} onClick={closeModalByClickX} type="button">X</button>
      <h5>Удалить продукт</h5>
      <button
        onClick={closeModalByClickClose}
        type="button"
        className="btn btn-primary mx-2"
      >
        Close
      </button>
      <button
        onClick={submitProductDeleteHandler}
        type="submit"
        className="btn btn-danger"
      >
        Delete
      </button>
      {children}
    </div>
  )
}

export function ModalDelete({
  children, closeHandler, isOpen, id,
}) {
  if (!isOpen) return null

  const closeModalByClickWrap = (e) => {
    if (e.target === e.currentTarget) {
      closeHandler()
    }
  }

  return createPortal(
    <div onClick={closeModalByClickWrap} className={modalDeleteStyle.wrap}>
      <ModalDeleteInner id={id} closeHandler={closeHandler}>
        {children}
      </ModalDeleteInner>
    </div>,
    document.getElementById('modal-root'),

    // <div className={modalDeteilStyle.wrap}>
    //   {children}
    // </div>,
  )
}
