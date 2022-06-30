import React, { useState, useEffect, useMemo } from 'react'
import './styles.css'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Breadcrumb from 'components/Breadcrumbs'
import TableInventories from './components/TableInventories'
import productApi from 'api/productApi'
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import Paginate from '../Products/components/Paginate'
import FilterTab from './components/FilterTab'

const queryString = require('query-string')

function Inventories() {
  const location = useLocation()
  const history = useHistory()
  const { path } = useRouteMatch()
  const [inventories, setInventories] = useState([])

  const [, setPage] = useState()
  const [totalPage, setTotalPage] = useState()
  const [result, setResult] = useState()
  const [totalResult, setTotalResult] = useState()
  const [loadingTable, setLoadingTable] = useState(false)

  //getQueryParams
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search)
    console.log(params, 'queryParams Inventory Admin')
    return {
      ...params,
    }
  }, [location.search])

  const getInventoryData = async () => {
    try {
      setLoadingTable(true)
      const res = await productApi.getInventories(queryParams)
      setInventories(res.inventories)
      setPage(res.page)
      setResult(res.result)
      setTotalResult(res.totalResult)
      setTotalPage(Math.ceil(res.totalResult / 9))
    } catch (err) {}
    setLoadingTable(false)
  }

  useEffect(() => {
    getInventoryData()
  }, [queryParams])

  //Filter Changes
  const handleFilterChange = (values) => {
    console.log(values, 'filterValues Inventory Admin')
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

  return (
    <>
      <div className="session-heading">
        <Breadcrumb />
      </div>
      <div className="categoriesList">
        <div className="categoriesListTitle">
          <h4>System have {inventories.length} inven-report</h4>
          <div className="create-category"></div>
        </div>
        <div className="userList_toolbar_wrapper">
          <FilterTab params={queryParams} onSubmit={handleFilterChange} />
        </div>
        <div className="categories-list">
          <TableInventories
            inventories={inventories}
            loadingTable={loadingTable}
          />
        </div>
        <div className="pagination-container-inventories">
          <Paginate
            params={queryParams}
            totalPage={totalPage}
            onSubmit={handleFilterChange}
          />
          <div className="userlist_result">
            <div className="result_account"></div>
            <div></div>
            <div>
              <span>
                Showing{' '}
                <i>
                  1-{result} of {totalResult}
                </i>{' '}
                books
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="form-category-modal"></div>
    </>
  )
}

export default Inventories
