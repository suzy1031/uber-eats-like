import axios from "axios";
import { foodsIndex } from "../urls/index";

// localhost:3000/restaurants/1/foodsというパスが返ってくる
// axios.get(http://localhost:3000/api/v1/foods?restaurant_id=1)とリクエストをapiに投げる
// propsでrestaurantIdを渡しパスにマッチさせる
export const fetchFoods = async (restaurantId) => {
  try {
    const res = await axios.get(foodsIndex(restaurantId));
    return res.data;
  } catch (e) {
    return console.log(e);
  }
};
