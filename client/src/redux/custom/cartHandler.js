import {
  addToCart,
  updateCart,
  removeById,
  removeAll,
  getTotal,
  updateQuantityById,
  updateStateOfItem,
  updateAllState

} from "../../app/reducer/cartSlice";

export const addProductToCart = async (
  dispatch,
  payload,
) => {
  await dispatch(addToCart(payload));
};

export const removeProductById = async (
  dispatch,
  payload
) => {
  await dispatch(removeById(payload));
};

export const removeAllProduct = async (
  dispatch,
) => {
  await dispatch(removeAll());
};
export const updateQuantity = async (
  dispatch,
  payload
) => {
  await dispatch(updateQuantityById(payload));
};
export const updateStateOfProducts = async (
  dispatch,
  payload
) => {
  await dispatch(updateStateOfItem(payload));
};
export const updateAllStateOfProducts = async (
  dispatch,
  payload
) => {
  await dispatch(updateAllState(payload));
};
export const getBiller = async (
  dispatch
) => {
  await dispatch(getTotal());
};

