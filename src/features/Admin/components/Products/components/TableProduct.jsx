import React, { useState, useEffect } from 'react'
import { DeleteForever } from '@mui/icons-material'
import { Link, useRouteMatch } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid'
import { formatCurrency } from 'utils/Format'
import categoryApi from 'api/categoryApi'

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
  const [categories, setCategories] = useState([])

  const getCategoriesData = async () => {
    try {
      const res = await categoryApi.getCategories()
      setCategories(res)
    } catch (err) {}
  }
  useEffect(() => {
    if (products.length > 0) {
      getCategoriesData()
    }
  }, [products])

  const setSelect = (selects) => {
    if (!submitSelectRow) return
    submitSelectRow(selects)
  }

  const columns = [
    {
      field: 'product_id',
      headerName: 'Tag ID',
      minWidth: 100,
      editable: false,
      flex: 1,
    },
    {
      field: 'title',
      headerName: 'Title',
      minWidth: 250,
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
      minWidth: 90,
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
      flex: 1,
    },
    {
      field: 'sold',
      headerName: 'Sold',
      minWidth: 80,
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
      flex: 1,
    },
    {
      field: 'category',
      headerName: 'Category',
      minWidth: 210,
      renderCell: (params) => {
        return (
          <>
            <Link to={`${path}/${params.row._id}`}>
              {categories.length > 0 &&
                categories.map((item) => {
                  if (item._id === params.row.category) {
                    return <p>{item.name}</p>
                  }
                  return undefined
                })}
            </Link>
          </>
        )
      },
      editable: false,
      flex: 1,
    },
    {
      field: 'author',
      headerName: 'Author',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      editable: false,
      minWidth: 170,
      renderCell: (params) => {
        return (
          <>
            <Link to={`${path}/${params.row._id}`}>
              <p>{params.row.author}</p>
            </Link>
          </>
        )
      },
      flex: 1,
      // valueGetter: (params) =>
      //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'publisher',
      headerName: 'Publisher',
      minWidth: 100,
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
      flex: 1,
    },
    {
      field: 'images',
      headerName: 'Image',
      minWidth: 100,
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
      flex: 1,
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
      <div style={{ minHeight: 500, width: '100%' }}>
        <DataGrid
          rows={products}
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
