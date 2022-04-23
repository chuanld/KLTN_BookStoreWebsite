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
      width: 70,
      editable: false,
    },
    {
      field: 'title',
      headerName: 'Title',
      width: 280,
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
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 80,
      editable: false,
    },
    {
      field: 'discount',
      headerName: 'Discount',
      width: 100,
      editable: false,
      renderCell: (params) => {
        return `${100 - params.row.discount}%`
      },
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 130,
      editable: false,
    },
    {
      field: 'author',
      headerName: 'Author',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      editable: false,
      width: 180,
      // valueGetter: (params) =>
      //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'publisher',
      headerName: 'Publisher',
      width: 180,
      editable: false,
    },
    {
      field: 'images',
      headerName: 'Image',
      width: 140,
      editable: false,
      renderCell: (params) => {
        return <img src={params.row.images.url} alt='' height='120px' />
      },
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
