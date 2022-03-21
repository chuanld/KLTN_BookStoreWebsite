const { default: axiosClient } = require('./axiosClient')
const commentApi = {
  updateRating(id, rating) {
    const url = `/api/rating/${id}`
    return axiosClient.patch(url, { rating })
  },
  getComments(id, queryParams) {
    const url = `/api/comments/${id}`
    return axiosClient.get(url, { params: { ...queryParams } })
  },
}

export default commentApi
