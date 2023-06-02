import axiosClient, {
  ApiResponse,
} from "./axiosClient";

export const productApi = {
  // async getProducts(params) {
  //   const url = `/products/`;
  //   const data = await axiosClient.get(url);
  //   return data;
  // },
  async getProductById(id: string | number) {
    try {
      const url = `/products/${id}`;
      const response = await axiosClient.get(url);
      return response;
    } catch (error: any) {
      return error?.response?.data;
    }
  },
  // async getProductsByCategoryId(id, params) {
  //   // Transform _page to _start
  //   const newParams = { ...params };
  //   newParams._start =
  //     !params._page || params._page <= 1
  //       ? 0
  //       : (params._page - 1) * (params._limit || 40);

  //   // // Remove un-needed key
  //   // delete newParams._page;

  //   const url = `/products/category/${id}`;
  //   const data = await axiosClient.get(url, {
  //     params: newParams,
  //   });
  //   return data;
  // },
  // async add(product) {
  //   const url = "/products";
  //   const data = await axiosClient.post(url, product);
  //   return data;
  // },
  // async update(product) {
  //   const url = `/products/${product._id}`;
  //   const data = await axiosClient.patch(url, product);
  //   return data;
  // },
  // async remove(id) {
  //   const url = `/products/${id}`;
  //   const data = await axiosClient.delete(url);
  //   return data;
  // },
};
