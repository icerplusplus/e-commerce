import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ICollectReducer, IPaginate} from '../../types';
import {collectionApi} from '../../api';
import {collectyBuilder} from '../builder';
import {RootState} from '../store';

const initialState: ICollectReducer = {
  data: [],
  isLoading: false,
  paginate: {
    page: 0,
    size: 16,
  },
};

const collectSlice = createSlice({
  name: 'collects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    collectyBuilder(builder);
  },
});

// Async thunk function
export const collectAsyncThunks = {
  queryCollects: createAsyncThunk(
    'categories/collectAsyncThunks.queryCollects',
    async (paginate: IPaginate) => {
      const {data} = await collectionApi.getCollections(paginate);
      return data;
    },
  ),
};

const {actions, reducer} = collectSlice;

// selectors
export const selectCollects = (state: RootState) => state?.collects;

export const collectReducer = reducer;
