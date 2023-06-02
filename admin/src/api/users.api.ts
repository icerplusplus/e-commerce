import axios from "axios";
import { API_URL, token } from "../configs";
import { UserType } from "../types";

export const queryUsers = async ({ page = 1, size = 10 }) => {
  try {
    const { data } = await axios.get(
      `${API_URL}/users?page=${page}&size=${size}`
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const findUserById = async (id: string | number) => {
  try {
    const { data } = await axios.get(`${API_URL}/users/${id}`);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const addUser = async (user: UserType) => {
  try {
    const { data } = await axios.post(`${API_URL}/users/create`, user, {
      headers: {
        token: `Breaer ${token}`,
      },
    });

    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateUserById = async (user: UserType) => {
  try {
    const { data } = await axios.put(`${API_URL}/users/update`, user, {
      headers: {
        token: `Breaer ${token}`,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export const deleteUserById = async (id: string | number) => {
  try {
    const { data } = await axios.delete(`${API_URL}/users/delete/${id}`, {
      headers: {
        token: `Breaer ${token}`,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
