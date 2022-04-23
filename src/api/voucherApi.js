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
}
export default voucherApi
