import axios from 'axios'
import { StorageKeys } from '../constant/storageKey'

const axiosClient = axios.create({
  baseURL: 'http://localhost:5000/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

axiosClient.interceptors.request.use(
  (config) => {
    //Do something before send request
    const URLS = [
      '/user/register',
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
      // '/user/order_infor/:id',
      '/api/order',
      '/user/delete_cart',
      '/api/banners',
      '/api/rating',
      '/user/refresh_token',
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
    ]

    const dynamicURL = [
      '/user/refresh_token',
      //dynamic URL
      '/user/addtocart',
      '/user/delete_cart',
      '/user/update',
      '/user/change',
      '/user/order_infor',
      '/api/order',
      '/user/delete_cart',
      '/api/rating',
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
