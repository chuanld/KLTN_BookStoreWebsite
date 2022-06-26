import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid'

function DataTableDiscount(props) {
  const { products, submitSelectRow, selectionRow, loadingTable } = props
  const { path } = useRouteMatch()

  const setSelect = (selects) => {
    if (!submitSelectRow) return
    submitSelectRow(selects)
  }

  const columns = [
    {
      field: 'product_id',
      headerName: 'Tag ID',
      minWidth: 70,
      editable: false,
      flex: 1,
    },
    {
      field: 'title',
      headerName: 'Title',
      minWidth: 280,
      editable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`${path}/${params.row._id}`}>
              <p>{params.row.title}</p>
            </Link>
          </>
        )
      },
      flex: 1,
    },
    {
      field: 'price',
      headerName: 'Price',
      minWidth: 80,
      editable: false,
      flex: 1,
    },
    {
      field: 'discount',
      headerName: 'Discount',
      minWidth: 100,
      editable: false,
      renderCell: (params) => {
        return `${100 - params.row.discount}%`
      },
      flex: 1,
    },
    {
      field: 'category',
      headerName: 'Category',
      minWidth: 130,
      editable: false,
      flex: 1,
    },
    {
      field: 'author',
      headerName: 'Author',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      editable: false,
      minWidth: 180,
      flex: 1,
      // valueGetter: (params) =>
      //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'publisher',
      headerName: 'Publisher',
      minWidth: 180,
      editable: false,
      flex: 1,
    },
    {
      field: 'images',
      headerName: 'Image',
      minWidth: 140,
      editable: false,
      renderCell: (params) => {
        return <img src={params.row.images.url} alt="" height="120px" />
      },
      flex: 1,
    },
  ]
  return (
    <>
      <div style={{ height: 'auto', width: '100%' }}>
        <DataGrid
          rows={products}
          getRowId={(row) => row._id}
          rowHeight={130}
          columns={columns}
          pageSize={9}
          sx={{ height: 1320, bgcolor: 'background.paper' }}
          // loading={true}
          checkboxSelection={true}
          hideFooterPagination
          disableSelectionOnClick
          loading={loadingTable}
          onSelectionModelChange={(newSelectionModel) => {
            setSelect(newSelectionModel)
          }}
          selectionModel={selectionRow}
        />
      </div>
    </>
  )
}

export default DataTableDiscount
