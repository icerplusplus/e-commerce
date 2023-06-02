import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {IApiSuccess, IProductReducer} from '../../types';
import {RootState} from '../store';
import {productApi} from '../../api';
import {productBuilder} from '../builder';

const initialState: IProductReducer = {
  data: {
    productDetail: {},
    products: [],
  },
  isLoading: false,
  paginate: {
    page: 0,
    size: 24,
  },
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // TODO: create builder for call api
    productBuilder(builder);
  },
});

// TODO: create async thunk for call api
export const productAsyncThunk = {
  getProductById: createAsyncThunk(
    'products/productAsyncThunk.getProductById',
    async (id: string | number) => {
      const response: IApiSuccess = await productApi.getProductById(id);
      return response;
    },
  ),
};

export const {} = productSlice?.actions;

export const productReducer = productSlice?.reducer;

// TODO: create selector for get data
export const selectProducts = (state: RootState) => state?.products;
