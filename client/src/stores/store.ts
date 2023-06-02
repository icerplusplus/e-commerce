import {combineReducers, configureStore} from '@reduxjs/toolkit';

import {
  persistStore,
  persistReducer,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {
  cartReducer,
  categoryReducer,
  loaderReducer,
  userReducer,
  collectReducer,
  productReducer,
} from './reducer';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['user', 'cart'],
  blacklist: ['loader', 'categories', 'collects, products'],
};

const rootReducer = combineReducers({
  user: userReducer,
  loader: loaderReducer,
  cart: cartReducer,
  categories: categoryReducer,
  collects: collectReducer,
  products: productReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>; // A global type to access reducers types
export type AppDispatch = typeof store.dispatch; // Type to access dispatch

export let persistor = persistStore(store);
