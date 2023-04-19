import { useSearchParams } from 'react-router-dom'
import {
  DATE_FILTER, FILTER_QUERY_NAME, PRICE_FILTER, SALES_FILTER,
} from './constantsFilter'
import { FilterItem } from './Filteritem/Filteritem'

const FILTERS = [PRICE_FILTER, SALES_FILTER, DATE_FILTER]
export function Filters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const clickFilterHandler = (filterType, isActive) => {
    if (!isActive) searchParams.delete(FILTER_QUERY_NAME)
    else searchParams.set(FILTER_QUERY_NAME, filterType)
    setSearchParams(searchParams)
  }
  return (
    <div className="d-flex  justify-content-center">
      {FILTERS.map((filter) => (
        <FilterItem
          key={filter.name}
          {...filter}
          clickFilterHandler={clickFilterHandler}
        />
      ))}
    </div>
  )
}
