import React, { useState, useEffect } from 'react'
import { DeleteForever } from '@mui/icons-material'
import { Link, useRouteMatch } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid'
import { formatCurrency } from 'utils/Format'

function TableProduct(props) {
  const {
    products,
    onCheck,
    loadingTable,
    handleClickCheck,
    deleteSubmit,
    selectionRow,
    submitSelectRow,
  } = props

  const { path } = useRouteMatch()

  const setSelect = (selects) => {
    if (!submitSelectRow) return
    submitSelectRow(selects)
  }

  const columns = [
    {
      field: 'product_id',
      headerName: 'Tag ID',
      width: 90,
      editable: false,
    },
    {
      field: 'title',
      headerName: 'Title',
      width: 300,
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
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <Link to={`${path}/${params.row._id}`}>
              <p>{formatCurrency(params.row.price)}</p>
            </Link>
          </>
        )
      },
      editable: false,
    },
    {
      field: 'sold',
      headerName: 'Sold',
      width: 80,
      renderCell: (params) => {
        return (
          <>
            <Link to={`${path}/${params.row._id}`}>
              {' '}
              <p>SL:({params.row.sold})</p>
            </Link>
          </>
        )
      },
      editable: false,
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 230,
      renderCell: (params) => {
        return (
          <>
            <Link to={`${path}/${params.row._id}`}>
              <p>{params.row.category}</p>
            </Link>
          </>
        )
      },
      editable: false,
    },
    {
      field: 'author',
      headerName: 'Author',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      editable: false,
      width: 180,
      renderCell: (params) => {
        return (
          <>
            <Link to={`${path}/${params.row._id}`}>
              <p>{params.row.author}</p>
            </Link>
          </>
        )
      },
      // valueGetter: (params) =>
      //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'publisher',
      headerName: 'Publisher',
      width: '180',
      renderCell: (params) => {
        return (
          <>
            <Link to={`${path}/${params.row._id}`}>
              <p>{params.row.publisher}</p>
            </Link>
          </>
        )
      },
      editable: false,
    },
    {
      field: 'images',
      headerName: 'Image',
      minWidth: 140,
      editable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`${path}/${params.row._id}`}>
              <img src={params.row.images.url} alt="" height="120px" />
            </Link>
          </>
        )
      },
    },
    // {
    //   field: 'action',
    //   headerName: 'Action',
    //   width: 100,
    //   editable: true,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         {onCheck ? (
    //           <input
    //             type='checkbox'
    //             checked={params.row.checked}
    //             className='productListDelete'
    //             onChange={() => handleClickCheck(params.row._id)}
    //           />
    //         ) : (
    //           <DeleteForever
    //             className='productListDelete'
    //             onClick={() =>
    //               deleteSubmit(
    //                 params.row._id,
    //                 params.row.product_id,
    //                 params.row.images.public_id
    //               )
    //             }
    //           />
    //         )}
    //       </>
    //     )
    //   },
    // },
  ]
  return (
    <>
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={products}
          getRowId={(row) => row._id}
          rowHeight={130}
          columns={columns}
          pageSize={9}
          sx={{ height: 570, bgcolor: 'background.paper' }}
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

export default TableProduct
