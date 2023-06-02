import axios, {AxiosResponse} from 'axios';
import {userApi} from './user.api';
import {Cookies} from '../utils/helpers';

const localApi = 'http://localhost:9999/api';
const herokuApi = 'https://agnes-shop-api.herokuapp.com/api';
const onrenderApi = 'https://agnes-shop-api.onrender.com/api';

interface IResponseInterceptor {
  refresh_token: string;
  access_token: string;
  exp: number;
}

let axiosClient = axios.create({
  baseURL: localApi,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers':
      'X-Requested-With, content-type, Authorization',
  },
});

// Interceptors

// Add a request interceptor

// Add a response interceptor
axiosClient.interceptors.response.use(
  async function (response) {
    const config = response.config;
    if (
      (config.url && config.url?.indexOf('/auths/refresh-token') >= 0) ||
      !config.headers.token
    ) {
      return response.data;
    }
    const {status, message} = response.data;
    if (status && status === 401) {
      if (message.toString().toLowerCase() === 'token expired!') {
        // TODO: get refresh token from cookie
        const token = Cookies.getCookie('refresh_token');

        // TODO: refresh token from server
        const res = await userApi.refreshToken(token);
        const {refresh_token, access_token, exp} = res.data;
        if (access_token) {
          // TODO: replace access_token to header
          config.headers['token'] = access_token;

          // TODO: save access/refresh token to cookie
          Cookies.setCookie('access_token', access_token, exp);
          Cookies.setCookie('refresh_token', refresh_token, exp);

          return axiosClient(config);
        }
      }
    }

    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    return Promise.reject(error);
  },
);

export default axiosClient;
