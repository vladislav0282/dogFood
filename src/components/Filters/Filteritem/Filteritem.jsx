import classNames from 'classnames'
import { useSearchParams } from 'react-router-dom'
import { FILTER_QUERY_NAME } from '../constantsFilter'

export function FilterItem({ type, clickFilterHandler, name }) {
  const [searchParams] = useSearchParams()

  const isComplexFilter = Array.isArray(type)

  const currentFilterNameFromQuery = searchParams.get(FILTER_QUERY_NAME)

  const isActive = !isComplexFilter
    ? currentFilterNameFromQuery === type
    : type.includes(currentFilterNameFromQuery)

  const clickHandler = () => {
    if (isComplexFilter) {
      const currentIndex = type.indexOf(currentFilterNameFromQuery)
      const nextIndex = (currentIndex + 1) % type.length
      return clickFilterHandler(type[nextIndex], true)
    }
    return clickFilterHandler(type, !isActive)
  }

  const renderArrow = () => {
    if (!isComplexFilter || !isActive) return null

    const currentIndex = type.indexOf(currentFilterNameFromQuery)

    return !currentIndex ? <>&#8595;</> : <>&#8593;</>
  }

  return (
    <button
      type="button"
      style={{
        minWidth: '100px', minHeight: '30px', padding: 0, margin: '2px',
      }}
      className={classNames(
        'btn my-1',
        { 'btn-dark': !isActive },
        { 'btn-danger': isActive },
      )}
      onClick={clickHandler}
    >
      {name}
      {renderArrow()}
    </button>
  )
}
