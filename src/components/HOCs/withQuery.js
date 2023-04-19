/* eslint-disable linebreak-style */
// eslint-disable-next-line import/named
import Loader from '../louder/Louder'

export const withQuery = (WrappedComponent) => function ({
  isLoading, isError, error, refetch, ...rest
}) {
  if (isLoading) return <Loader />
  if (isError) {
    return (
      <div className="d-flex flex-column justify-content-center">

        <p>
          Error happend:
          {' '}
          {error.message}
        </p>

        <button
          onClick={refetch}
          type="button"
          className="btn btn-primary"
        >
          Refetch
        </button>
      </div>
    )
  }
  return <WrappedComponent {...rest} />
}
