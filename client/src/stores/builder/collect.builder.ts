import {ActionReducerMapBuilder} from '@reduxjs/toolkit';
import {ICollectReducer} from '../../types';
import {collectAsyncThunks} from '../reducer';

export const collectyBuilder = (
  builder: ActionReducerMapBuilder<ICollectReducer>,
) => {
  builder.addCase(collectAsyncThunks.queryCollects.pending, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  });
  // Add data to the state
  builder.addCase(
    collectAsyncThunks.queryCollects.fulfilled,
    (state, action) => {
      return {
        ...state,
        data: action?.payload?.collects,
        paginate: action?.payload?.pagination,
        isLoading: false,
      };
    },
  );
  builder.addCase(collectAsyncThunks.queryCollects.rejected, (state) => {
    return {
      ...state,
      isLoading: false,
    };
  });
};
