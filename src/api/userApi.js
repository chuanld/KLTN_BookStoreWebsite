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
    logout(){
        const url = '/user/logout'
        return axiosClient.get(url)
    },
    getProfile() {
        const url = '/user/infor'
        return axiosClient.get(url)
    },
    getOrderInfo(){
        const url = '/user/order_infor'
        return axiosClient.get(url)
    },
    addToCart(cart){
        const url= '/user/addtocart'
        console.log(cart, "Cart Data")
        return axiosClient.patch(url,{cart})
    }
}
export default userApi