import React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { DeleteForever, Edit, Search } from '@mui/icons-material'
import { useLocation, Link } from 'react-router-dom'
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min'

function TableAccount({ accounts, deleteSubmit, loadingTable }) {
  const { path } = useRouteMatch()
  const columns = [
    { field: '_id', headerName: 'ID', width: 230.11, editable: false },
    {
      field: 'name',
      headerName: 'Name',
      width: 165,
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
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 275.84,
      editable: false,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      width: 117.93,
      editable: false,
      renderCell: (params) => {
        return (
          <>
            <p>{params.row.phone ? params.row.phone : <i>Updating...</i>}</p>
          </>
        )
      },
    },
    {
      field: 'address',
      headerName: 'Address',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      editable: false,
      width: 170.8,
      renderCell: (params) => {
        return (
          <>
            <p>
              {params.row.address ? params.row.address : <i>Updating...</i>}
            </p>
          </>
        )
      },
      // valueGetter: (params) =>
      //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'role',
      headerName: 'Type',
      width: 120.14,
      editable: false,
      renderCell: (params) => {
        return <>{params.row.role === 1 ? 'Admin' : 'User'}</>
      },
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 90,
      editable: false,
      renderCell: (params) => {
        return (
          <>
            <DeleteForever
              className="userListDelete"
              onClick={() => deleteSubmit(params.user._id, params.user.email)}
            />
          </>
        )
      },
    },
  ]
  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={accounts}
        getRowId={(row) => row._id}
        columns={columns}
        pageSize={9}
        sx={{ height: 570, bgcolor: 'background.paper' }}
        // loading={true}
        checkboxSelection
        hideFooterPagination
        // disableSelectionOnClick
        loading={loadingTable}
      />
    </div>
  )
}

export default TableAccount
