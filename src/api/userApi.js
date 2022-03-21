const { default: axiosClient } = require('./axiosClient')
const userApi = {
  register(data) {
    const { email, name, password } = data
    const url = '/user/register'
    return axiosClient.post(url, { name, email, password })
  },
  login(data) {
    const { email, password } = data
    const url = '/user/login'
    return axiosClient.post(url, { email, password })
  },
  logout() {
    const url = '/user/logout'
    return axiosClient.get(url)
  },
  getProfile() {
    const url = '/user/infor'
    return axiosClient.get(url)
  },
  getOrderInfo() {
    const url = '/user/order_infor'
    return axiosClient.get(url)
  },
  getOrderInfoDetailById(id) {
    const url = `/user/order_infor/${id}`
    return axiosClient.get(url)
  },
  cancelOrder(data) {
    const { id, status } = data
    const url = `/user/order_infor/${id}`
    return axiosClient.patch(url, { status })
  },
  addToCart(cart) {
    const url = '/user/addtocart'
    return axiosClient.patch(url, { cart })
  },
  deleteCartById(id) {
    const url = `/user/delete_cart/${id}`
    return axiosClient.delete(url)
  },
  updateInfor(infor) {
    const url = '/user/update'
    const { name, phone, address } = infor
    return axiosClient.patch(url, { name, address, phone })
  },
  updatePassword(infor) {
    const url = '/user/change'
    const { password, newPassword } = infor
    return axiosClient.patch(url, { password, newPassword })
  },
  paymentShipCOD(data) {
    const { cart, orderID, address, name, option } = data
    const url = '/api/order'
    return axiosClient.post(url, { cart, orderID, address, name, option })
  },
  deleteAllItem() {
    const url = '/user/delete_cart'
    return axiosClient.delete(url)
  },
}
export default userApi
