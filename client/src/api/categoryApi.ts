import axiosClient from "./axiosClient";

export const categoryApi = {
  getCategories(params) {
    const url = `/categories/`;
    return axiosClient.get(url);
  },
  getCategoryById(id) {
    const url = `/categories/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = "/categories";
    return axiosClient.post(url, data);
  },
  update(data) {
    const url = `/categories/${data._id}`;
    return axiosClient.patch(url, data);
  },
  remove(id) {
    const url = `/categories/${id}`;
    return axiosClient.delete(url);
  },
};

