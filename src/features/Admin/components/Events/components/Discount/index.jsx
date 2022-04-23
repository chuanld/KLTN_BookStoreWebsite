import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import adminApi from 'api/adminApi'
import categoryApi from 'api/categoryApi'
import productApi from 'api/productApi'

import React, { useState, useEffect, useMemo } from 'react'
import { useLocation, useHistory, useRouteMatch } from 'react-router-dom'
import DataTableDiscount from './components/DataTableDiscount'
import FilterTabDiscount from './components/FilterTabDiscount'
const queryString = require('query-string')

const initialize = {
  discOption: 'discount-all',
  discOption1: '',
  discPercent: 0,
}
function Discount() {
  const location = useLocation()
  const history = useHistory()
  const { path } = useRouteMatch()
  const [values, setValues] = useState(initialize)
  const [categories, setCategories] = useState([])
  const [authors, setAuthors] = useState([])
  const [products, setProducts] = useState([])
  const [isChecked, setIsChecked] = useState(false)
  const [loadingTable, setLoadingTable] = useState(false)

  //Filter
  const [, setPage] = useState()
  const [totalPage, setTotalPage] = useState()
  const [result, setResult] = useState()
  const [totalResult, setTotalResult] = useState()
  //getQueryParams
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search)
    console.log(params, 'queryParams Discount Admin')
    return {
      ...params,
    }
  }, [location.search])
  //Filter Changes
  const handleFilterChange = (values) => {
    console.log(values, 'filterValues Product Admin')
    const filters = {
      ...values,
    }
    if (filters['title[regex]'] === ' ') {
      delete filters['title[regex]']
    }

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    })
  }

  const handleOptionDiscount = (e) => {
    console.log(e.target.value)
    setValues({ ...values, discOption: e.target.value })
  }
  const handleOptionDiscountCategory = (e) => {
    console.log(e.target.value)
    setValues({ ...values, discOption1: e.target.value })
  }
  const handleOptionDiscountAuthor = (e) => {
    console.log(e.target.value)
    setValues({ ...values, discOption1: e.target.value })
    setIsChecked(false)
  }
  const handleOptionDiscountPercent = (e) => {
    console.log(e.target.value)
    setValues({ ...values, discPercent: e.target.value })
  }

  const getCategories = async () => {
    try {
      const res = await categoryApi.getCategories(queryParams)

      setCategories(res)
    } catch (err) {}
  }
  const getProducts = async () => {
    try {
      setLoadingTable(true)
      const res = await productApi.getProducts()
      setProducts(res.products)
    } catch (err) {}
    setLoadingTable(false)
  }
  const getAuthors = async () => {
    try {
      const res = await adminApi.getAllProducts()

      let authors = []
      //   authors = res.allproducts.reduce((uniq, item) => {
      //     return uniq.includes(item.author) ? uniq : [...uniq, item.author]
      //   })
      authors = res.allproducts.reduce((unique, item) => {
        return unique.includes(item.author) ? unique : [...unique, item.author]
      }, [])
      setAuthors(authors)
    } catch (err) {}
  }
  useEffect(() => {
    getProducts()
    if (values.discOption === 'discount-category') {
      getCategories()
    }
    if (values.discOption === 'discount-author') {
      getAuthors()
    }
  }, [values.discOption])

  const checkAuthor = () => {
    if (authors.length === 0) return
    if (!values.discOption1) return
    if (authors.includes(values.discOption1)) {
      setIsChecked(true)
      return
    }
    console.log('sai')
  }
  const onSubmitDiscount = async () => {
    if (!values.discOption || values.discPercent < 0) return
    if (values.discOption === 'discount-all') {
      const formValues = {
        action: values.discOption,
        discount: values.discPercent,
      }
      try {
        const res = await adminApi.eventDiscount(formValues)
        console.log(res.msg)
      } catch (err) {
        console.log(err.response)
      }

      return
    }
    if (values.discOption === 'discount-author') {
      if (!isChecked) return
      const formValues = {
        action: values.discOption,
        author: values.discOption1,
        discount: values.discPercent,
      }
      try {
        const res = await adminApi.eventDiscount(formValues)
        console.log(res.msg)
      } catch (err) {
        console.log(err.response)
      }
      return
    }
    if (values.discOption === 'discount-category') {
      if (values.discOption1 === '') return
      const formValues = {
        action: values.discOption,
        category: values.discOption1,
        discount: values.discPercent,
      }
      try {
        const res = await adminApi.eventDiscount(formValues)
        console.log(res.msg)
      } catch (err) {
        console.log(err.response)
      }
      return
    }
  }
  return (
    <div className='discount'>
      <div className='discount-heading'>
        <div className='discount-heading-container'>
          <div className='discount_option'>
            <FormControl sx={{ m: 0, width: 700, marginTop: 1 }}>
              <InputLabel id='option-discount'>Select option</InputLabel>
              <Select
                color={'success'}
                name='option-discount'
                labelId='option-discoun'
                label='option-discoun'
                // placeholder={placeholder}
                //   onBlur={onBlur}
                onChange={handleOptionDiscount}
                defaulvalue={values.discOption}
                value={values.discOption}
                style={{ height: '40px', width: '250px' }}
              >
                <MenuItem value={'discount-all'}>Tat Ca Sach</MenuItem>
                <MenuItem value={'discount-category'}>
                  Theo Danh Muc Sach
                </MenuItem>
                <MenuItem value={'discount-author'}>Theo Tac Gia Sach</MenuItem>
              </Select>
            </FormControl>
          </div>
          {values.discOption === 'discount-category' &&
            categories.length !== 0 && (
              <div className='discount_option'>
                <FormControl sx={{ m: 0, width: 700, marginTop: 1 }}>
                  <InputLabel id='option-discount'>Select Category</InputLabel>
                  <Select
                    color={'success'}
                    name='option-discount'
                    labelId='option-discount'
                    label='option-discount'
                    // placeholder={placeholder}
                    //   onBlur={onBlur}
                    onChange={handleOptionDiscountCategory}
                    defaulvalue={values.discOption1}
                    value={values.discOption1}
                    disabled={values.discOption1 === 'discount-all'}
                    style={{ height: '40px', width: '250px' }}
                  >
                    {/* <MenuItem value=''></MenuItem> */}
                    {categories.map((category) => (
                      <MenuItem value={category.name} key={category._id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            )}
          {values.discOption === 'discount-author' && (
            <div className='discount_option search_author'>
              <TextField
                color={'success'}
                name='discount-author'
                label='Select Author'
                placeholder='Input author search'
                onChange={handleOptionDiscountAuthor}
                value={values.discOption1}
                // disabled={disable}
                // error={invalid}
                // helperText={error?.message}
                // sx={{ height: height, width: width }}
                margin='dense'
              />
              <button
                onClick={() => checkAuthor()}
                className={
                  isChecked
                    ? 'author-button-check checked'
                    : 'author-button-check'
                }
              >
                Check
              </button>
            </div>
          )}
          <div className='discount_option discount_percent'>
            <TextField
              color={'success'}
              name='discount-percent'
              label='Discount Percent'
              type='Number'
              placeholder='Input author search'
              onChange={handleOptionDiscountPercent}
              value={values.discPercent}
              // disabled={disable}
              // error={invalid}
              // helperText={error?.message}
              // sx={{ height: height, width: width }}
              margin='dense'
            />
            <div className='discount_option discount_percent'>
              <button onClick={() => onSubmitDiscount()}>Verify</button>
            </div>
          </div>
        </div>
      </div>
      <div className='userList_toolbar_wrapper'>
        <FilterTabDiscount params={queryParams} onSubmit={handleFilterChange} />
      </div>
      <div className='discount-content'>
        <div className='discount-content_table'>
          <DataTableDiscount products={products} loadingTable={loadingTable} />
        </div>
        <div className='discount-content_edit'>
          <div className='discount-content-form'></div>
        </div>
      </div>
    </div>
  )
}

export default Discount
