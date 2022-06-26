import React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { DeleteForever, Edit, Search } from '@mui/icons-material'
import { Link, useRouteMatch } from 'react-router-dom'

function TableOrder(props) {
  const { path } = useRouteMatch()
  const { orders, onSubmit, loadingTable } = props

  const deleteSubmit = () => {}
  const handleChangeStatus = (id, value) => {
    if (!onSubmit) return
    onSubmit(id, value)
  }
  const columns = [
    {
      field: '_id',
      headerName: 'Order ID',
      width: 220,
      editable: false,
      flex: 1,
    },
    {
      field: 'name',
      headerName: 'Name',
      minWidth: 155,
      editable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`${path}/${params.row._id}`}>
              <p>{params.row.name}</p>
            </Link>
          </>
        )
      },
      flex: 1,
    },
    {
      field: 'email',
      headerName: 'Email',
      minWidth: 260,
      editable: false,
      flex: 1,
    },
    {
      field: 'address',
      headerName: 'Address',
      minWidth: 150.93,
      editable: false,

      renderCell: (params) => {
        return <>{Object.values(params.row.address)}</>
      },
      flex: 1,
    },
    {
      field: 'option',
      headerName: 'Option',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      minWidth: 160,
      renderCell: (params) => {
        return <>{params.row.option.type}</>
      },
      flex: 1,
      // valueGetter: (params) =>
      //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'createdAt',
      headerName: 'Date',
      minWidth: 95,
      editable: false,
      renderCell: (params) => {
        return <>{new Date(params.row.createdAt).toLocaleDateString()}</>
      },
      flex: 1,
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 130,
      editable: false,
      renderCell: (params) => {
        return (
          <>
            <select
              className={
                params.row.status === 5
                  ? 'checked_order'
                  : params.row.status === 3
                  ? 'delay_order'
                  : params.row.status === 1
                  ? 'cancel_order'
                  : null
              }
              name="status"
              value={params.row.status}
              onChange={(e) =>
                handleChangeStatus(params.row._id, e.target.value)
              }
              disabled={params.row.status === 1 || params.row.status === 5}
            >
              <option value={0}>Chờ xác nhận</option>
              <option value={1}>Đã huỷ</option>
              <option value={2}>Đã xác nhận</option>
              <option value={3}>Tạm hoãn</option>
              <option value={4}>Đã giao hàng</option>
              <option value={5}>Đã thanh toán</option>
            </select>
          </>
        )
      },
      flex: 1,
    },
  ]

  return (
    <>
      <div style={{ height: 500, width: '100%' }} className={'orderListOrder'}>
        <DataGrid
          rows={orders}
          getRowId={(row) => row._id}
          columns={columns}
          pageSize={9}
          sx={{ height: 570, bgcolor: 'background.paper' }}
          checkboxSelection
          hideFooterPagination
          disableSelectionOnClick
          loading={loadingTable}
        />
      </div>
    </>
  )
}

export default TableOrder
