const { default: axiosClient } = require('./axiosClient');
const categoryApi = {
  getCategories() {
    const url = '/api/category';
    return axiosClient.get(url);
  },
};

export default categoryApi;
