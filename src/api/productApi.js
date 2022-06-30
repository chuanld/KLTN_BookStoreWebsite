const { default: axiosClient } = require('./axiosClient')
const productApi = {
  getProducts(queryParams) {
    // const url = `/api/products?limit=${limit}&page=${page}&${category}&${sort}&title[regex]=${search}&price[gte]=${startPrice}&price[lte]=${endPrice}`
    const url = `/api/products`
    return axiosClient.get(url, { params: { ...queryParams } })
  },
  getNewProduct() {
    const url = `/api/products?limit=3`
    return axiosClient.get(url)
  },
  getProductById(id) {
    const url = `/api/products/${id}`
    return axiosClient.get(url)
  },
  getListBanners() {
    const url = '/api/banners'
    return axiosClient.get(url)
  },
  getInventories(queryParams) {
    const url = '/api/inventory'
    return axiosClient.get(url, { params: { ...queryParams } })
  },
}

export default productApi
