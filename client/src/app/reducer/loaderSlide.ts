import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
  name: "loader",
  initialState: {
    isLoading: false,
  },
  reducers: {
    turnOnLoader: (state, action) => {
      state.isLoading = true;
    },
    turnOffLoader: (state, action) => {
      state.isLoading = false;
    },
  },
});
const { actions, reducer } = loaderSlice;
export const { turnOnLoader, turnOffLoader } = actions;
export const loaderReducer = reducer;
