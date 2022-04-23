import voucherApi from 'api/voucherApi'
import React, { useEffect, useState, useCallback } from 'react'
import { toast } from 'react-toastify'
import DataTableVoucher from './components/DataTableVoucher'

import ModalEditVoucher from './components/ModalEditVoucher'

function VoucherCode() {
  const [vouchers, setVouchers] = useState([])
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false)
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
  }, [])

  const onEditVoucher = useCallback((voucher) => {
    if (!voucher) return
    setVoucherEdit(voucher)
    setIsOpenModalEdit(true)
  }, [])

  function closeModal() {
    setIsOpenModalEdit(false)
  }
  function afterOpenModal() {}

  const handleSubmitUpdateVoucher = async (values) => {
    if (!values) return
    console.log(values)

    try {
      const res = await voucherApi.updateVoucher(values)
      toast.success(res.msg)
      setCallback(!callback)
      closeModal()
    } catch (err) {
      toast.error(err.response.data.msg)
    }
  }
  return (
    <>
      <div className='voucher'>
        <div className='voucher-heading'></div>
        <div className='voucher-container'>
          <div className='voucher-table'>
            <DataTableVoucher
              vouchers={vouchers}
              onEditVoucher={onEditVoucher}
              isLoading={isLoading}
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
    </>
  )
}

export default VoucherCode
