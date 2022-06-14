import voucherApi from 'api/voucherApi'
import React, { useEffect, useState, useCallback } from 'react'
import { toast } from 'react-toastify'
import DataTableVoucher from './components/DataTableVoucher'
import ModalAddVoucher from './components/ModalAddVoucher'

import ModalEditVoucher from './components/ModalEditVoucher'
import withLoading from 'components/HOC/withLoading'
import adminApi from 'api/adminApi'
function VoucherCode({ showLoading, hideLoading }) {
  const [vouchers, setVouchers] = useState([])
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false)
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false)
  const [voucherEdit, setVoucherEdit] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [callback, setCallback] = useState(false)
  const getVouchers = useCallback(async () => {
    try {
      setIsLoading(true)
      const res = await voucherApi.getVouchers()
      setVouchers(res.vouchers)
    } catch (err) {}
    setIsLoading(false)
  }, [])

  useEffect(() => {
    getVouchers()
  }, [callback])

  const onEditVoucher = useCallback((voucher) => {
    if (!voucher) return
    setVoucherEdit(voucher)
    setIsOpenModalEdit(true)
  }, [])

  const addVoucherModal = () => {
    if (isOpenModalCreate) return
    setIsOpenModalCreate(true)
  }

  function closeModal() {
    setIsOpenModalEdit(false)
    setIsOpenModalCreate(false)
  }
  function afterOpenModal() {}

  const handleSubmitUpdateVoucher = async (values) => {
    if (!values) return
    try {
      const res = await voucherApi.updateVoucher(values)
      toast.success(res.msg)
      setCallback(!callback)
      closeModal()
    } catch (err) {
      toast.error(err.response.data.msg)
    }
  }
  const handleSubmitCreateVoucher = async (values) => {
    if (!values) return
    console.log(values)

    try {
      const res = await voucherApi.createVoucher(values)
      toast.success(res.msg)
      setCallback(!callback)
      closeModal()
    } catch (err) {
      toast.error(err.response.data.msg)
    }
  }

  const [enableDel, setEnableDel] = useState(false)
  const [onCheck, setOnCheck] = useState(false)
  const [isCheck, setIsCheck] = useState(false)
  const [selectionRow, setSelectionRow] = useState([])
  const submitSelectRow = (selects) => {
    setSelectionRow(selects)
  }
  const deleteVch = async (id) => {
    deleteSubmit(id)
  }
  const submitDeleteSelect = async () => {
    selectionRow.forEach((select) => {
      vouchers.forEach((voucher) => {
        if (voucher._id === select.toString()) {
          deleteVch(voucher._id)
        }
      })
    })
  }
  const deleteSubmit = async (id) => {
    try {
      showLoading()
      if (window.confirm(`Are you sure delete voucher ${id} ?`)) {
        const deleteVoucher = await voucherApi.deleteVoucher(id)

        setOnCheck(false)
        setEnableDel(false)
        setCallback(!callback)
        toast.success(deleteVoucher.msg)
      }
    } catch (err) {
      toast.error(err.response.data.msg)
    }
    hideLoading()
  }
  const handleClickCheck = (id) => {
    console.log(id)
    vouchers.forEach((voucher) => {
      if (voucher._id === id) voucher.checked = !voucher.checked
    })

    setVouchers([...vouchers])
    setEnableDel(true)
  }
  const handleCheckAll = () => {
    vouchers.forEach((voucher) => {
      voucher.checked = !isCheck
    })
    setVouchers([...vouchers])
    setIsCheck(!isCheck)
    if (!enableDel) {
      setEnableDel(true)
    }
  }
  return (
    <>
      <div className="voucher">
        <div className="voucher-heading">
          {/* {selectionRow.length === 1 ? (
            <button
              className="userAddButton"
              onClick={() => onEditVoucher(selectionRow[0])}
            >
              Edit Product
            </button>
          ) : (
            <button className="userAddButton" onClick={() => addVoucherModal()}>
              + Voucher
            </button>
          )} */}
          <button
            className="voucherAddButton"
            onClick={() => addVoucherModal()}
          >
            + Voucher
          </button>

          {selectionRow.length !== 0 && (
            <button className="voucherDelButton" onClick={submitDeleteSelect}>
              Delete Books
            </button>
          )}
        </div>
        <div className="voucher-container">
          <div className="voucher-table">
            <DataTableVoucher
              vouchers={vouchers}
              onEditVoucher={onEditVoucher}
              isLoading={isLoading}
              selectionRow={selectionRow}
              submitSelectRow={submitSelectRow}
              handleClickCheck={handleClickCheck}
            />
          </div>
        </div>
        <div></div>
      </div>

      <ModalEditVoucher
        isOpenModal={isOpenModalEdit}
        voucher={voucherEdit}
        closeModal={closeModal}
        afterOpenModal={afterOpenModal}
        handleSubmitUpdateVoucher={handleSubmitUpdateVoucher}
      />
      <ModalAddVoucher
        isOpenModal={isOpenModalCreate}
        closeModal={closeModal}
        afterOpenModal={afterOpenModal}
        onSubmit={handleSubmitCreateVoucher}
      />
    </>
  )
}

export default withLoading(VoucherCode)
