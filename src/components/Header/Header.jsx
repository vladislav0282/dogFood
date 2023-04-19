/* eslint-disable max-len */
import classNames from 'classnames'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { memo, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import clsx from 'clsx'
import dogLogo from './images/LogoDog.svg'
import heart from './images/Heart.svg'
import headerStyles from './header.module.css'
import Search from '../Search/Search'
import { getTokenSelector, getToken } from '../../redux/slices/tokenSlice'
import { getAllCartProductsSelector } from '../../redux/slices/cartSlice'
import { getAllFavouritesProductsSelector } from '../../redux/slices/favouriteSlice'

function Header() {
  const token = useSelector(getTokenSelector)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(
    () => {
      if (!token) {
        navigate('/signin')
      }
    },
    [token],
  )

  const outHandler = () => {
    dispatch(getToken(''))
  }

  const cart = useSelector(getAllCartProductsSelector)
  const favourites = useSelector(getAllFavouritesProductsSelector)
  const countBasket = Object.keys(cart).length
  const countFavourites = Object.keys(favourites).length

  return (
    <header className={headerStyles.wr}>
      <nav>
        <ul className={headerStyles.menu}>
          <li>
            <Link to="/">
              <div><img src={dogLogo} alt="dogLogo" /></div>
              DogFood
            </Link>
          </li>
          <li>
            {token && (
            <Search />
            )}

          </li>
          <li>
            <NavLink
              className={headerStyles.basketNavLink}
              to="/basket"
            >
              {token ? 'Корзина' : ''}
              {token && (<div className={headerStyles.basketCounter}>{token ? countBasket : ''}</div>)}

              {/* <div className={headerStyles.basketCounter}>{token ? countBasket : ''}</div> */}
            </NavLink>
          </li>
          <li>
            <NavLink
              className={headerStyles.favourites}
              to="/favourites"
            >
              {token ? 'Избранные' : ''}
              {token && (
              <div className={headerStyles.wr_heart}>
                <div className={headerStyles.count__heart}>{countFavourites}</div>
              </div>
              )}
              {token && (
              <img className={headerStyles.img__heart} src={heart} alt="heart" />
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
                // eslint-disable-next-line max-len
              className={({ isActive }) => classNames({ [headerStyles.activLink]: isActive })}
                // className={headerStyles.user}
              to="/user"
            >
              {token ? 'Пользователь' : ''}
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={outHandler}
              className={({ isActive }) => classNames({ [headerStyles.activLink]: isActive })}
              to="Signin"
            >
              {token ? 'Выйти' : ''}
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={outHandler}
              className={({ isActive }) => classNames({
                [headerStyles.activLink]: isActive,
              })}
              to="Signin"
            >
              Войти
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => classNames({ [headerStyles.activLink]: isActive })}
              to="/signup"
            >
              {token ? '' : 'Регистрация'}
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => classNames({ [headerStyles.activLink]: isActive })}
              to="/products"
            >
              {token ? 'Каталог' : ''}
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>

  )
}
export const HeaderMemo = memo(Header)
