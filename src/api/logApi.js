const { default: axiosClient } = require('./axiosClient')
const logApi = {
  getNotiLog() {
    const url = '/api/log'
    return axiosClient.get(url)
  },
  updateLogById(id) {
    const url = `/api/log/${id}`
    return axiosClient.patch(url)
  },
}
export default logApi
