import axios from "axios";
import { API_URL, token } from "../configs";
import { CollectType } from "../types";

export const queryCollects = async ({ page = 1, size = 20 }) => {
  try {
    const { data } = await axios.get(
      `${API_URL}/collects?page=${page}&size=${size}`
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const queryCollect = async (id: string | number) => {
  try {
    const { data } = await axios.get(`${API_URL}/collects/${id}`);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateCollect = async (collect: CollectType) => {
  try {
    const { data } = await axios.put(`${API_URL}/collects/update`, collect, {
      headers: {
        token: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    return error.response.data;
  }
};
export const createCollect = async (collect: CollectType) => {
  try {
    const { data } = await axios.post(`${API_URL}/collects/create`, collect, {
      headers: {
        token: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteCollect = async (id: string | number) => {
  try {
    const { data } = await axios.delete(`${API_URL}/collects/delete/${id}`, {
      headers: {
        token: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    return error.response.data;
  }
};
