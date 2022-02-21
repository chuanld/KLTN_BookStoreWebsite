import { SavedSearch } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'

import './sidebarwidget.css'
// import QC1 from "./images/QC1.jpg";
import QC2 from './images/QC2.png'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import categoryApi from 'api/categoryApi'
import ProTypes from 'prop-types'
import { useHistory, useLocation } from 'react-router-dom'
const queryString = require('query-string')

SidebarWidget.propTypes = {
  onSubmit: ProTypes.func,
}
SidebarWidget.defaultProps = {
  onSubmit: null,
}

export default function SidebarWidget(props) {
  const { params, onSubmit, hisSearch, totalResult } = props
  const history = useHistory()
  const location = useLocation()
  const [categories, setCategories] = useState([])
  const [categoryActive, setCategoryActive] = useState('')

  //const [result] = state.productsApi.result;

  const [startPrice, setStartPrice] = useState()
  const [endPrice, setEndPrice] = useState()
  const [showResult, setShowResult] = useState(false)
  // const [hisSearch, setHisSearch] = useState(() => {
  //   const initHisSearch = JSON.parse(localStorage.getItem('hisSearch')) || [
  //     'Em',
  //     'Nhà Giả Kim',
  //     'Tâm Hồn',
  //     'Tình Yêu',
  //     'Tuổi Trẻ',
  //     'Hoá Học',
  //   ]
  //   return initHisSearch
  // })

  useEffect(() => {
    const getCate = async () => {
      try {
        const res = await categoryApi.getCategories()
        setCategories(res)
      } catch (err) {}
    }
    getCate()
  }, [])
  useEffect(() => {
    const categoryURL = params.category
    setCategoryActive(categoryURL)
  }, [params.category])

  // useEffect(() => {
  //   const newHisSearch = [...hisSearch]
  //   newHisSearch.unshift(search && search !== ' ' ? search : null)
  //   const rmMultiSearch = Array.from(new Set(newHisSearch))
  //   setHisSearch(rmMultiSearch)
  //   localStorage.setItem('hisSearch', JSON.stringify(rmMultiSearch))
  // }, [hisSearch, search])

  // hisSearch.unshift(search && search !== ' ' ? search : null)
  // function unique(arr) {
  //   return Array.from(new Set(arr)) //
  // }

  // const add = unique(hisSearch)
  // console.log(add)

  const initialState = {
    minPrice: params['price[gte]'] ? params['price[gte]'] : 0,
    maxPrice: params['price[gte]'] ? params['price[lte]'] : '',
  }
  const [filterPrice, setFilterPrice] = useState(initialState)

  const handleChangeInput = (e) => {
    const { name, value } = e.target
    setFilterPrice({ ...filterPrice, [name]: value })
  }

  const SelectCategory = (name) => {
    // setCategory(name);
    // setPage(1)
    // setSearch('')

    if (location.pathname + location.search === `/product?category=${name}`)
      return
    if (!name) {
      const newParams = { ...params }
      delete newParams['category']
      delete newParams['title[regex]']
      onSubmit(newParams)
      return
    }
    if (!params['category']) {
      const newParams = { ...params, category: name }
      onSubmit(newParams)
    }
    if (params['category']) {
      const newParams = { ...params }
      newParams['category'] = name
      onSubmit(newParams)
    }
  }
  const submitPrice = (e) => {
    e.preventDefault()
    if (!filterPrice.maxPrice) return toast.warning('Max price must have valid')
    if (filterPrice.maxPrice < filterPrice.minPrice)
      return toast.warning('Max price must above Min price')
    if (filterPrice.maxPrice <= 0 || filterPrice.minPrice < 0)
      return toast.warning('Value must be positive')
    setShowResult(true)
    setStartPrice(filterPrice.minPrice)
    setEndPrice(filterPrice.maxPrice)
    const newParams = {
      ...params,
      'price[gte]': filterPrice.minPrice,
      'price[lte]': filterPrice.maxPrice,
    }
    onSubmit(newParams)
  }
  const cancelFilter = (e) => {
    if (!params['price[gte]'] || !params['price[lte]']) return
    setShowResult(false)
    setFilterPrice(initialState)
    const newParams = { ...params }
    delete newParams['price[gte]']
    delete newParams['price[lte]']
    onSubmit({ ...newParams })
    setStartPrice(0)
    setEndPrice(1e3)
  }
  const quickFilter = (start, end) => {
    setShowResult(true)
    if (!params['price[gte]'] && !params['price[lte]']) {
      const newParams = { ...params }
      onSubmit({ ...newParams, 'price[gte]': start, 'price[lte]': end })
      return
    }
    if (!params['price[gte]']) {
      const newParams = { ...params }
      newParams['price[lte]'] = end
      onSubmit({ ...newParams, 'price[gte]': start })
      return
    }
    if (!params['price[lte]']) {
      const newParams = { ...params }
      newParams['price[gte]'] = start
      onSubmit({ ...newParams, 'price[lte]': end })
      return
    }
    const newParams = { ...params }
    newParams['price[gte]'] = start
    newParams['price[lte]'] = end
    onSubmit({ ...newParams })
  }
  const setSearchInHis = (para) => {
    if (!para) return
    if (params['title[regex]'] === para) return
    if (params['title[regex]']) {
      const newParams = { ...params }
      newParams['title[regex]'] = para
      onSubmit({ ...newParams })
      return
    }
    const newParams = { ...params }
    onSubmit({ ...newParams, 'title[regex]': para })
  }
  return (
    <div className='sidebar_widget'>
      <div className='widget_inner'>
        <div className='widget_list widget_categories'>
          <h3>Categories</h3>
          <ul>
            <li
              className={
                !categoryActive
                  ? 'widget_sub_categories sub_categories1 active'
                  : 'widget_sub_categories sub_categories1 '
              }
              onClick={() => SelectCategory('')}
            >
              <span>All categories</span>
            </li>
            {categories.map((category) => (
              <li
                className={
                  category.name === categoryActive
                    ? 'widget_sub_categories sub_categories1 active'
                    : 'widget_sub_categories sub_categories1'
                }
                key={category._id}
                onClick={() => SelectCategory(category.name)}
              >
                <span>{category.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className='widget_list widget_prices'>
          <h3>Filter</h3>
          <form onSubmit={submitPrice}>
            <div className='filter-prices'>
              <span>Prices: </span>
              <input
                type='number'
                name='minPrice'
                placeholder='Min price'
                value={filterPrice.minPrice}
                onChange={handleChangeInput}
              />
              <span>~</span>
              <input
                type='number'
                name='maxPrice'
                placeholder='Max price'
                value={filterPrice.maxPrice}
                onChange={handleChangeInput}
              />
            </div>
            <div className='filter_result'>
              <button type='submit'>Filter</button>
              {showResult ? (
                <div>
                  <span>Result({totalResult})</span>
                  <span>
                    ${params['price[gte]']} ~ ${params['price[lte]']}
                  </span>
                </div>
              ) : (
                <i>
                  <span>Input filter here</span>
                </i>
              )}
            </div>
          </form>
          <ul>
            <li
              className={showResult ? 'hint-prices active' : 'hint-prices'}
              onClick={cancelFilter}
            >
              None limit
            </li>
            <li
              className={
                params['price[gte]'] === '1' && params['price[lte]'] === '50'
                  ? 'hint-prices active'
                  : 'hint-prices'
              }
              onClick={() => quickFilter(1, 50)}
            >
              $1.00 ~ $50.00
            </li>
            <li
              className={
                params['price[gte]'] === '100' && params['price[lte]'] === '200'
                  ? 'hint-prices active'
                  : 'hint-prices'
              }
              onClick={() => quickFilter(100, 200)}
            >
              $100.00 ~ $200.00
            </li>
            <li
              className={
                params['price[gte]'] === '200' && params['price[lte]'] === '500'
                  ? 'hint-prices active'
                  : 'hint-prices'
              }
              onClick={() => quickFilter(200, 500)}
            >
              $200.00 ~ $500.00
            </li>
          </ul>
        </div>
        <div className='widget_list widget_trends'>
          <img src={QC2} alt='' />
        </div>
        <div className='widget_list widget_tags'>
          <h3>
            <SavedSearch />
            Search Tag
          </h3>
          <div className='hint-search'>
            {hisSearch.map((history) =>
              history ? (
                <button
                  className='hint-search-btn'
                  onClick={() => setSearchInHis(`${history}`)}
                  key={hisSearch.indexOf(history)}
                >
                  {history}
                </button>
              ) : null
            )}
          </div>
        </div>
        <div className='widget_list'></div>
      </div>
    </div>
  )
}
