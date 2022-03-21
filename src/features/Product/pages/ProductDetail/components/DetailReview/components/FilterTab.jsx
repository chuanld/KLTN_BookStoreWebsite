import { Check, StarBorder } from '@mui/icons-material'
import { Rating } from '@mui/material'
import React from 'react'

function FilterTab(props) {
  const { params, onSubmit } = props

  const handleFilterDate = (value) => {
    if (!onSubmit) return
    if (!value) {
      const newParams = { ...params }
      delete newParams['sort']
      onSubmit({ ...newParams })
      return
    }
    if (params['sort'] === value) return
    onSubmit({ ...params, sort: value })
  }
  const handleFilterRate = (value) => {
    if (!onSubmit) return
    if (!value) {
      const newParams = { ...params }
      delete newParams['rating']
      onSubmit({ ...newParams })
      return
    }
    if (params['rating'] === value) {
      const newParams = { ...params }
      delete newParams['rating']
      onSubmit({ ...newParams })
      return
    }
    onSubmit({ ...params, rating: value })
  }
  return (
    <>
      <div className='filter-review'>
        <div className='filter-review__label'>Lọc xem theo :</div>
        <div className='filter-review__inner'>
          <div
            className={
              !params['sort']
                ? 'filter-review__item active'
                : 'filter-review__item'
            }
            onClick={() => handleFilterDate()}
          >
            <span className='filter-review__check'>
              <Check />
            </span>
            <span className='filter-review__text'>Mới nhất</span>
          </div>
          <div
            className={
              params['sort'] === 'createdAt'
                ? 'filter-review__item active'
                : 'filter-review__item'
            }
            onClick={() => handleFilterDate('createdAt')}
          >
            <span className='filter-review__check'>
              <Check />
            </span>
            <span className='filter-review__text'>Cũ nhất</span>
          </div>
          <div
            className={
              params['sort'] === '-rating'
                ? 'filter-review__item active'
                : 'filter-review__item'
            }
            onClick={() => handleFilterDate('-rating')}
          >
            <span className='filter-review__check'>
              <Check />
            </span>
            <span className='filter-review__text'>Đánh giá</span>
          </div>
          <div
            className={
              params['rating'] === '1'
                ? 'filter-review__item active'
                : 'filter-review__item'
            }
            onClick={() => handleFilterRate('1')}
          >
            <span className='filter-review__check'>
              <Check />
            </span>
            <span className='filter-review__text'>1</span>
            <span>
              <StarBorder />
            </span>
          </div>
          <div
            className={
              params['rating'] === '2'
                ? 'filter-review__item active'
                : 'filter-review__item'
            }
            onClick={() => handleFilterRate('2')}
          >
            <span className='filter-review__check'>
              <Check />
            </span>
            <span className='filter-review__text'>2</span>
            <span>
              <StarBorder />
            </span>
          </div>
          <div
            className={
              params['rating'] === '3'
                ? 'filter-review__item active'
                : 'filter-review__item'
            }
            onClick={() => handleFilterRate('3')}
          >
            <span className='filter-review__check'>
              <Check />
            </span>
            <span className='filter-review__text'>3</span>
            <span>
              <StarBorder />
            </span>
          </div>
          <div
            className={
              params['rating'] === '4'
                ? 'filter-review__item active'
                : 'filter-review__item'
            }
            onClick={() => handleFilterRate('4')}
          >
            <span className='filter-review__check'>
              <Check />
            </span>
            <span className='filter-review__text'>4</span>
            <span>
              <StarBorder />
            </span>
          </div>
          <div
            className={
              params['rating'] === '5'
                ? 'filter-review__item active'
                : 'filter-review__item'
            }
            onClick={() => handleFilterRate('5')}
          >
            <span className='filter-review__check'>
              <Check size='small' />
            </span>
            <span className='filter-review__text'>5</span>
            <span>
              <StarBorder />
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default FilterTab
