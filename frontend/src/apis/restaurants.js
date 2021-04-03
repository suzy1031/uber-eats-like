import axios from "axios";
import { restaurantsIndex } from "../urls/index";

export const fetchRestaurants = async () => {
  try {
    const res = await axios.get(restaurantsIndex);
    return res.data;
  } catch (e) {
    return console.log(e);
  }
};
