/* eslint-disable linebreak-style */
import * as Yup from 'yup'

export const createSigninFormValidationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),

  password: Yup.string()
    .min(4, 'Must be Must be 5 characters or more')
    .max(8, 'Must be 15 characters or less')
    .required('Required'),
})
