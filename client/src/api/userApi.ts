import axiosClient from "./axiosClient";

export const userApi = {
  register(data) {
    const url = "/auth/register";
    console.log("user in userApi file: ", data);
    return axiosClient.post(url, data);
  },
  login(data) {
    const url = "/auth/login";
    const res = axiosClient.post(url, data);
    console.log("payload: ", res);
    return res;
  },
  refreshToken() {
    // send accessToken to server
    const url = "/auth/refresh";
    const res = axiosClient.post(url, {
      withCredentials: true,
    });
    return res;
  },
  async logout(headers, requestInterceptor) {
    console.log("logout data in userApi file: ", headers);
    // send accessToken to server
    const url = `/auth/logout`;
    const res = requestInterceptor.post(url, {}, headers);
    console.log("response data in userApi file: ", res);
    return res;
  },
};
