import React, { useState, useRef, useEffect } from 'react'
import { Search } from '@mui/icons-material'
import categoryApi from 'api/categoryApi'

function FilterTab(props) {
  const { params, onSubmit } = props
  const [searchFT, setSearchFT] = useState('')
  const [categories, setCategories] = useState([])

  const typingTimeOutRef = useRef(null)
  const getCategories = async () => {
    try {
      const res = await categoryApi.getCategories()
      setCategories(res)
    } catch (err) {}
  }
  useEffect(() => {
    getCategories()
  }, [])
  const handleFilterCategories = (value) => {
    if (!onSubmit) return
    if (!value || value === '') {
      const newParams = { ...params }
      delete newParams['category']
      onSubmit({ ...newParams })
      return
    }
    if (!params['category']) {
      const newParams = { ...params }
      onSubmit({ ...newParams, category: value })
      return
    }
    if (params['category'] === value) {
      return
    }
    const newParams = { ...params }
    newParams['category'] = value
    onSubmit({ ...newParams })
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
        if (params['title[regex]']) {
          const newParams = { ...params }
          delete newParams['title[regex]']
          onSubmit({ ...newParams })
          return
        }
        return
      }
      if (!params['title[regex]']) {
        const formValues = {
          ...params,
          'title[regex]': strFind,
        }
        onSubmit(formValues)
        return
      } else {
        const formValues = { ...params }
        onSubmit({ ...formValues, 'title[regex]': strFind })
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
          name='categories'
          value={params['category'] ? params['category'] : ''}
          onChange={(e) => handleFilterCategories(e.target.value)}
        >
          <option value=''>All Categories</option>
          {categories.map((category) => (
            <option value={category.name} key={category._id}>
              {category.name}
            </option>
          ))}
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
          <option value=''>Newest</option>
          <option value='oldest'>Oldest</option>
          <option value='-sold'>Best Seller</option>
          <option value='-price'>Price: Hight-Low</option>
          <option value='price'>Price: Low-Hight</option>
        </select>
      </div>
    </>
  )
}

export default FilterTab
