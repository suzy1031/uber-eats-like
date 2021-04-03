import axios from "axios";
import { lineFoods, lineFoodsReplace } from "../urls/index";

// paramsとして渡す事でサーバ側ではparams[:food_id], params[:count]と受け取れる
export const postLineFoods = async (params) => {
  try {
    const res = await axios.post(lineFoods, {
      food_id: params.foodId,
      count: params.count,
    });
    return res.data;
  } catch (e) {
    throw e;
  }
};

export const replaceLineFoods = async (params) => {
  try {
    const res = await axios.put(lineFoodsReplace, {
      food_id: params.foodId,
      count: params.count,
    });
    return res.data;
  } catch (e) {
    throw e;
  }
};

export const fetchLineFoods = async () => {
  try {
    const res = await axios.get(lineFoods);
    return res.data;
  } catch (e) {
    throw e;
  }
};
