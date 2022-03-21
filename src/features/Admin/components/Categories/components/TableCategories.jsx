import React, { useState, useEffect } from 'react'
import { DeleteForever } from '@mui/icons-material'
import { Link, useRouteMatch } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid'
import dateFormat from 'dateformat'

import adminApi from 'api/adminApi'

function TableCategories(props) {
  const { categories, onSubmit, submitSelectRow, selectionRow } = props
  const [products, setProducts] = useState([])
  const getProducts = async () => {
    try {
      const res = await adminApi.getAllProducts()
      setProducts(res.allproducts)
    } catch (err) {}
  }
  useEffect(() => {
    getProducts()
  }, [])

  const setSelect = (selects) => {
    if (!submitSelectRow) return
    submitSelectRow(selects)
  }

  const columns = [
    {
      field: '_id',
      headerName: 'ID',
      width: 270,
      editable: false,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 320,
      editable: false,
    },
    // {
    //   field: 'price',
    //   headerName: 'Price',
    //   width: 120,
    //   editable: false,
    // },
    {
      field: 'include',
      headerName: 'Includes',
      width: 140,
      editable: false,
      renderCell: (params) => {
        return (
          <>
            (
            {
              products.filter((product) => product.category === params.row.name)
                .length
            }
            ) Books
          </>
        )
      },
    },
    {
      field: 'createdAt',
      headerName: 'Create At',
      width: 220,
      editable: false,
      renderCell: (params) => {
        return <>{dateFormat(params.row.createdAt)}</>
      },
    },
    {
      field: 'updatedAt',
      headerName: 'Update At',
      width: 220,
      editable: false,
      renderCell: (params) => {
        return <>{dateFormat(params.row.updatedAt)}</>
      },
    },
  ]
  return (
    // <table className="categories-listCategories">
    //   <thead>
    //     <tr>
    //       <th>CateID</th>
    //       <th>CateName</th>
    //       <th>Includes</th>
    //       <th>Time</th>
    //       <th>Action</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {categories.map((category) => (
    //       <tr key={category._id}>
    //         <td>{category._id}</td>
    //         <td>{category.name}</td>
    //         <td>
    //           (
    //           {
    //             allProducts.filter(
    //               (cate) => cate.category === category.name
    //             ).length
    //           }
    //           ) Books
    //         </td>
    //         <td>{dateFormat(category.createdAt)}</td>
    //         <td>
    //           {/* <Link to="#!" onClick={() => showMoreOrder(order._id)}>
    //           Show more
    //         </Link> */}
    //           <Edit
    //             onClick={() => editCategory(category._id, category.name)}
    //           />
    //           <DeleteForever
    //             onClick={() =>
    //               deleteCategory(category._id, category.name)
    //             }
    //           />
    //         </td>
    //       </tr>
    //     ))}
    //   </tbody>
    // </table>
    <>
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={categories}
          getRowId={(row) => row._id}
          columns={columns}
          pageSize={9}
          sx={{ height: 570, bgcolor: 'background.paper' }}
          // loading={true}
          checkboxSelection={true}
          // hideFooterPagination
          disableSelectionOnClick
          //   loading={loadingTable}
          onSelectionModelChange={(newSelectionModel) => {
            setSelect(newSelectionModel)
          }}
          selectionModel={selectionRow}
        />
      </div>
    </>
  )
}

export default TableCategories
