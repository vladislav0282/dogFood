/* eslint-disable key-spacing */
/* eslint-disable max-len */
/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
/* eslint-disable no-lone-blocks */

import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
// import { dogFoodApi } from '../../../api/DogFoodApi'
// import { AppTokenContext } from '../../contexts/AppTokenContextProvider'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { ProductsItem } from './ProductsItem/ProductsItem'
// import { withQuery } from '../../HOCs/withQuery'
import { dogFoodApi } from '../../../api/DogFoodApi'
import productsStyle from './productsStyle.module.css'
import { getQuerySearchKey } from '../../../utils'
import { getSearchSelector } from '../../../redux/slices/filterSlice'
import { getTokenSelector } from '../../../redux/slices/tokenSlice'
import { clearBasket } from '../../../redux/slices/cartSlice'
import { withQuery } from '../../HOCs/withQuery'
import { FILTER_QUERY_NAME, getFilteredProducts } from '../../Filters/constantsFilter'
import { Filters } from '../../Filters/Filters'

function ProductsInner({ data }) {
  const products = data
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const addBasketProductsHendler = () => {
    navigate('/basket')
  }

  const clearBasketHandler = () => {
    dispatch(clearBasket())
  }

  return (
    <div className="d-flex flex-column">
      <div className={productsStyle.header}>
        <div className="d-flex  justify-content-center flex-row">
          <h3>Каталог товаров</h3>
        </div>
        <div className="d-flex text-center flex-row" style={{ justifyContent:'space-around' }}>
          <Filters />
          <Link to="./create" className="btn btn-secondary">
            Создать продукт
          </Link>
          <button
            onClick={clearBasketHandler}
            type="button"
            className="btn btn-danger p-1"
            style={{ minWidth:'160px', minHeight:'30px' }}
          >
            Очистить карзину
          </button>
          <button
            onClick={addBasketProductsHendler}
            className="btn btn-primary p-1"
            type="button"
            style={{ minWidth:'160px', minHeight:'30px' }}
          >
            Перейти в карзину
          </button>
        </div>
      </div>
      <div>
        {products[0] && (
        <div className={productsStyle.wrap}>
          {products.map((product) => (
            <ProductsItem
              key={product._id}
              id={product._id}
              name={product.name}
              description={product.description}
              pictures={product.pictures}
              price={product.price}
              wight={product.wight}
              stock={product.stock}
              discount={product.discount}
            />
          ))}
        </div>
        )}
        {!products[0] && products && (
        <h5 className="card-header">По вашему запросу ничего не найдено</h5>
        )}
      </div>
    </div>

  )
}
const ProductsInnerWithQuery = withQuery(ProductsInner)

export function Products() {
  const token = useSelector(getTokenSelector)
  const [searchParams] = useSearchParams()
  const currentFilterNameFromQuery = searchParams.get(FILTER_QUERY_NAME)
  const navigate = useNavigate()
  useEffect(
    () => {
      if (!token) {
        navigate('/signin')
      }
    },
    [token],
  )

  const search = useSelector(getSearchSelector)
  const {
    data = [], isLoading, isError, error, refetch,
  } = useQuery({
    queryKey: getQuerySearchKey(search),
    queryFn: () => dogFoodApi.getAllProducts(search, token),
    enabled: (token !== undefined) && (token !== ''),
  })

  let products = data

  if (currentFilterNameFromQuery) {
    products = getFilteredProducts(data, currentFilterNameFromQuery)
  }

  // const { mutateAsync } = useMutation({
  //   mutationFn: () => dogFoodApi.getProductById(token),
  //   enabled: (token !== undefined) && (token !== ''),
  // })

  // const deteilHandler = async (values) => {
  //   await mutateAsync(values)
  //   navigate('/deteil')
  //   // navigate('/products')
  // }

  return <ProductsInnerWithQuery data={products} isLoading={isLoading} isError={isError} refetch={refetch} error={error} />
}
export default Products
