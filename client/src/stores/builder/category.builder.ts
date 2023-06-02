import {ActionReducerMapBuilder} from '@reduxjs/toolkit';
import {ICategoryReducer} from '../../types';
import {categoryAsyncThunks} from '../reducer';

export const categoryBuilder = (
  builder: ActionReducerMapBuilder<ICategoryReducer>,
) => {
  builder.addCase(categoryAsyncThunks.queryCategories.pending, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  });
  // Add categories data to the state
  builder.addCase(
    categoryAsyncThunks.queryCategories.fulfilled,
    (state, action) => {
      return {
        ...state,
        data: action?.payload?.categories,
        paginate: action?.payload?.pagination,
        isLoading: false,
      };
    },
  );
  builder.addCase(categoryAsyncThunks.queryCategories.rejected, (state) => {
    return {
      ...state,
      isLoading: false,
    };
  });
};
