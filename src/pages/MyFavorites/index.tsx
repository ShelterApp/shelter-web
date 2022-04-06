import React, { lazy } from "react";

import {
  GET_MY_FAVORITES_REQUEST,
  SET_MY_FAVORITES
} from "redux/reducers/service/actionTypes";
import { push } from "connected-react-router";

import { reducerType } from "redux/reducers";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ServiceProps } from "common/";
import { ICoords } from "redux/reducers/service";

import HeaderBarSub from "components/HeaderBarSub";
import Loading from "components/Loading";

import MyFavoritesContainer from "containers/MyFavoritesContainer";

const GridFullHeight = lazy(() => import("components/GridFullHeight"));
const GridFormContainer = lazy(() => import("components/GridFormContainer"));

interface MyFavoritesProps {
  dispatch: Dispatch;
  myFavorites: ServiceProps[];
  loading: boolean;
  currentLocation: ICoords;
  loadingLocation: boolean;
}

const mapStateToProps = (state: reducerType) => {
  return {
    myFavorites: state.service.myFavorites,
    loading: state.service.loading,
    currentLocation: state.service.currentLocation,
    loadingLocation: state.service.loadingLocation
  };
};

const MyFavorites = React.memo((props: MyFavoritesProps) => {
  const {
    dispatch,
    loading,
    myFavorites,
    currentLocation,
    loadingLocation
  } = props;

  React.useEffect(() => {
    if (loadingLocation) return;
    const afterRes = JSON.parse(localStorage.getItem("@shelter_favorite"));
    if (!afterRes || (afterRes && afterRes.length === 0)) return;
    console.log(props);
    const { longitude, latitude } = currentLocation;

    const obj = {
      filter: "_id,isApproved",
      _id: afterRes.join(","),
      limit: 0,
      skip: 0,
      isApproved: true
    } as any;

    if (currentLocation && !(longitude === 0 && latitude === 0)) {
      obj.currentCoordinate = [longitude, latitude].join("|");
      obj.filter = `${obj.filter},currentCoordinate`;
    }

    dispatch({
      type: GET_MY_FAVORITES_REQUEST,
      params: obj
    });
    // eslint-disable-next-line
  }, [loadingLocation]);

  const handleDelete = id => {
    const afterRes = JSON.parse(localStorage.getItem("@shelter_favorite"));
    if (!afterRes || (afterRes && afterRes.length === 0)) return;
    if (afterRes && afterRes.length === 1) {
      localStorage.removeItem("@shelter_favorite");
    } else {
      localStorage.setItem(
        "@shelter_favorite",
        JSON.stringify(afterRes.filter(fil => fil !== id))
      );
    }
    const newMyFavorites = myFavorites.filter(service => service.id !== id);
    dispatch({
      type: SET_MY_FAVORITES,
      services: newMyFavorites
    });
  };

  const openUrl = url => {
    dispatch(push(url));
  };

  return (
    <GridFullHeight container>
      <GridFormContainer item xs={12} sm={12} md={12}>
        <GridFullHeight container>
          <HeaderBarSub openUrl={openUrl} isSearch name="My Favorites" />
          {loading || loadingLocation ? (
            <Loading />
          ) : (
            <>
              <MyFavoritesContainer
                handleDelete={handleDelete}
                currentLocation={currentLocation}
                myFavorites={myFavorites}
                openUrl={openUrl}
              />
            </>
          )}
        </GridFullHeight>
      </GridFormContainer>
    </GridFullHeight>
  );
});

export default connect(mapStateToProps)(MyFavorites);
