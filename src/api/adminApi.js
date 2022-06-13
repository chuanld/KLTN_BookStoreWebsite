const { default: axiosClient } = require("./axiosClient");
const adminApi = {
  getListAccount(queryParams) {
    const url = "/user/all_infor";
    return axiosClient.get(url, { params: { ...queryParams } });
  },
  getInfoById(id) {
    const url = `/user/infor_byId/${id}`;
    return axiosClient.get(url);
  },
  updateAccounts(id, values) {
    const url = `/user/all_update/${id}`;
    const { name, address, phone, role } = values;
    return axiosClient.patch(url, { name, address, phone, role });
  },
  createAccount(values) {
    const url = "/user/create_infor";
    const { email, name, phone, address, password, role } = values;
    return axiosClient.post(url, {
      email,
      name,
      phone,
      address,
      password,
      role,
    });
  },
  getListProduct(queryParams) {
    const url = "/api/products";
    return axiosClient.get(url, { params: { ...queryParams } });
  },
  getAllProducts() {
    const url = "/api/allproducts";
    return axiosClient.get(url);
  },
  getProductById(id) {
    const url = `/api/products/${id}`;
    return axiosClient.get(url);
  },
  uploadImg(formData) {
    const url = "/api/upload";
    return axiosClient.post(url, formData, {
      headers: { "content-type": "multipart/form-data" },
    });
  },
  removeImg(img_public_id) {
    const url = "/api/destroy";
    return axiosClient.post(url, { public_id: img_public_id });
  },
  updateProduct(id, product, images) {
    const url = `/api/products/${id}`;
    return axiosClient.put(url, { ...product, images });
  },
  addProduct(product, images) {
    const url = `/api/products`;
    return axiosClient.post(url, { ...product, images });
  },
  removeProduct(id) {
    const url = `/api/products/${id}`;
    return axiosClient.delete(url);
  },
  getOrders(queryParams) {
    const url = "/api/order";
    console.log(queryParams, "query order");
    return axiosClient.get(url, { params: { ...queryParams } });
  },
  updateStatus(id, status) {
    const url = `/api/order/${id}`;
    return axiosClient.patch(url, { status });
  },
  eventDiscount(formValues) {
    const url = "/api/products/event_disc";
    return axiosClient.patch(url, { formValues });
  },
  getAnalytic(start, end) {
    const url = `/api/analytic?start=${start}&end=${end}`;
    return axiosClient.get(url);
  },
};
export default adminApi;
