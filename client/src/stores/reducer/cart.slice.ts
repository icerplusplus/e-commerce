import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ICartReducer, IProduct, IProductReducer} from '../../types';
import {RootState} from '../store';

const initial: ICartReducer = {
  products: [],
  isLoading: false,
  size: 0,
  tmpTotal: 0,
  discount: 0,
  total: 0,
  quantityBuy: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initial,
  reducers: {
    addToCart: (state, action) => {
      const {id} = action.payload;
      const index =
        state?.products?.findIndex((product: IProduct) => product?.id === id) ||
        0;
      // TODO: +1 if product is already exists, else pust it to state products
      if (index >= 0) {
        const newProducts = state?.products?.filter(
          (item, idx) => idx !== index,
        );

        const productExist = state?.products?.find((item) => item?.id === id);

        const newItem = {
          ...productExist,
          quantity: productExist?.quantity
            ? productExist?.quantity + action.payload?.quantity
            : 1,
        } as IProduct;
        newProducts?.push(newItem);
        return {
          ...state,
          products: newProducts,
          size: newProducts?.length,
        };
      } else {
        let products = [] as IProduct[];
        if (state.products) products = [...state.products, action.payload];
        return {
          ...state,
          products: products,
          size: products?.length,
        };
      }
    },

    // UPDATE: quatity or state of that product
    updateCart: (state, action) => ({
      ...state,
      products: action.payload,
    }),
    updateQuantityById: (state, action) => {
      const {id, quantity} = action.payload;

      const newProducts = state?.products?.map((product) => {
        if (product.id === id)
          return {
            ...product,
            quantity: quantity,
          };
        return product;
      });

      return {
        ...state,
        products: newProducts,
      };
    },

    updateStateOfItem: (state, action) => {
      const prod = action.payload;
      const newProducts = state?.products?.map((product) =>
        product.id === prod.id ? {...product, state: prod.state} : product,
      );
      return {
        ...state,
        products: newProducts,
      };
    },

    updateAllState: (state, action) => {
      const states = action.payload;
      const newProducts = state?.products?.map((product) => ({
        ...product,
        state: states,
      }));
      return {
        ...state,
        products: newProducts,
      };
    },

    removeCartItemById: (state, action) => {
      const newProducts = state?.products?.filter(
        (product) => product.id !== action.payload,
      );

      return {
        ...state,
        products: newProducts,
        size: newProducts?.length,
      };
    },

    removeAllItemsInCart: (state) => ({
      ...state,
      products: [],
      size: 0,
      discount: 0,
      quantityBuy: 0,
      tmpTotal: 0,
      total: 0,
    }),

    getTotal: (state) => {
      const tmpTotal =
        state?.products?.reduce((pre, cur) => {
          const price = cur?.sale_price || cur?.root_price || 0;
          const quantity = cur?.quantity || 1;
          if (cur?.state) return pre + price * quantity;
          return pre;
        }, 0) || 0;

      const discount =
        state?.products?.reduce((pre, cur) => {
          if (cur.state) return pre + cur.discount * cur.quantity;
          return pre;
        }, 0) || 0;

      const quantityBuy = state.products?.reduce(
        (pre, cur) => (cur.state ? pre + 1 : pre),
        0,
      );

      return {
        ...state,
        tmpTotal: tmpTotal,
        discount: discount,
        total: tmpTotal - discount,
        quantityBuy: quantityBuy,
      };
    },
  },
});

const {actions, reducer} = cartSlice;

export const {
  addToCart,
  updateCart,
  updateQuantityById,
  updateStateOfItem,
  updateAllState,
  removeCartItemById,
  removeAllItemsInCart,
  getTotal,
} = actions;

// selectors
export const selectDataInCart = (state: RootState) => state.cart;

export const cartReducer = reducer;
