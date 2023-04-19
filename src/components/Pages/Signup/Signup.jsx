/* eslint-disable linebreak-style */
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { createSignupFormValidationSchema } from '../validatorSignup'
import styleSignUp from './styleSignUp.module.css'
// import { prepareData } from './helpers/utils'

const initialValues = {
  email: '',
  group: 'sm9',
  password: '',
}

export function Signup() {
  const navigate = useNavigate()
  const { mutateAsync } = useMutation({
    mutationFn: (data) => fetch('https://api.react-learning.ru/signup', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => res.json()),
  })

  const submitHandler = async (values) => {
    // const response = await mutateAsync(values) (если нужно перейти на детальную страницу)
    // navigate(`/signin/${response.id}`)
    await mutateAsync(values)
    navigate('/signin')
  }

  // export function Signup() {
  // const submitHandler = (values) => {
  //   console.log(values)
  // }

  return (
    <div className={styleSignUp.wr}>
      <h3>Зарегистрируйтесь</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={createSignupFormValidationSchema}
        onSubmit={submitHandler}
      >
        <Form className="d-flex  justify-content-center text-centr flex-row">
          <Field className="m-2" name="email" placeholder="Email" type="email" />
          <ErrorMessage component="p" className="error" name="email" />

          <Field className="m-2" name="group" placeholder="sm9" type="text" />
          <ErrorMessage component="p" className="error" name="group" />

          <Field className="m-2" name="password" placeholder="password" type="password" />
          <ErrorMessage component="p" className="error" name="password" />

          <button className="btn btn-primary m-2" type="submit">Отправить</button>
        </Form>
      </Formik>

    </div>

  )
}
