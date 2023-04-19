/* eslint-disable linebreak-style */
import { memo } from 'react'
import { Link } from 'react-router-dom'
import mainStyles from './main.module.css'
import { Footer } from '../Footer/Footer'

function Main() {
  return (
    <div className={mainStyles.wr}>
      <div className={mainStyles.wr__text}>DogFood</div>
      Магазин питания
      <br />
      для собак
      <Link to="/products">
        <h5>Перейти к покупкам</h5>
      </Link>
      <Footer />
    </div>
  )
}

export const MainMemo = memo(Main)
