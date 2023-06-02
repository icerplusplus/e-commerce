import {objectToQueryParams} from "../libs";
import {IPaginate} from "../types";
import axiosClient from "./axiosClient";

export const categoryApi = {
  async getCategories(paginate: IPaginate) {
    const url = `/categories?${objectToQueryParams(paginate)}`;
    return await axiosClient.get(url);
  },
  async getCategoryById(id: string | number) {
    const url = `/categories/${id}`;
    return await axiosClient.get(url);
  },
  async getProductsByCategoryId(
    categoryId: string | number,
    paginate: IPaginate,
  ) {
    const url = `/products/conditions?${objectToQueryParams(paginate)}`;
    const data = {category_id: categoryId};
    return await axiosClient.post(url, data);
  },
  async getBrandsByCategoryId(categoryId: string) {
    const url = `/products/conditions`;
    const data = {
      category_id: categoryId,
      includes: ["brand_name"],
    };
    return await axiosClient.post(url, data);
  },
  async filterProducts(condition: any) {
    const url = `/products/filters`;
    return await axiosClient.post(url, condition);
  },
};
