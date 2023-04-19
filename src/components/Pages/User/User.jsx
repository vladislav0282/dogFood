/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable max-len */
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { dogFoodApi } from '../../../api/DogFoodApi'
import { USERS_LS_KEY } from '../../../redux/constants'
import { getTokenSelector } from '../../../redux/slices/tokenSlice'
import { withQuery } from '../../HOCs/withQuery'
import userStyle from './userStyle.module.css'

function UserInner({ data }) {
  const token = useSelector(getTokenSelector)
  const navigate = useNavigate()
  const user = data
  useEffect(
    () => {
      if (!token) {
        navigate('/signin')
      }
    },
    [token],
  )

  return (
    <div className="d-flex flex-column" style={{ position: 'relative' }}>
      <div className={userStyle.wr}>
        {user && (
          <div className="d-flex flex-row gap-4" style={{ position: 'absolute', top: '5rem', left: '1rem' }}>
            <div className="d-flex flex-column">
              <h6> Фото:</h6>
              {' '}
              <img style={{ borderRadius: '8px' }} width="300px" height="200px" src={user.avatar} />
            </div>
            <div className="d-flex flex-column py-3">
              <h2>
                Имя:
                {' '}
                <span>{user.name}</span>
              </h2>
              <h3>
                Должность:
                {' '}
                <span>{user.about}</span>
              </h3>

              <h3>
                Электронная почта:
                {' '}
                <span>{user.email}</span>
              </h3>
              <h3>
                Группа:
                {' '}
                <span>{user.group}</span>
              </h3>
              <h3>
                ID:
                {' '}
                <span>{user._id}</span>
              </h3>
            </div>
          </div>
        )}
        {!user && user && (
          <h5 className="card-header">Пользователь не найден</h5>
        )}
      </div>
    </div>
  )
}
const UserInnerWithQuery = withQuery(UserInner)

export function User() {
  const token = useSelector(getTokenSelector)
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
    data, isLoading, isError, error, refetch,
  } = useQuery({
    queryKey: [USERS_LS_KEY],
    queryFn: () => dogFoodApi.getUser(token),
    enabled: (token !== undefined) && (token !== ''),
  })
  const user = data
  return <UserInnerWithQuery data={user} isLoading={isLoading} isError={isError} refetch={refetch} error={error} />
}
export default User
