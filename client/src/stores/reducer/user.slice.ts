import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {IAuthInfo, IUser, IUserReducer} from '../../types';
import {userBuilder} from '../builder';
import {userApi} from '@/api';
import {RootState} from '../store';
import {Cookies} from '@/utils/helpers';

const initialState: IUserReducer = {
  data: {} as IUser,
  isLoading: false,
  isAuthenticateSuccess: false,
  isError: false,
  message: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    userBuilder(builder);
  },
});

// Async thunk function
export const userAsyncThunks = {
  login: createAsyncThunk(
    'user/userAsyncThunks.login',
    async (info: IAuthInfo) => {
      const res = await userApi.login(info);
      return res;
    },
  ),
  register: createAsyncThunk(
    'user/userAsyncThunks.register',
    async (info: IAuthInfo) => {
      const res = await userApi.register(info);
      return res;
    },
  ),
  logout: createAsyncThunk(
    'user/userAsyncThunks.logout',
    async (userId: string) => {
      const token = Cookies.getCookie('access_token');
      const res = await userApi.logout(userId, token);
      const {data, status} = res;
      // @ts-ignore
      return {data, status, message: res?.message};
    },
  ),
};

const {actions, reducer} = userSlice;

export const selectUserInfo = (state: RootState) => state.user;

export const userReducer = reducer;
