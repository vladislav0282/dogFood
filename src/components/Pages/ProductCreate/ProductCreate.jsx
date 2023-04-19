/* eslint-disable max-len */
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { createProductFormValidationSchema } from './helpers/validator'
import { getTokenSelector } from '../../../redux/slices/tokenSlice'
import styleSignIn from './styleSignIn.module.css'

export function ProductCreate() {
  const navigate = useNavigate()
  const token = useSelector(getTokenSelector)

  useEffect(
    () => {
      if (!token) {
        navigate('/signin')
      }
    },
    [token],
  )
  const initialValues = {
    pictures: '',
    name: '',
    price: null,
    discount: null,
    stock: null,
    wight: '',
    description: '',
  }
  const {
    mutateAsync, isLoading,
  } = useMutation({
    mutationFn: (values) => fetch('https://api.react-learning.ru/products', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(values),
    }).then((res) => res.json()),
  })

  const submitProductHandler = async (values) => {
    const response = await mutateAsync(values)
    console.log({ response })

    navigate(`/products/${response._id}`)
  }

  return (
    <div className={styleSignIn.wr}>
      <h3>Создать продукт</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={createProductFormValidationSchema}
        onSubmit={submitProductHandler}
      >
        <Form className="d-flex  justify-content-center text-centr flex-column">

          <Field className="m-2" name="name" placeholder="Name" type="text" />
          <ErrorMessage component="p" className="error" name="name" />

          <Field className="m-2" name="pictures" type="text" placeholder="Img url" />
          <ErrorMessage component="p" className="error" name="pictures" />

          <Field className="m-2" name="price" type="number" placeholder="Price" />
          <ErrorMessage component="p" className="error" name="price" />

          <Field className="m-2" name="discount" type="number" placeholder="Discount" />
          <ErrorMessage component="p" className="error" name="discount" />

          <Field className="m-2" name="stock" type="number" placeholder="Stock" />
          <ErrorMessage component="p" className="error" name="stock" />

          <Field className="m-2" name="wight" type="text" placeholder="Weight" />
          <ErrorMessage component="p" className="error" name="wight" />

          <Field className="m-2" name="description" placeholder="Description" type="text" />
          <ErrorMessage component="p" className="error" name="description" />

          <button className="btn btn-primary m-2" type="submit" disabled={isLoading}>Создать</button>
        </Form>
      </Formik>

    </div>

  )
}
