import axiosClient from "./axiosClient";

export const collectionApi = {
  async getCollections(params) {
    const newParams = { ...params };

    const url = `/collections/`;

    const res = await axiosClient.get(url, {
      params: newParams,
    });

    return res;
  },
  getCollectionById(params) {
    const newParams = { ...params };
    newParams._start =
      !params._page || params._page <= 1
        ? 0
        : (params._page - 1) *
          (params._limit || 30);

    delete newParams.page;
    const url = `/collections/${params._id}?_start=${newParams._start}&_limit=${newParams._limit}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = "/collections";
    return axiosClient.post(url, data);
  },
  update(data) {
    const url = `/collections/${data._id}`;
    return axiosClient.patch(url, data);
  },
  remove(id) {
    const url = `/collections/${id}`;
    return axiosClient.delete(url);
  },
};
