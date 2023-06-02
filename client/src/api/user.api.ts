import {data} from 'autoprefixer';
import {IAuthInfo} from '../types';
import axiosClient from './axiosClient';

export const userApi = {
  async register(data: IAuthInfo) {
    try {
      const url = '/auths/register';
      return await axiosClient.post(url, data);
    } catch (error: any) {
      return error.response.data;
    }
  },
  async login(data: IAuthInfo) {
    try {
      const url = '/auths/login';
      const res = await axiosClient.post(url, data);
      return res;
    } catch (error: any) {
      return error.response.data;
    }
  },
  async logout(id: string, token: string) {
    // send accessToken to server
    const url = `/auths/logout`;
    const res = await axiosClient.delete(url, {
      headers: {
        token: `Bearer ${token}`,
      },
      data: {id},
    });
    return res;
  },

  async refreshToken(token: string) {
    try {
      // send refresh_token to server to create a new access_token
      const url = '/auths/refresh-token';
      const res = await axiosClient.get(url, {
        headers: {
          token: `Bearer ${token}`,
        },
      });
      return res;
    } catch (error: any) {
      return error.response.data;
    }
  },
};
