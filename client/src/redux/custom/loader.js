import {
  turnOnLoader,
  turnOffLoader,
} from "../loaderSlide";

export const onLoading = async (dispatch) => {
  dispatch(turnOnLoader());
};
export const offLoading = async (dispatch) => {
  dispatch(turnOffLoader());
};
