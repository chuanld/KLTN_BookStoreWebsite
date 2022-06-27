const { default: axiosClient } = require('./axiosClient')
const voucherApi = {
  checkVoucher(voucherCode) {
    const url = '/api/discount/checkvalid'
    return axiosClient.post(url, { voucherCode })
  },
  getVouchers(queryParams) {
    const url = '/api/discount'
    return axiosClient.get(url, { params: { ...queryParams } })
  },
  createVoucher(values) {
    const {
      voucherCode,
      voucherDiscount,
      // voucherStatus,
      voucherStock,
      voucherProductId,
      voucherProductPublisher,
      voucherProductCategory,
      voucherProductAuthor,
      createdBy,
      voucherExpire,
      voucherEffect,
    } = values
    console.log(voucherExpire, voucherEffect)
    const url = `/api/discount`
    return axiosClient.post(url, {
      voucherCode,
      voucherDiscount,
      // voucherStatus,
      voucherStock,
      voucherProductId,
      voucherProductPublisher,
      voucherProductCategory,
      voucherProductAuthor,
      createdBy,
      voucherExpire,
      voucherEffect,
    })
  },
  updateVoucher(values) {
    const {
      voucherId,
      voucherCode,
      voucherDiscount,
      voucherStock,
      voucherProductId,
      voucherProductPublisher,
      voucherProductCategory,
      voucherProductAuthor,
      modifiedBy,
      voucherExpire,
      voucherEffect,
    } = values
    const url = `/api/discount/${voucherId}`
    return axiosClient.patch(url, {
      voucherCode,
      voucherDiscount,
      // voucherStatus,
      voucherStock,
      voucherProductId,
      voucherProductPublisher,
      voucherProductCategory,
      voucherProductAuthor,
      modifiedBy,
      voucherExpire,
      voucherEffect,
    })
  },
  deleteVoucher(id) {
    const url = `/api/discount/${id}`
    return axiosClient.delete(url)
  },
}
export default voucherApi
