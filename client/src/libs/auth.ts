import { userApi } from "../api";
import {
  loginFulfilled,
  loginPending,
  loginRejected,
  logoutFulfilled,
  registerFulfilled,
  registerPending,
  registerRejected,
} from "../app/reducer";
import { errorToast, successToast } from "./toast";

export const registerAction = async (payload, dispatch, callback) => {
  dispatch(registerPending());
  try {
    const newUser = await userApi.register(payload);

    // save data to local storage
    localStorage.setItem("USER_INFO", JSON.stringify(newUser));
    await dispatch(registerFulfilled(newUser));
    successToast({
      title: "Account has been registered. Please log in here !",
    });

    callback && callback();

    return newUser;
  } catch (error) {
    dispatch(registerRejected());

    // SHOW TOASTIFY
    errorToast({
      title: error.response.data.message || "Failed to register.",
    });

    console.log(error);
  }
};
export const loginAction = async (payload, dispatch, callback) => {
  dispatch(loginPending());
  try {
    const response = await userApi.login(payload);

    const { accessToken, ...info } = response;
    console.log("typeof info: ", typeof info);

    // SAVE USER INFO TO LOCAL STORAGE
    localStorage.setItem("USER_INFO", JSON.stringify(response));

    // CALL loginFulfilled function to save data to user store
    await dispatch(loginFulfilled(response));

    // CLOSE LOGIN POPUP
    callback && callback();

    // SHOW TOASTIFY
    successToast({ title: "Login Successful" });

    return response;
  } catch (error) {
    dispatch(loginRejected());

    // SHOW TOASTIFY
    errorToast({
      title: error.response.data.message || "Username or password invalid!",
    });

    console.log("login error: ", error);
  }
};
export const logoutAction = async (
  payload,
  dispatch,
  callback,
  interceptor
) => {
  try {
    await userApi.logout(payload, interceptor);

    // REMOVE USER INFO FROM LOCAL STORAGE
    localStorage.removeItem("USER_INFO");

    // UPDATE STATE IN STORE
    await dispatch(logoutFulfilled());

    // CLOSE USER OPTIONS
    callback && callback();

    // SHOW TOASTIFY
    successToast({ title: "Logout successful" });
  } catch (error) {
    // SHOW TOASTIFY
    errorToast({
      title: error?.response?.data.message || "Logout failed!",
    });
    console.log("error in logout action: ", error);
  }
};
