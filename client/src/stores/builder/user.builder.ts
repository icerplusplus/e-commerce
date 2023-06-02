import {
  ActionReducerMapBuilder,
  PayloadAction,
  PayloadActionCreator,
} from '@reduxjs/toolkit';
import {IResponseSuccess, IUserReducer} from '../../types';
import {userAsyncThunks} from '../reducer';
import {Cookies} from '../../utils/helpers';

export const userBuilder = (builder: ActionReducerMapBuilder<IUserReducer>) => {
  // login builder
  builder.addCase(userAsyncThunks.login.pending, (state, action) => ({
    ...state,
    isLoading: true,
    isAuthenticateSuccess: false,
    isError: false,
    message: '',
  }));
  builder.addCase(userAsyncThunks.login.fulfilled, (state, action) => {
    const {message, data} = action.payload;

    // TODO: set access token and refresh token to cookie
    Cookies.setCookie('refresh_token', data.refresh_token, data.exp);
    Cookies.setCookie('access_token', data.access_token, data.exp);

    delete data.refresh_token;
    delete data.access_token;

    return {
      ...state,
      data: data,
      isLoading: false,
      isAuthenticateSuccess: true,
      isError: false,
      message: message,
    };
  });
  builder.addCase(userAsyncThunks.login.rejected, (state, action) => ({
    ...state,
    isLoading: false,
    isError: true,
    message: action.error.message,
  }));

  // register builder
  builder.addCase(userAsyncThunks.register.pending, (state, action) => ({
    ...state,
    isLoading: true,
    isAuthenticateSuccess: false,
    isError: false,
    message: '',
  }));
  builder.addCase(userAsyncThunks.register.fulfilled, (state, action) => {
    const {message, data} = action.payload;
    return {
      ...state,
      data: data,
      isLoading: false,
      isAuthenticateSuccess: true,
      isError: false,
      message: message,
    };
  });
  builder.addCase(userAsyncThunks.register.rejected, (state, action) => ({
    ...state,
    isLoading: false,
    isError: true,
    message: action.error.message,
  }));

  // logout builder
  builder.addCase(userAsyncThunks.logout.pending, (state, action) => ({
    ...state,
    isLoading: true,
    isError: false,
    message: '',
  }));
  builder.addCase(userAsyncThunks.logout.fulfilled, (state, action) => {
    const {data, status, message} = action.payload;
    return {
      ...state,
      data: undefined,
      isLoading: false,
      isAuthenticateSuccess: false,
      isError: false,
      message: message,
    };
  });
  builder.addCase(userAsyncThunks.logout.rejected, (state, action) => ({
    ...state,
    isLoading: false,
    isError: true,
    message: action.error.message,
  }));
};
