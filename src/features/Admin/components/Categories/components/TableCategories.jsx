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
      minWidth: 270,
      editable: false,
      flex: 1,
    },
    {
      field: 'name',
      headerName: 'Name',
      minWidth: 280,
      editable: false,
      flex: 1,
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
      minWidth: 140,
      editable: false,
      renderCell: (params) => {
        return (
          <>
            (
            {
              products.filter((product) => product.category === params.row._id)
                .length
            }
            ) Books
          </>
        )
      },
      flex: 1,
    },
    {
      field: 'createdAt',
      headerName: 'Create At',
      minWidth: 220,
      editable: false,
      renderCell: (params) => {
        return <>{dateFormat(params.row.createdAt)}</>
      },
      flex: 1,
    },
    {
      field: 'updatedAt',
      headerName: 'Update At',
      minWidth: 220,
      editable: false,
      renderCell: (params) => {
        return <>{dateFormat(params.row.updatedAt)}</>
      },
      flex: 1,
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
