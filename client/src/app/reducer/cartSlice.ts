import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [], //  {id, quantity, price, discount, state}
    size: 0,
    tmpTotal: 0,
    discount: 0,
    total: 0,
    quantityBuy: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const { id } = action.payload;
      const prodExisted = state.products.find((product) => product.id === id);

      prodExisted
        ? (state.products = state.products.map((product) =>
            product.id === id
              ? {
                  ...product,
                  quantity: product.quantity + 1,
                }
              : product
          ))
        : state.products.push(action.payload);

      state.size = state.products.length;
    },

    // UPDATE: quatity or state of that product
    updateCart: (state, action) => {
      state.products = action.payload;
    },
    updateQuantityById: (state, action) => {
      const { id, quantity } = action.payload;
      state.products = state.products.map((product) =>
        product.id === id
          ? {
              ...product,
              quantity: quantity,
            }
          : product
      );
    },

    updateStateOfItem: (state, action) => {
      const prod = action.payload;
      state.products = state.products.map((product) =>
        product.id === prod.id ? { ...product, state: prod.state } : product
      );
    },

    updateAllState: (state, action) => {
      const states = action.payload;
      console.log(states);
      state.products = state.products.map((product) => ({
        ...product,
        state: states,
      }));
    },

    removeById: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
      state.size = state.products.length;
    },

    removeAll: (state, action) => {
      state.products = [];
      state.size = state.products.length;
    },

    getTotal: (state, action) => {
      state.tmpTotal = state.products.reduce(
        (pre, cur) => (cur.state ? pre + cur.price * cur.quantity : pre),
        0
      );

      state.discount = state.products.reduce(
        (pre, cur) => (cur.state ? pre + cur.discount : 0),
        0
      );

      state.total = state.tmpTotal - state.discount;

      state.quantityBuy = state.products.reduce(
        (pre, cur) => (cur.state ? pre + 1 : pre),
        0
      );
    },
  },
});

const { actions, reducer } = cartSlice;

export const {
  addToCart,
  updateCart,
  updateQuantityById,
  updateStateOfItem,
  updateAllState,
  removeById,
  removeAll,
  getTotal,
} = actions;
export const cartReducer = reducer;
