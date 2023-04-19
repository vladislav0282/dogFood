/* eslint-disable linebreak-style */
import * as Yup from 'yup'

export const createReviewsFormValidationSchema = Yup.object({

  text: Yup.string(),
  // rating: Yup.string(),
})
