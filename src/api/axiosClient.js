import axios from 'axios'
import { DOMAIN_SERVER, StorageKeys } from '../constant/storageKey'

const axiosClient = axios.create({
  baseURL: DOMAIN_SERVER.PROD,
  // baseURL: DOMAIN_SERVER.TEST,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

axiosClient.interceptors.request.use(
  (config) => {
    //Do something before send request
    const URLS = [
      // <<<<<<< HEAD
      //       "/user/register",
      //       "/user/login",
      //       "/user/infor",
      //       "/user/refresh_token",
      //       "/user/all_infor",
      //       "/user/addtocart",
      //       "/user/order_infor",
      //       "/api/order",
      //       "/user/delete_cart",
      //       "/user/update",
      //       "/user/change",
      // =======
      '/user/register',
      '/user/register_google',
      '/user/activation',
      '/user/forgot',
      '/user/reset',
      '/user/login',
      '/user/infor',
      '/user/refresh_token',
      '/user/all_infor',
      '/user/addtocart',
      '/user/order_infor',
      '/api/order',
      '/user/delete_cart',
      '/user/update',
      '/user/change',
      // >>>>>>> origin/13-06_home_1
      // '/user/order_infor/:id',
      '/api/order',
      '/user/delete_cart',
      '/api/banners',
      '/api/rating',
      '/user/refresh_token',
      '/api/discount/checkvalid',
      '/api/analytic',
      '/api/payment/create_payment_url',
      '/api/log',
    ]
    const URLSADMIN = [
      '/user/all_infor',
      '/user/infor_byId',
      '/user/all_update',
      '/user/create_infor',
      '/api/upload',
      '/api/destroy',
      '/api/products',
      '/api/allproducts',
      '/api/category',
      '/api/order',
      '/api/products/event_disc',
      '/api/discount',
    ]

    const dynamicURL = [
      '/user/refresh_token',
      //       //dynamic URL
      // <<<<<<< HEAD
      //       "/user/addtocart",
      //       "/user/delete_cart",
      //       "/user/update",
      //       "/user/change",
      //       "/user/order_infor",
      //       "/api/order",
      //       "/user/delete_cart",
      //       "/api/rating",
      //       "/api/discount/checkvalid",
      //       "/api/analytic",
      // =======
      '/user/addtocart',
      '/user/delete_cart',
      '/user/update',
      '/user/change',
      '/user/order_infor',
      '/api/order',
      '/user/delete_cart',
      '/api/rating',
      '/api/discount/checkvalid',
      '/user/activation',
      '/user/forgot',
      // '/user/reset',
      '/api/analytic',
      '/api/payment/create_payment_url',
      // >>>>>>> origin/13-06_home_1
      //Admin
      '/user/all_infor',
      '/user/infor_byId',
      '/user/all_update',
      '/user/create_infor',
      '/api/upload',
      '/api/destroy',
      '/api/products',
      '/api/allproducts',
      '/api/category',
      '/api/order',
      '/api/products/event_disc',
      '/api/discount',
      '/api/log',
    ]
    const dynamicURLNeedToken = dynamicURL.some((item) => {
      return config.url.includes(item)
    })

    if (URLS.includes(config.url) || dynamicURLNeedToken) {
      const token = localStorage.getItem(StorageKeys.TOKEN)
      config.headers.Authorization = token ? `${token}` : ''
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosClient.interceptors.response.use(
  (response) => {
    console.log('Reveived response')
    return response.data
  },
  async (err) => {
    const originalConfig = err.config
    console.warn('Error status: ', err.response.status)
    if (err.response) {
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true
        try {
          console.log('Getting new token ...')
          await refreshToken()
          return axiosClient(originalConfig)
        } catch (_error) {
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data)
          }
          return Promise.reject(_error)
        }
      }
      return Promise.reject(err)
    }
  }
)

const refreshToken = async () => {
  try {
    const USER = localStorage.getItem(StorageKeys.USER)
    if (USER) {
      const res = await axiosClient.get('/user/refresh_token')
      localStorage.setItem(StorageKeys.TOKEN, res.accesstoken)
      console.log(res.data.accesstoken)
    }
  } catch (err) {
    console.log(err.response)
  }
}

export default axiosClient
