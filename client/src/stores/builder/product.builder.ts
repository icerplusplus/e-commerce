import {ActionReducerMapBuilder} from '@reduxjs/toolkit';
import {productAsyncThunk} from '../reducer';
import {IProductReducer} from '../../types';

export const productBuilder = (
  builder: ActionReducerMapBuilder<IProductReducer>,
) => {
  builder.addCase(productAsyncThunk.getProductById.pending, (state, action) => {
    return {
      ...state,
      isLoading: true,
      error: {
        isError: false,
        message: '',
      },
    };
  });
  // Add data to the state
  builder.addCase(
    productAsyncThunk.getProductById.fulfilled,
    (state, action) => {
      return {
        ...state,
        data: {
          products: state?.data?.products,
          productDetail: action?.payload?.data,
        },
        isLoading: false,
      };
    },
  );
  builder.addCase(
    productAsyncThunk.getProductById.rejected,
    (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: {
          isError: true,
          message: action.error.message,
        },
      };
    },
  );
};
