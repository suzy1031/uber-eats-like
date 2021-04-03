import { REQUEST_STATE } from "../constants";
// 初期化
export const initialState = {
  fetchState: REQUEST_STATE.INITIAL,
  restaurantsList: [],
};
// action.typeの定義
export const restaurantsActionTypes = {
  FETCHING: "FETCHING",
  FETCH_SUCCESS: "FETCH_SUCCESS",
};

export const restaurantsReducer = (state, action) => {
  switch (
    action.type // action.typeの値が以下の場合で処理を変える
  ) {
    case restaurantsActionTypes.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING,
      };
    case restaurantsActionTypes.FETCH_SUCCESS:
      return {
        fetchState: REQUEST_STATE.OK,
        restaurantsList: action.payload.restaurants, // apiからのデータを受け取り配列にセット
      };
    default:
      throw new Error();
  }
};
