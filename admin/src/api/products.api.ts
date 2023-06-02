import axios from "axios";
import { API_URL, token } from "../configs";

export const queryProducts = async ({ page = 1, size = 10 }) => {
  try {
    const { data } = await axios.get(
      `${API_URL}/products?page=${page}&size=${size}`
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const queryProduct = async (id: string | number) => {
  try {
    const { data } = await axios.get(`${API_URL}/products/${id}`);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

const changeObjectToQueryParams = (obj) => {
  return Object.keys(obj)
    .map((item, index) => item + "=" + Object.values(obj)[index])
    .join("&");
};

export const queryProductsByCondition = async (condition) => {
  try {
    const { data } = await axios.get(
      `${API_URL}/products/conditions?${changeObjectToQueryParams(condition)}`
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateProductById = async (infos: unknown) => {
  try {
    const { data } = await axios.put(`${API_URL}/products/update`, infos, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const queryProductInfoByProductId = async (id: string) => {
  try {
    const { data } = await axios.get(`${API_URL}/products/infos/${id}`);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const addProductInfoById = async (infos: any) => {
  try {
    const { data } = await axios.post(
      `${API_URL}/products/info/create`,
      infos,
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

export const updateProductInfoById = async (infos: any) => {
  try {
    const { data } = await axios.put(`${API_URL}/products/info/update`, infos, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteProductInfoById = async (infoId: string | number) => {
  try {
    const { data } = await axios.delete(
      `${API_URL}/products/info/delete-by-conditions`,
      {
        data: { id: infoId },
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
export const deleteProductById = async (id: string | number) => {
  try {
    const { data } = await axios.delete(`${API_URL}/products/delete/${id}`, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const addProduct = async (product) => {
  try {
    const { data } = await axios.post(`${API_URL}/products/create`, product, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    return error.response.data;
  }
};
