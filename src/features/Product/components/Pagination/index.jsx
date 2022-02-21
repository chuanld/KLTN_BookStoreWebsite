import { Pagination } from '@mui/material'
import React, { useEffect, useState } from 'react'

import './loadmore.css'

export default function Paginate(props) {
  const { countPage, onSubmit, params } = props

  const [pageCurrent, setPageCurrent] = useState(1)
  useEffect(() => {
    if (params.page < 1 || !params.page) {
      setPageCurrent(1)
    } else {
      setPageCurrent(parseInt(params.page))
    }
  }, [params.page])

  const scrollToTop = () => {
    window.scrollTo({
      top: 587,
      behavior: 'smooth',
    })
  }
  const handlePageChange = (event, value) => {
    scrollToTop()
    const newParams = { ...params }
    onSubmit({ ...newParams, page: value })
  }
  return (
    <>
      <div className='load_more'>
        <div className='pagination'>
          <Pagination
            count={countPage}
            siblingCount={2}
            boundaryCount={2}
            color='primary'
            shape='rounded'
            page={pageCurrent}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </>
  )
}
