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
      delete newParams['role[eq]'] || delete newParams['role[gte]']
      onSubmit({ ...newParams })
      return
    }
    console.log(value)
    if (value === '-1') {
      if (params['role[gte]'] === value) {
        return
      }
      if (params['role[eq]'] || !params['role[gte]']) {
        const newParams = { ...params }
        delete newParams['role[eq]']
        onSubmit({ ...newParams, 'role[gte]': value })
        return
      }
    }
    if (params['role[eq]'] === value) {
      return
    } else {
      if (params['role[gte]']) {
        const newParams = { ...params }
        delete newParams['role[gte]']
        onSubmit({ ...newParams, 'role[eq]': value })
        return
      }
      onSubmit({ ...params, 'role[eq]': value })
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
          name='Role'
          value={
            params['role[eq]'] === '0' ? 0 : params['role[eq]'] === '1' ? 1 : -1
          }
          onChange={(e) => handleFilterRole(e.target.value)}
        >
          <option value={-1}>All Account</option>
          <option value={0}>User Account</option>
          <option value={1}>Admin Account</option>
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
          <option value={12}>x12</option>
          <option value={9}>x9</option>
          <option value={6}>x6</option>
        </select>
      </div>
      <div className='sort_select'>
        <span>Sort By: </span>
        <select
          value={params['sort'] ? params['sort'] : ''}
          onChange={(e) => handleSortSelect(e.target.value)}
        >
          <option value=''>Date ⩣</option>
          <option value='oldest'>Date ⩠</option>
          <option value='-role'>Role ⩣</option>
          <option value='role'>Role ⩠</option>
        </select>
      </div>
    </>
  )
}

export default FilterTab
