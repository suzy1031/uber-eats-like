import React, { Fragment, useEffect, useReducer } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// components
import Skeleton from "@material-ui/lab/Skeleton";

// apis
import { fetchRestaurants } from "../apis/restaurants";

// images
import MainLogo from "../images/logo.png";
import MainCoverImage from "../images/main-cover-image.png";
import RestaurantImage from "../images/restaurant-image.jpg";

// reducers
import {
  initialState,
  restaurantsActionTypes,
  restaurantsReducer,
} from "../reducers/restaurants";

// contents
import { REQUEST_STATE } from "../constants";

export const Restaurants = () => {
  // 第一引数はreducer関数
  // 第二引数に初期値
  const [state, dispatch] = useReducer(restaurantsReducer, initialState);

  useEffect(() => {
    // fetch中なので処理を待っている状態
    dispatch({ type: restaurantsActionTypes.FETCHING });
    // apiからデータを取得
    fetchRestaurants().then((data) =>
      // データ取得が終了して、action.typeがfetch-successの状態
      dispatch({
        type: restaurantsActionTypes.FETCH_SUCCESS,
        payload: {
          // value: res.data.restaurantsの事
          // restaurantsList[]というinitialStateで定義された配列にセットされる
          restaurants: data.restaurants,
        },
      })
    );
  }, []);

  return (
    <Fragment>
      <HeaderWrapper>
        <MainLogoImage src={MainLogo} alt="main logo" />
      </HeaderWrapper>
      <MainCoverImageWrapper>
        <MainCover src={MainCoverImage} alt="main cover" />
      </MainCoverImageWrapper>
      <RestaurantsContentsList>
        {/* 三項演算子 条件式 ? true : false */}
        {state.fetchState === REQUEST_STATE.LOADING ? (
          <Fragment>
            <Skeleton variant="rect" width={450} height={300} />
            <Skeleton variant="rect" width={450} height={300} />
            <Skeleton variant="rect" width={450} height={300} />
          </Fragment>
        ) : (
          // state内で管理されているrestaurantList（apiでgetしたパラメータが格納）
          state.restaurantsList.map((item, index) => (
            <Link
              to={`/restaurants/${item.id}/foods`}
              key={index}
              style={{ textDecoration: "none" }}
            >
              <RestaurantsContentWrapper>
                <RestaurantsImageNode src={RestaurantImage} />
                <MainText>{item.name}</MainText>
                <SubText>{`配送料: ${item.fee}円 ${item.time_required}分`}</SubText>
              </RestaurantsContentWrapper>
            </Link>
          ))
        )}
      </RestaurantsContentsList>
    </Fragment>
  );
};

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 8px 32px;
`;

const MainLogoImage = styled.img`
  height: 90px;
`;

const MainCoverImageWrapper = styled.div`
  text-align: center;
`;

const MainCover = styled.img`
  height: 600px;
`;

const RestaurantsContentsList = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 150px;
`;

const RestaurantsContentWrapper = styled.div`
  width: 450px;
  height: 300px;
  padding: 48px;
`;

const RestaurantsImageNode = styled.img`
  width: 100%;
`;

const MainText = styled.p`
  color: black;
  font-size: 18px;
`;

const SubText = styled.p`
  color: black;
  font-size: 12px;
`;
