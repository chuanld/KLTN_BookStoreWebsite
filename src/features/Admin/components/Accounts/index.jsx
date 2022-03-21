import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { useHistory, useLocation, Link } from 'react-router-dom'

import adminApi from 'api/adminApi'
import TableAccount from './components/TableAccount'
import Paginate from './components/Paginate'
import FilterTab from './components/FilterTab'
import withLoading from 'components/HOC/withLoading'
import Breadcrumb from 'components/Breadcrumbs'

const queryString = require('query-string')

/*Note queryString: obj{
    limit,  page, role, sort, email[regex], 
}
End note */

function Accounts({ showLoading, hideLoading }) {
  const location = useLocation()
  const history = useHistory()
  const [accounts, setAccounts] = useState([])
  const [page, setPage] = useState()
  const [totalPage, setTotalPage] = useState()
  const [result, setResult] = useState()
  const [totalResult, setTotalResult] = useState()
  const [loadingSkt, setLoadingSkt] = useState(false)
  const [loadingTable, setLoadingTable] = useState(false)

  //getQueryParams
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search)
    console.log(params, 'queryParams Account Admin')
    return {
      ...params,
    }
  }, [location.search])

  //getData
  const getListAccount = useCallback(async () => {
    try {
      // showLoading()
      setLoadingTable(true)
      const res = await adminApi.getListAccount(queryParams)
      setAccounts(res.users)
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
    getListAccount()
  }, [queryParams, getListAccount])

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

  // const mapListAccout = accounts.map((user)=>{
  //   return (

  //   )
  // })
  return (
    <>
      <div className='session-heading'>
        <Breadcrumb />
      </div>
      <div className='userlist'>
        <div className='userListTitle'>
          <h4>List user in Database</h4>
          <Link to='/admin/accounts/create'>
            <button className='userAddButton'>Create User</button>
          </Link>
        </div>
        <div className='userList_toolbar_wrapper'>
          <FilterTab params={queryParams} onSubmit={handleFilterChanges} />
        </div>
        <div className='usersList'>
          <TableAccount
            accounts={accounts}
            onSubmit={deleteSubmit}
            loadingTable={loadingTable}
          />
        </div>
        {/* {accounts.length === 0 && <Loading />} */}
        <div className='pagination-container'>
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

export default withLoading(Accounts)
