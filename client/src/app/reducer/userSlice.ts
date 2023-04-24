import { createSlice } from "@reduxjs/toolkit";
import { REHYDRATE } from "redux-persist";

const userSlice = createSlice({
  name: "user",
  initialState: {
    info: null,
    isLoading: false,
    error: {
      status: false,
      message: "",
    },
  },
  reducers: {
    registerPending: (state, action) => {
      state.isLoading = true;
    },
    registerFulfilled: (state, action) => {
      state.info = action.payload;
      state.isLoading = false;
      state.error.status = false;
      state.error.message = "";
    },
    registerRejected: (state, action) => {
      state.info = null;
      state.isLoading = false;
      state.error.status = true;
      state.error.message = action.payload?.message || "Failed to register";
    },
    loginPending: (state, action) => {
      state.isLoading = true;
    },
    loginFulfilled: (state, action) => {
      state.info = action.payload;
      state.isLoading = false;
      state.error.status = false;
      state.error.message = "";
    },
    loginRejected: (state, action) => {
      state.info = null;
      state.isLoading = false;
      state.error.status = true;
      state.error.message = "Failed to login";
    },
    logoutFulfilled: (state, action) => {
      state.info = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(REHYDRATE, (state) => {});
  },
});
const { actions, reducer } = userSlice;
export const {
  registerPending,
  registerFulfilled,
  registerRejected,
  loginPending,
  loginFulfilled,
  loginRejected,
  logoutFulfilled,
} = actions;

export const userReducer = reducer;
