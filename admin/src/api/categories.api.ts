import axios from "axios";
import { API_URL, token } from "../configs";
import { PaginateProps, CategoryProps } from "../types";

export const queryCategorySeletor = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/categories?all=true`);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const queryCategories = async (pagination: PaginateProps) => {
  try {
    const { data } = await axios.get(
      `${API_URL}/categories?page=${pagination.page}&size=${pagination.size}`
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const queryCategory = async (id: string | number) => {
  try {
    const { data } = await axios.get(`${API_URL}/categories/${id}`);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const addCategory = async (category: CategoryProps) => {
  try {
    const { data } = await axios.post(
      `${API_URL}/categories/create`,
      category,
      {
        headers: {
          token: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateCategory = async (category: CategoryProps) => {
  try {
    const { data } = await axios.put(`${API_URL}/categories/update`, category, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteCategoryById = async (id: string | number) => {
  try {
    const { data } = await axios.delete(`${API_URL}/categories/delete/${id}`, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    return error.response.data;
  }
};
