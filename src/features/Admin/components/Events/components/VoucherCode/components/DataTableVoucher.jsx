import { DataGrid } from '@mui/x-data-grid'
import adminApi from 'api/adminApi'
import categoryApi from 'api/categoryApi'
import productApi from 'api/productApi'
import React, { useEffect, useState } from 'react'

function DataTableVoucher(props) {
  const { vouchers, onEditVoucher, isLoading, selectionRow, submitSelectRow } =
    props

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])

  const getProductsData = async () => {
    try {
      const res = await adminApi.getAllProducts()
      setProducts(res.allproducts)
    } catch (err) {}
  }
  const getCategoriesData = async () => {
    try {
      const res = await categoryApi.getCategories()
      setCategories(res)
    } catch (err) {}
  }
  useEffect(() => {
    if (vouchers.length > 0) {
      getCategoriesData()
      getProductsData()
    }
  }, [vouchers])

  const handleEditVoucher = (voucher) => {
    if (!onEditVoucher) return
    onEditVoucher(voucher)
  }
  const setSelect = (selects) => {
    if (!submitSelectRow) return
    submitSelectRow(selects)
  }
  const columns = [
    {
      field: 'voucherCode',
      headerName: 'Voucher Code',
      minWidth: 170,
      editable: false,
      flex: 1,
    },
    {
      field: 'voucherDiscount',
      headerName: '% Discount Voucher',
      minWidth: 200,
      editable: false,
      renderCell: (params) => {
        return (
          <>
            <div onClick={() => handleEditVoucher(params.row)}>
              <p>{params.row.voucherDiscount}%</p>
            </div>
          </>
        )
      },
      flex: 1,
    },
    {
      field: 'voucherStock',
      headerName: 'Stock',
      minWidth: 80,
      editable: false,
    },
    {
      field: '_id',
      headerName: 'Discount On',
      minWidth: 220,
      editable: false,
      renderCell: (params) => {
        return (
          <>
            <div className="discount-hastag">
              {params.row.voucherProductId.length !== 0 && products.length > 0 && (
                <div className="discount-hastag-container">
                  {params.row.voucherProductId.map((item) => {
                    return products.map((prod) => {
                      if (item === prod._id) {
                        return (
                          <>
                            <div
                              className="discount-hastag-wrapper __id"
                              key={item}
                            >
                              <span className="discount-hastag-item">
                                {prod.title}
                              </span>
                              <span className="discount-hastag-close">X</span>
                            </div>
                          </>
                        )
                      }
                      return undefined
                    })
                  })}
                </div>
              )}
              {params.row.voucherProductCategory.length !== 0 &&
                categories.length > 0 && (
                  <div className="discount-hastag-container">
                    {params.row.voucherProductCategory.map((item) => {
                      return categories.map((cate) => {
                        if (item === cate._id) {
                          return (
                            <>
                              <div
                                className="discount-hastag-wrapper __category"
                                key={cate._id}
                              >
                                <span className="discount-hastag-item">
                                  {cate.name}
                                </span>
                                <span className="discount-hastag-close">X</span>
                              </div>
                            </>
                          )
                        }
                        return null
                      })
                    })}
                  </div>
                )}
              {params.row.voucherProductPublisher.length !== 0 && (
                <div className="discount-hastag-container">
                  {params.row.voucherProductPublisher.map((item) => (
                    <>
                      <div
                        className="discount-hastag-wrapper __publisher"
                        key={item}
                      >
                        <span className="discount-hastag-item">{item}</span>
                        <span className="discount-hastag-close">X</span>
                      </div>
                    </>
                  ))}
                </div>
              )}
              {params.row.voucherProductAuthor.length !== 0 && (
                <div className="discount-hastag-container">
                  {params.row.voucherProductAuthor.map((item) => (
                    <>
                      <div
                        className="discount-hastag-wrapper __author"
                        key={item}
                      >
                        <span className="discount-hastag-item">{item}</span>
                        <span className="discount-hastag-close">X</span>
                      </div>
                    </>
                  ))}
                </div>
              )}
            </div>
          </>
        )
      },
      flex: 1,
    },
    {
      field: 'createdBy',
      headerName: 'Create By',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      editable: false,
      minWidth: 180,
      flex: 1,
    },
    {
      field: 'modifiedBy',
      headerName: 'Modified By',
      minWidth: 180,
      editable: false,
      flex: 1,
    },
    {
      field: 'updatedAt',
      headerName: 'Updated At',
      minWidth: 140,
      editable: false,
      renderCell: (params) => {
        return <p>{new Date(params.row.updatedAt).toDateString()}</p>
      },
      flex: 1,
    },
  ]

  return (
    <>
      <div style={{ height: 'auto', width: '100%' }}>
        <DataGrid
          rows={vouchers}
          getRowId={(row) => row._id}
          rowHeight={150}
          columns={columns}
          pageSize={9}
          sx={{ height: 650, bgcolor: 'background.paper' }}
          // loading={true}
          checkboxSelection={true}
          hideFooterPagination
          disableSelectionOnClick
          loading={isLoading}
          onSelectionModelChange={(newSelectionModel) => {
            setSelect(newSelectionModel)
          }}
          selectionModel={selectionRow}
        />
      </div>
    </>
  )
}

export default React.memo(DataTableVoucher)
