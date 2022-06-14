import { DataGrid } from '@mui/x-data-grid'
import React from 'react'

function DataTableVoucher(props) {
  const { vouchers, onEditVoucher, isLoading, selectionRow, submitSelectRow } =
    props

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
      width: 170,
      editable: false,
    },
    {
      field: 'voucherDiscount',
      headerName: '% Discount Voucher',
      width: 200,
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
    },
    {
      field: 'voucherStock',
      headerName: 'Stock',
      width: 80,
      editable: false,
    },
    {
      field: '_id',
      headerName: 'Discount On',
      width: 220,
      editable: false,
      renderCell: (params) => {
        return (
          <>
            <div className="discount-hastag">
              {params.row.voucherProductId.length !== 0 && (
                <div className="discount-hastag-container">
                  {params.row.voucherProductId.map((item) => (
                    <>
                      <div className="discount-hastag-wrapper __id" key={item}>
                        <span className="discount-hastag-item">{item}</span>
                        <span className="discount-hastag-close">X</span>
                      </div>
                    </>
                  ))}
                </div>
              )}
              {params.row.voucherProductCategory.length !== 0 && (
                <div className="discount-hastag-container">
                  {params.row.voucherProductCategory.map((item) => (
                    <>
                      <div
                        className="discount-hastag-wrapper __category"
                        key={item}
                      >
                        <span className="discount-hastag-item">{item}</span>
                        <span className="discount-hastag-close">X</span>
                      </div>
                    </>
                  ))}
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
    },
    {
      field: 'createdBy',
      headerName: 'Create By',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      editable: false,
      width: 180,
    },
    {
      field: 'modifiedBy',
      headerName: 'Modified By',
      width: 180,
      editable: false,
    },
    {
      field: 'updatedAt',
      headerName: 'Updated At',
      width: 140,
      editable: false,
      renderCell: (params) => {
        return <p>{new Date(params.row.updatedAt).toDateString()}</p>
      },
    },
  ]

  return (
    <>
      <div style={{ height: 'auto', width: '100%' }}>
        <DataGrid
          rows={vouchers}
          getRowId={(row) => row._id}
          rowHeight={100}
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
