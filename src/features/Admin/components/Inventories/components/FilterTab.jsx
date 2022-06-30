import React, { useState, useRef, useEffect } from 'react'
import { Search } from '@mui/icons-material'

import dayjs from 'dayjs'
import FormDate from './FormDate'

function FilterTab(props) {
  const { params, onSubmit } = props
  const [searchProduct, setSearchProduct] = useState('')
  const typingProductTimeOutRef = useRef(null)
  const [searchAccount, setSearchAccount] = useState('')
  const typingAccountTimeOutRef = useRef(null)

  const [start, setStart] = useState('2020-10-22')
  const [end, setEnd] = useState(dayjs().format('YYYY-MM-DD'))

  //search
  const handleSearchChange = (e) => {
    // if (e.target.value) {
    const strFind = e.target.value.trim()
    setSearchProduct(e.target.value)

    if (typingProductTimeOutRef.current) {
      clearTimeout(typingProductTimeOutRef.current)
    }
    typingProductTimeOutRef.current = setTimeout(() => {
      if (!strFind || strFind === ' ') {
        if (params['productId[regex]']) {
          const newParams = { ...params }
          delete newParams['title[regex]']
          onSubmit({ ...newParams })
          return
        }
        return
      }
      if (!params['productId[regex]']) {
        const formValues = {
          ...params,
          'productId[regex]': strFind,
        }
        onSubmit(formValues)
        return
      } else {
        const formValues = { ...params }
        onSubmit({ ...formValues, 'productId[regex]': strFind })
        return
      }
    }, 1500)
    // }
  }

  //limit
  const handleFilterLimit = (value) => {
    if (!onSubmit) return
    if (!value) {
      const newParams = { ...params }
      delete newParams['limit']
      onSubmit({ ...newParams })
      return
    }
    if (params['limit'] === value) {
      return
    }
    const newParams = { ...params }
    onSubmit({ ...newParams, limit: value })
  }

  //sort
  const handleSortSelect = (value) => {
    if (!onSubmit) return
    if (!value) {
      const newParams = { ...params }
      delete newParams['sort']
      onSubmit({ ...newParams })
      return
    }
    if (params['sort'] === value) {
      return
    } else {
      onSubmit({ ...params, sort: value })
    }
  }

  const handleSubmitTimeFilter = (values) => {
    if (!onSubmit) return
    if (!values) return
    const { analyStart, analyEnd } = values
    if (!params['createdAt[gte]'] && !params['createdAt[lte]']) {
      const newParams = { ...params }
      onSubmit({
        ...newParams,
        'createdAt[gte]': analyStart,
        'createdAt[lte]': analyEnd,
      })
      return
    }
    if (!params['createdAt[gte]']) {
      const newParams = { ...params }
      newParams['createdAt[lte]'] = analyEnd
      onSubmit({ ...newParams, 'createdAt[gte]': analyStart })
      return
    }
    if (!params['createdAt[lte]']) {
      const newParams = { ...params }
      newParams['createdAt[gte]'] = analyStart
      onSubmit({ ...newParams, 'createdAt[lte]': analyEnd })
      return
    }
    const newParams = { ...params }
    newParams['createdAt[gte]'] = analyStart
    newParams['createdAt[lte]'] = analyEnd
    onSubmit({ ...newParams })

    // priceCalculateTotalMeMo(data);
  }
  return (
    <>
      <div className="filter-date-inventory">
        <FormDate
          from={start}
          to={end}
          onSubmit={handleSubmitTimeFilter}
          params={params}
          // loading={loading}
        />
      </div>

      <div className="search_input">
        {/* <span>Tools</span> */}
        <Search />
        <input
          type="text"
          value={searchProduct}
          placeholder="Enter your search!"
          onChange={(e) => handleSearchChange(e)}
        />
      </div>
      <div className="select_output">
        <span>Open: </span>
        <select
          value={params['limit'] ? params['limit'] : 9}
          onChange={(e) => handleFilterLimit(e.target.value)}
        >
          <option value={12}>x12</option>
          <option value={9}>x9</option>
          <option value={6}>x6</option>
        </select>
      </div>
      <div className="sort_select">
        <span>Sort By: </span>
        <select
          value={params['sort'] ? params['sort'] : ''}
          onChange={(e) => handleSortSelect(e.target.value)}
        >
          <option value="">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="productStock">Ascending</option>
          <option value="-productStock">Descending</option>
        </select>
      </div>
    </>
  )
}

export default FilterTab
