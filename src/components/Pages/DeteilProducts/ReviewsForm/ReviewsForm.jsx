/* eslint-disable max-len */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { getTokenSelector } from '../../../../redux/slices/tokenSlice'
// import Loader from '../../../louder/Louder'
import { createReviewsFormValidationSchema } from './helpers/validatorReviews'
import { REVIEWS } from '../../../../redux/constants'

export function ReviewsForm({ id }) {
  const token = useSelector(getTokenSelector)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  useEffect(
    () => {
      if (!token) {
        navigate('/signin')
      }
    },
    [token],
  )

  const initialValues = {
    text: '',
  }

  const {
    mutateAsync, isLoading,
  } = useMutation({
    mutationFn: (values) => fetch(fetch(`https://api.react-learning.ru/products/review/${id}`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(values),
    }).then((res) => res.json)),
  })

  const submitHandler = async (values) => {
    await mutateAsync(values)
    queryClient.invalidateQueries({ queryKey: [REVIEWS] })
    // navigate(`/products/${id}`)
  }

  return (
    <Formik
      initialValues={initialValues}
      validatorSchema={createReviewsFormValidationSchema}
      onSubmit={submitHandler}
    >
      <Form className="d-flex flex-row">
        {/* <Field name="author" placeholder="Author" type="text" />
        <ErrorMessage component="p" className="error" name="author" /> */}

        <Field
          className="form-control"
          style={{ width: '300px', margin: '4px auto' }}
          name="text"
          type="text"
          placeholder="Отзыв"
        />
        <ErrorMessage component="p" className="error" name="text" />

        {/* <Field name="rating" placeholder="Rating" type="text" />
        <ErrorMessage component="p" className="error" name="rating" /> */}

        <button className="btn btn-success py-0 px-1 m-1" disabled={isLoading} type="submit">Отправить</button>
      </Form>
    </Formik>

  )
}
//   if (isLoading) return <Loader />
//   if (isError) {
//     return (
//       <div className="d-flex flex-column justify-content-center">

//         <p>
//           Error happend:
//           {' '}
//           {error.message}
//         </p>
//       </div>
//     )
//   }
