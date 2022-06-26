const { default: axiosClient } = require('./axiosClient')
const categoryApi = {
  getCategories() {
    const url = '/api/category'
    return axiosClient.get(url)
  },
  getCategoryById(id) {
    const url = `/api/category/${id}`
    return axiosClient.get(url)
  },
  createCategories(name) {
    const url = '/api/category'
    return axiosClient.post(url, { name })
  },
  updateCategories(id, name) {
    const url = `/api/category/${id}`
    return axiosClient.put(url, { name })
  },
  deleteCategories(id) {
    const url = `/api/category/${id}`
    return axiosClient.delete(url)
  },
}

export default categoryApi
