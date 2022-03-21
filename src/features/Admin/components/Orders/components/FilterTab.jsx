import React, { useState, useRef } from 'react'
import { Search } from '@mui/icons-material'

function FilterTab(props) {
  const { params, onSubmit } = props
  const [searchFT, setSearchFT] = useState('')
  const typingTimeOutRef = useRef(null)

  const handleFilterRole = (value) => {
    if (!onSubmit) return
    if (!value) {
      const newParams = { ...params }
      delete newParams['status[eq]'] || delete newParams['status[gte]']
      onSubmit({ ...newParams })
      return
    }
    console.log(value)
    if (value === '-1') {
      if (params['status[gte]'] === value) {
        return
      }
      if (params['status[eq]'] || !params['status[gte]']) {
        const newParams = { ...params }
        delete newParams['status[eq]']
        onSubmit({ ...newParams, 'status[gte]': value })
        return
      }
    }
    if (params['status[eq]'] === value) {
      return
    } else {
      if (params['status[gte]']) {
        const newParams = { ...params }
        delete newParams['status[gte]']
        onSubmit({ ...newParams, 'status[eq]': value })
        return
      }
      onSubmit({ ...params, 'status[eq]': value })
    }
  }

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
  const handleSearchChange = (e) => {
    // if (e.target.value) {
    const strFind = e.target.value.trim()
    setSearchFT(e.target.value)

    if (typingTimeOutRef.current) {
      clearTimeout(typingTimeOutRef.current)
    }

    typingTimeOutRef.current = setTimeout(() => {
      if (!strFind || strFind === ' ') {
        if (params['email[regex]']) {
          const newParams = { ...params }
          delete newParams['email[regex]']
          onSubmit({ ...newParams })
          return
        }
        return
      }
      if (!params['email[regex]']) {
        const formValues = {
          ...params,
          'email[regex]': strFind,
        }
        onSubmit(formValues)
        return
      } else {
        const formValues = { ...params }

        onSubmit({ ...formValues, 'email[regex]': strFind })
        return
      }
    }, 1500)
    // }
  }

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
  return (
    <>
      <div className='select_account'>
        <span>Filters: </span>

        <select
          name='status'
          value={
            params['status[eq]'] === '0'
              ? 0
              : params['role[eq]'] === '1'
              ? 1
              : params['role[eq]'] === '2'
              ? 2
              : params['role[eq]'] === '3'
              ? 3
              : params['role[eq]'] === '4'
              ? 4
              : params['role[eq]'] === '5'
              ? 5
              : -1
          }
          onChange={(e) => handleFilterRole(e.target.value)}
        >
          <option value={-1}>All Orders</option>
          <option value={0}>Chờ xác nhận</option>
          <option value={1}>Đã huỷ</option>
          <option value={2}>Đã xác nhận</option>
          <option value={3}>Tạm hoãn</option>
          <option value={4}>Đã giao hàng</option>
          <option value={5}>Đã thanh toán</option>
        </select>
      </div>
      <div className='search_input'>
        {/* <span>Tools</span> */}
        <Search />
        <input
          type='text'
          value={searchFT}
          placeholder='Enter your search!'
          onChange={(e) => handleSearchChange(e)}
        />
      </div>
      <div className='select_output'>
        <span>Open: </span>
        <select
          value={params['limit'] ? params['limit'] : 9}
          onChange={(e) => handleFilterLimit(e.target.value)}
        >
          <option value={9}>x9</option>
          <option value={12}>x12</option>
          <option value={20}>x20</option>
        </select>
      </div>
      <div className='sort_select'>
        <span>Sort By: </span>
        <select
          value={params['sort'] ? params['sort'] : ''}
          onChange={(e) => handleSortSelect(e.target.value)}
        >
          <option value=''>Lasted</option>
          <option value='sort=oldest'>Oldest</option>
          <option value='sort=email'>Best Seller</option>
        </select>
      </div>
    </>
  )
}

export default FilterTab
