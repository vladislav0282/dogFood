/* eslint-disable max-len */
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getTokenSelector } from '../../../redux/slices/tokenSlice'
import { dogFoodApi } from '../../../api/DogFoodApi'
import { PRODUCT_DETEIL } from '../../../redux/constants'
import { withQuery } from '../../HOCs/withQuery'
import { DeteilProductItem } from './DeteilProductItem'
import { getEmailSelector } from '../../../redux/slices/emailSlice'
// import { ReviewsForm } from './ReviewsForm/ReviewsForm'
// import reviewsInputStyle from './reviewsInputStyle.css'

function ProductDetailInner({ currentProduct, email }) {
  return (
    <div>
      <div className="d-flex flex-column align-items-center" style={{ marginTop: '110px' }}>
        <h3>Подробно о товаре</h3>
        {/* <div className="d-flex flex-row">
          <input
            placeholder="Отзыв"
            type="text"
            className="form-control"
            style={{ width: '300px', margin: '4px auto' }}
            value={reviews}
            onChange={changeReviewsHendler}
          />
          <button onSubmit={submitHandler} type="submit" value={reviews} className="btn btn-success p-1 m-1">Добавить</button>
        </div> */}
      </div>
      <DeteilProductItem
        name={currentProduct.name}
        description={currentProduct.description}
        pictures={currentProduct.pictures}
        price={currentProduct.price}
        wight={currentProduct.wight}
        stock={currentProduct.stock}
        discount={currentProduct.discount}
        likes={currentProduct.likes}
        createdAt={currentProduct.created_at}
        reviews={currentProduct.reviews}
        authorName={currentProduct.author.name}
        id={currentProduct._id}
        currentEmail={currentProduct.author.email}
        email={email}
      />
    </div>

  )
}
const ProductDetailInnerWithQuery = withQuery(ProductDetailInner)

export function DeteilProduct() {
  const token = useSelector(getTokenSelector)
  const email = useSelector(getEmailSelector)

  const { productId } = useParams()
  const navigate = useNavigate()

  useEffect(
    () => {
      if (!token) {
        navigate('/signin')
      }
    },
    [token],
  )

  const {
    data: currentProduct, isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: [PRODUCT_DETEIL, productId],
    queryFn: () => dogFoodApi.getProductById(productId, token),
    enabled: !!token && productId !== undefined,
  })

  return (

    <ProductDetailInnerWithQuery
      currentProduct={currentProduct}
      isLoading={isLoading}
      isError={isError}
      error={error}
      refetch={refetch}
      email={email}
    />

  )
}

// useQuery({
//   queryKey: [PRODUCT_DETEIL, productId],
//   queryFn: () => fetch(
//     `https://api.react-learning.ru/products/${productId}`,
//     {
//       headers: {
//         authorization: `Bearer ${token}`,
//       },
//     },
//   ).then((res) => res.json()),

// const [reviews, setReviews] = useState(() => {
//   const dataFromLS = localStorage.getItem(REVIEWS_LS_KEY)
//   const preparedData = dataFromLS ? JSON.parse(dataFromLS) : ''
//   return preparedData
// })

// useEffect(() => {
//   localStorage.setItem(REVIEWS_LS_KEY, JSON.stringify(reviews))
// }, [reviews])

// const changeReviewsHendler = (e) => {
//   const reviewsTargetValue = e.target.value
//   setReviews(reviewsTargetValue)
// }

// const submitHandler = (value) => {
//   console.log({ value })
// }

// createdAt = new Date(Date.parse(created_at))
// updatedAt = new Date(Date.parse(updated_at))
// const formattedCreatedAt = createdAt.toLocaleString(createdAt)
// const formattedUpdatedAt = updatedAt.toLocaleString(updatedAt)

// const {
//   data: currentProduct, isLoading,
//   isError,
//   error,
//   refetch,
// } = useQuery({
//   queryKey: [PRODUCT_DETEIL, productId],
//   queryFn: () => dogFoodApi.getRewiewsByProductId(productId, token),
//   enabled: !!token && productId !== undefined,
// })
