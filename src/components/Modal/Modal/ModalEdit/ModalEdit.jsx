/* eslint-disable max-len */
import { createPortal } from 'react-dom'
import { useEffect } from 'react'
import classNames from 'classnames'
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import modalDeteilStyle from './modalDeteilStyle.module.css'
import { getTokenSelector } from '../../../../redux/slices/tokenSlice'
import { createProductEditValidationSchema } from './helpers/validatorEdit'
import styleSignIn from './styleSignIn.module.css'

function ModalInner({
  children, closeHandler, id, pictures, name, price, discount, stock, wight, description,
}) {
  const navigate = useNavigate()
  // const dispatch = useDispatch()
  const token = useSelector(getTokenSelector)
  // const { id } = useParams()
  console.log({ id })

  useEffect(
    () => {
      if (!token) {
        navigate('/signin')
      }
    },
    [token],
  )
  const initialValues = {
    pictures,
    name,
    price,
    discount,
    stock,
    wight,
    description,
  }

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
    mutationFn: (values) => fetch(`https://api.react-learning.ru/products/${id}`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(values),
    }).then((res) => res.json()),
  })

  const submitProductEditHandler = async (values) => {
    await mutateAsync(values, id)
    // await mutateAsync(values)

    navigate('/products')
    closeHandler()
  }

  return (
    <div className={modalDeteilStyle.modalInner}>
      <div className={styleSignIn.wr}>
        <h3>Редактировать продукт</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={createProductEditValidationSchema}
          onSubmit={submitProductEditHandler}
        >
          <Form className="d-flex  justify-content-center text-centr flex-column">

            <Field className="mx-2 my-1" name="name" placeholder="Name" type="text" />
            <ErrorMessage component="p" className="error" name="name" />

            <Field className="mx-2" name="pictures" type="text" placeholder="Img url" />
            <ErrorMessage component="p" className="error" name="pictures" />

            <Field className="mx-2" name="price" type="number" placeholder="Price" />
            <ErrorMessage component="p" className="error" name="price" />

            <Field className="mx-2" name="discount" type="number" placeholder="Discount" />
            <ErrorMessage component="p" className="error" name="discount" />

            <Field className="mx-2" name="stock" type="number" placeholder="Stock" />
            <ErrorMessage component="p" className="error" name="stock" />

            <Field className="mx-2" name="wight" type="text" placeholder="Weight" />
            <ErrorMessage component="p" className="error" name="wight" />

            <Field className="mx-2" name="description" placeholder="Description" type="text" />
            <ErrorMessage component="p" className="error" name="description" />

            <button className="btn btn-primary m-2" style={{ minWidth: '150px' }} type="submit" disabled={isLoading}>Редактировать</button>
          </Form>
        </Formik>

      </div>

      <button className={classNames('btn', 'btn-primary', 'btn-sm', modalDeteilStyle.closeBtn)} onClick={closeModalByClickX} type="button">X</button>
      <button
        onClick={closeModalByClickClose}
        type="button"
        className="btn btn-primary mx-2"
      >
        Закрыть
      </button>
      {children}
    </div>
  )
}

export function ModalEdit({
  children, closeHandler, isOpen, id, pictures, name, price, discount, stock, wight, description,
}) {
  if (!isOpen) return null

  const closeModalByClickWrap = (e) => {
    if (e.target === e.currentTarget) {
      closeHandler()
    }
  }

  return createPortal(
    <div onClick={closeModalByClickWrap} className={modalDeteilStyle.wrap}>
      <ModalInner id={id} pictures={pictures} name={name} price={price} discount={discount} stock={stock} wight={wight} description={description} closeHandler={closeHandler}>
        {children}
      </ModalInner>
    </div>,
    document.getElementById('modal-root'),

    // <div className={modalDeteilStyle.wrap}>
    //   {children}
    // </div>,
  )
}
