/* eslint-disable linebreak-style */
import * as Yup from 'yup'

export const createProductFormValidationSchema = Yup.object({
  name: Yup.string()
    .min(3, 'Must be Must be 5 characters or more')
    .required('Required'),

  pictures: Yup.string()
    .url(),

  price: Yup.number()
    .required('Required'),

  discount: Yup.number(),

  stock: Yup.number()
    .min(1, 'Must be Must be 1 characters or more')
    .required('Required'),
  wight: Yup.string()
    .min(1, 'Must be Must be 1 characters or more')
    .required('Required'),

  description: Yup.string()
    .min(1, 'Must be Must be 1 characters or more')
    .required('Required'),
})
