/* eslint-disable linebreak-style */
/* eslint-disable max-len */

import {
  Formik, Form, Field, ErrorMessage,
} from 'formik'
import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { useSelector, useDispatch } from 'react-redux'

import { createSigninFormValidationSchema } from './validatorSignin'
import { dogFoodApi } from '../../../api/DogFoodApi'
import { getToken, getTokenSelector } from '../../../redux/slices/tokenSlice'
import styleSignIn from './styleSignIn.module.css'
import { getEmail } from '../../../redux/slices/emailSlice'
// import { AppTokenContext } from '../../contexts/AppTokenContextProvider'

const initialValues = {
  email: '',
  password: '',
}

function Signin() {
  const token = useSelector(getTokenSelector)
  // const email = useSelector(getEmailSelector)
  // console.log({ email })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { mutateAsync } = useMutation({
    mutationFn: (values) => dogFoodApi.Signin(values, token)
      .then((res) => {
        dispatch(getToken(res.token))
        dispatch(getEmail(res.data.email))
      }),
  })

  const submitHandler = async (values) => {
    await mutateAsync(values)
    setTimeout(() => navigate('/products'))
  }

  return (
    <div className={styleSignIn.wr}>
      <h3>Введите логин и пароль</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={createSigninFormValidationSchema}
        onSubmit={submitHandler}
      >
        <Form className="d-flex  justify-content-center text-centr flex-row">
          <Field className="m-2" name="email" placeholder="Email" type="email" />
          <ErrorMessage component="p" className="error" name="email" />

          <Field className="m-2" name="password" placeholder="password" type="password" />
          <ErrorMessage component="p" className="error" name="password" />

          <button className="btn btn-primary m-2" type="submit">Отправить</button>
        </Form>
      </Formik>

    </div>

  )
}

export const SigninMemo = memo(Signin)
