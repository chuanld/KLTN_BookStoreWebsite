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
      minWidth: 165,
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
      minWidth: 275.84,
      renderCell: (params) => {
        return (
          <>
            <Link to={`${path}/${params.row._id}`}>
              <p>{params.row.email}</p>
            </Link>
          </>
        )
      },
      editable: false,
      flex: 1,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      minWidth: 117.93,
      editable: false,
      renderCell: (params) => {
        return (
          <>
            {' '}
            <Link to={`${path}/${params.row._id}`}>
              {' '}
              <p>{params.row.phone ? params.row.phone : <i>Updating...</i>}</p>
            </Link>
          </>
        )
      },
      flex: 1,
    },
    {
      field: 'address',
      headerName: 'Address',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      editable: false,
      minWidth: 170.8,
      renderCell: (params) => {
        return (
          <>
            <Link to={`${path}/${params.row._id}`}>
              {' '}
              <p>
                {params.row.address ? params.row.address : <i>Updating...</i>}
              </p>
            </Link>
          </>
        )
      },
      flex: 1,
      // valueGetter: (params) =>
      //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'role',
      headerName: 'Type',
      minWidth: 90,
      editable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`${path}/${params.row._id}`}>
              <p>{params.row.role === 1 ? 'Admin' : 'User'}</p>
            </Link>
          </>
        )
      },
      flex: 1,
    },
    {
      field: 'action',
      headerName: 'Action',
      minWidth: 90,
      editable: false,
      renderCell: (params) => {
        return (
          <>
            <DeleteForever
              className="userListDelete"
              onClick={() => deleteSubmit(params.row._id)}
            />
          </>
        )
      },
      flex: 1,
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
        // checkboxSelection
        hideFooterPagination
        disableSelectionOnClick
        loading={loadingTable}
      />
    </div>
  )
}

export default TableAccount
