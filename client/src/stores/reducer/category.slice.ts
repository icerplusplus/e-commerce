import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ICategoryReducer, IPaginate} from '@/types';
import {categoryApi} from '@/api';
import {categoryBuilder} from '@/stores/builder';
import {RootState} from '@/stores/store';

const initialState: ICategoryReducer = {
  data: [],
  isLoading: false,
  paginate: {
    page: 0,
    size: 20,
  },
};
const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    categoryBuilder(builder);
  },
});

// Async thunk function
export const categoryAsyncThunks = {
  queryCategories: createAsyncThunk(
    'categories/categoryAsyncThunks.queryCategories',
    async (paginate: IPaginate) => {
      const {data} = await categoryApi.getCategories(paginate);
      return data;
    },
  ),
};

const {actions, reducer} = categorySlice;

// export const {} = actions;

// selectors
export const selectCategories = (state: RootState) => state?.categories;

export const categoryReducer = reducer;
