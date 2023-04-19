/* eslint-disable max-len */
import { useSearchParams } from 'react-router-dom'
// import { classNames } from 'classnames'
import filterBasketStyle from './filterBasketStyle.module.css'

export function FilterBasket() {
  const [searchParams, setSearchParams] = useSearchParams()

  const FILTERS_NAMES = ['price', 'sales', 'new']

  const basketFilterHandler = (filterName) => {
    setSearchParams({
      ...Object.entries(searchParams.entries()),
      filterName,
    })
  }

  return (
    <div>
      {FILTERS_NAMES.map((filterName) => (
        <FilterItem
          key={filterName}
          basketFilterHandler={basketFilterHandler}
          filterName={filterName}
        />
      ))}
    </div>
  )
}
export function FilterItem({ filterName, basketFilterHandler }) {
  const [searchParams] = useSearchParams()
  const currentFilterName = searchParams.get('filterName')
  return (
    <button type="button" className={filterName === currentFilterName ? filterBasketStyle.active : ''} onClick={() => basketFilterHandler(filterName)}>
      {filterName}
    </button>
  )
}
