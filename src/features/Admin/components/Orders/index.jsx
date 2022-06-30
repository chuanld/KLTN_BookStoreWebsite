import adminApi from 'api/adminApi'
import Breadcrumb from 'components/Breadcrumbs'
import React, { useState, useMemo, useCallback, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import Paginate from './components/Paginate'
import TableOrder from './components/TableOrder'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import FilterTab from './components/FilterTab'

const queryString = require('query-string')

/*Note queryString: obj{
    limit,  page, status, sort, email[regex], 
}
End note */
function Orders() {
  const [orders, setOrders] = useState([])
  const location = useLocation()
  const history = useHistory()
  const [accounts, setAccounts] = useState([])
  const [page, setPage] = useState()
  const [totalPage, setTotalPage] = useState()
  const [result, setResult] = useState()
  const [totalResult, setTotalResult] = useState()
  const [loadingSkt, setLoadingSkt] = useState(false)
  const [loadingTable, setLoadingTable] = useState(false)

  const [callback, setCallback] = useState(false)

  //getQueryParams
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search)
    console.log(params, 'queryParams Account Admin')
    return {
      ...params,
    }
  }, [location.search])

  //Get Orders
  const getListOrder = useCallback(async () => {
    try {
      // showLoading()
      setLoadingTable(true)
      const res = await adminApi.getOrders(queryParams)
      setOrders(res.orders)
      setPage(res.page)
      setResult(res.result)
      setTotalResult(res.totalResult)
      setTotalPage(Math.ceil(res.totalResult / 9))
    } catch (err) {}
    setLoadingTable(false)
    // hideLoading()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams])
  useEffect(() => {
    getListOrder()
  }, [queryParams, getListOrder, callback])

  //handle Filters
  const handleFilterChanges = (values) => {
    console.log(values, 'filterChange')
    const filters = {
      ...values,
    }
    if (filters['email[regex]'] === ' ') {
      delete filters['email[regex]']
    }

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    })
  }

  const deleteSubmit = async (id, email) => {
    console.log(email, 'Account will be remove ?')
  }

  const handleChangeStatus = async (id, status) => {
    try {
      const res = await adminApi.updateStatus(id, status)
      setCallback(!callback)
      toast.success(res.msg)
    } catch (err) {
      toast.error(err.response.data.msg)
    }
  }
  return (
    <>
      <div className="session-heading">
        <Breadcrumb />
      </div>
      <div className="orderlist">
        <div className="orderListTitle">
          <h4>System have {orders.length} ordered</h4>
        </div>
        <div className="userList_toolbar_wrapper">
          <FilterTab params={queryParams} onSubmit={handleFilterChanges} />
        </div>
        <div className="ordersList">
          <TableOrder
            orders={orders}
            onSubmit={handleChangeStatus}
            loadingTable={loadingTable}
          />
        </div>

        <div className="pagination-container">
          <Paginate
            params={queryParams}
            totalPage={totalPage}
            onSubmit={handleFilterChanges}
          />
        </div>
      </div>
    </>
  )
}

export default Orders
