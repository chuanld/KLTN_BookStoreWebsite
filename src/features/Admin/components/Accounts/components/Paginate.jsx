import React, { useState, useEffect } from 'react'
import { Pagination } from '@mui/material'

function Paginate(props) {
  const { totalPage, onSubmit, params } = props

  const [pageCurrent, setPageCurrent] = useState(1)

  useEffect(() => {
    if (params.page < 1 || !params.page) {
      setPageCurrent(1)
    } else {
      setPageCurrent(parseInt(params.page))
    }
  }, [params.page])
  const handlePageChange = (event, value) => {
    if (!onSubmit) return
    const newParams = { ...params }
    onSubmit({ ...newParams, page: value })
  }
  return (
    <div className='pagination'>
      <Pagination
        count={totalPage}
        page={pageCurrent}
        color='primary'
        shape='rounded'
        onChange={handlePageChange}
      />
    </div>
  )
}

export default Paginate
