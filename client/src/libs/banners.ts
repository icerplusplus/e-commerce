import axios from "axios";
import { BANNERS_URL, PROMOTION_BANNERS_URL } from "../configs";

export const getBanners = async () => {
  try {
    const { data } = await axios.get(BANNERS_URL);
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPromotionBanners = async () => {
  try {
    const { data } = await axios.get(PROMOTION_BANNERS_URL);
    return data.main_content;
  } catch (error) {
    console.log(error);
  }
};
