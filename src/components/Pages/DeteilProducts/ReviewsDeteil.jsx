/* eslint-disable max-len */
import classNames from 'classnames'

import tableStyle from './tableStyle.module.css'

export function ReviewsDeteil({
  text, rating, author,
}) {
  return (
    <div className="d-flex flex-derection-column" style={{ position: 'relative' }}>
      <table style={{
        width: '100%',
      }}
      >
        <tbody>
          <tr style={{ width: '80%', paddingBottom: '20px' }}>
            <td className="px-2">
              Автор:
              <span style={{ fontWeight: 'bold' }}>{author}</span>
            </td>
            <td>
              {/* Рейтинг: */}
              <i className={classNames('fa-solid fa-star')} />
              {rating}
              {/* <span style={{ fontWeight: 'bold' }}>{rating}</span> */}
            </td>
          </tr>
          <tr style={{ width: '20%' }} className={tableStyle.spaceUnder}>
            <td className="px-2">
              Отзыв:
              <span style={{ fontWeight: 'bold' }}>{text}</span>
            </td>
          </tr>

        </tbody>

      </table>
    </div>

  )
}
