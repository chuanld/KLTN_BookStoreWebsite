import React, { useState, useEffect } from 'react'
import { DeleteForever } from '@mui/icons-material'
import { Link, useRouteMatch } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid'
import { formatCurrency } from 'utils/Format'
import adminApi from 'api/adminApi'
import dayjs from 'dayjs'

function TableInventories(props) {
  const { inventories, loadingTable } = props
  const { path } = useRouteMatch()
  const [products, setProducts] = useState([])
  const [accounts, setAccounts] = useState([])

  const getData = async () => {
    try {
      const prods = await adminApi.getAllProducts()
      const users = await adminApi.getAllUsers()
      setProducts(prods.allproducts)
      setAccounts(users.allusers)
    } catch (err) {}
  }
  useEffect(() => {
    if (inventories.length > 0) {
      getData()
    }
  }, [inventories])

  const columns = [
    {
      field: 'productId',
      headerName: 'Product',
      minWidth: 250,
      editable: false,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            {products.length > 0 &&
              products.map((item) => {
                if (item._id === params.row.productId) {
                  return <p>{item.title}</p>
                }
                return undefined
              })}
          </>
        )
      },
    },
    {
      field: 'productStock',
      headerName: 'Stock',
      minWidth: 100,
      editable: false,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <p>SL: ({params.row.productStock})</p>
          </>
        )
      },
    },
    {
      field: 'importBy',
      headerName: 'Created By',
      minWidth: 90,
      editable: false,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            {accounts.length > 0 &&
              accounts.map((item) => {
                if (item._id === params.row.importBy) {
                  return <p>{item.name}</p>
                }
                return undefined
              })}
          </>
        )
      },
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      minWidth: 90,
      editable: false,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <p>{dayjs(params.row.createdAt).format('LLL')}</p>
          </>
        )
      },
    },
  ]

  return (
    <>
      <div style={{ minHeight: 500, width: '100%' }}>
        <DataGrid
          rows={inventories}
          getRowId={(row) => row._id}
          rowHeight={130}
          columns={columns}
          pageSize={9}
          sx={{ height: 570, bgcolor: 'background.paper' }}
          // loading={true}
          // checkboxSelection={true}
          hideFooterPagination
          disableSelectionOnClick
          loading={loadingTable}
        />
      </div>
    </>
  )
}

export default TableInventories
