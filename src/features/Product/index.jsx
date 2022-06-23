import productApi from 'api/productApi'
import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import BannerProduct from './components/Banner/BannerProduct'
import Filters from './components/Filter'
import Paginate from './components/Pagination'
import ProductList from './components/ProductList'
import SidebarWidget from './components/SidebarWidget'
import withLoading from '../../components/HOC/withLoading'
import ProductSkeleton from './components/ProductSkeleton'
import Breadcrumb from 'components/Breadcrumbs'
import BannerSlide from 'components/BannerSlide'
import Footer from 'components/Footer'

const queryString = require('query-string')
/*Note queryString: obj{
    limit,  page, category, sort, title[regex], price[gte], price[lte]
}
End note */
function Product({ showLoading, hideLoading }) {
  const location = useLocation()
  const history = useHistory()
  const [products, setProducts] = useState([])

  const [page, setPage] = useState()
  const [totalPage, setTotalPage] = useState()
  const [result, setResult] = useState()
  const [totalResult, setTotalResult] = useState()
  const [loadingSkt, setLoadingSkt] = useState(false)

  const [hisSearch, setHisSearch] = useState(() => {
    const initHisSearch = JSON.parse(localStorage.getItem('hisSearch')) || [
      'Em',
      'Nhà Giả Kim',
      'Tâm Hồn',
      'Tình Yêu',
      'Tuổi Trẻ',
      'Hoá Học',
    ]
    return initHisSearch
  })

  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search)
    // if (params['title[regex]'] && products.length === 0) {
    //   const newParams = { ...params }
    //   const value = params['title[regex]']
    //   delete newParams['title[regex]']
    //   const newParams1 = { ...newParams, 'author[regex]': value }
    //   history.push({
    //     pathname: history.location.pathname,
    //     search: queryString.stringify(newParams1),
    //   })

    //   return { ...newParams1 }
    // }

    console.log(params, 'queryParams')
    return {
      ...params,
    }
  }, [location.search])

  const getProduct = useCallback(async () => {
    setLoadingSkt(true)
    showLoading()
    try {
      const res = await productApi.getProducts(queryParams)
      setProducts(res.products)
      setPage(res.page)
      setResult(res.result)
      setTotalResult(res.totalResult)
      setTotalPage(Math.ceil(res.totalResult / 9))
      console.log(res, 'res')
      if (
        queryParams['title[regex]'] &&
        queryParams['title[regex]'] !== ' ' &&
        res.products.length !== 0
      ) {
        const newHisSearch = [...hisSearch]
        newHisSearch.unshift(queryParams['title[regex]'])
        const rmMultiSearch = Array.from(new Set(newHisSearch))
        setHisSearch(rmMultiSearch)
        localStorage.setItem('hisSearch', JSON.stringify(rmMultiSearch))
      }
    } catch (err) {}
    hideLoading()
    setLoadingSkt(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams])

  useEffect(() => {
    getProduct()
    // getMoreProduct()
  }, [queryParams, getProduct])

  // useEffect(() => {
  //   if (queryParams['title[regex]'] && products.length === 0) {
  //     const newQueryParams = { ...queryParams }
  //     const value = queryParams['title[regex]']
  //     delete newQueryParams['title[regex]']
  //     queryParams({ ...newQueryParams, 'author[regex]': value })
  //     return
  //   }
  // }, [queryParams])

  const handleFilterChanges = (values) => {
    console.log(values, 'filterChange')
    const filters = {
      ...values,
    }
    // if (filters['title[regex]'] && filters['title[regex]'] !== ' ') {
    //   const newHisSearch = [...hisSearch]
    //   newHisSearch.unshift(filters['title[regex]'])
    //   const rmMultiSearch = Array.from(new Set(newHisSearch))
    //   setHisSearch(rmMultiSearch)
    //   localStorage.setItem('hisSearch', JSON.stringify(rmMultiSearch))
    // } else {
    //   delete filters['title[regex]']
    // }
    if (!filters['title[regex]'] || filters['title[regex]'] === ' ') {
      delete filters['title[regex]']
    }

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    })
  }

  return (
    <>
      <BannerSlide />
      <Breadcrumb />

      <div className="shop_area shop_reverse mt-100 mb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-12">
              <SidebarWidget
                totalResult={totalResult}
                params={queryParams}
                onSubmit={handleFilterChanges}
                hisSearch={hisSearch}
              />
            </div>
            <div className="col-lg-9 col-md-12">
              <Filters params={queryParams} onSubmit={handleFilterChanges} />
              {loadingSkt ? (
                <div className="products">
                  {new Array(9).fill(undefined).map((item, index) => (
                    <ProductSkeleton key={index} />
                  ))}
                </div>
              ) : (
                <ProductList products={products} />
              )}

              <Paginate
                params={queryParams}
                page={page}
                countPage={totalPage}
                onSubmit={handleFilterChanges}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default withLoading(Product)
