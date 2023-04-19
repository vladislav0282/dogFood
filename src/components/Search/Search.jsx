import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

import { changeSearchFilter } from '../../redux/slices/filterSlice'
import { useDebounce } from '../hooks/useDebounce'

function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState(() => {
    const searchValueFromQuery = searchParams.get('q')

    return searchValueFromQuery ?? ''
  })
  const dispatch = useDispatch()
  const debouncedSearchValue = useDebounce(search, 750)

  const searchHandler = (e) => {
    const newSearchValue = e.target.value
    setSearch(newSearchValue)
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      q: newSearchValue,
    })
  }

  useEffect(() => {
    dispatch(changeSearchFilter(debouncedSearchValue))
  }, [dispatch, debouncedSearchValue])

  return (
    <input
      placeholder="Найти"
      type="text"
      className="form-control"
      style={{ width: '300px', margin: '24px auto' }}
      value={search}
      onChange={searchHandler}
    />
  )
}

export default Search
