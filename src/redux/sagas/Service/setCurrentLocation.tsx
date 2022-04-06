import { put, takeLatest, select } from "redux-saga/effects";
import * as types from "redux/reducers/service/actionTypes";
import { getQueryService } from "./getServices";
import { QueryServiceProps, addFilter, removeFilter } from "common/";

function* setCurrentLocation(action) {
  try {
    let _query: QueryServiceProps = yield select(getQueryService);
    yield put({ type: types.SET_LOADING_LOCATION, loading: true });
    yield put({
      type: types.SET_CURRENT_LOCATION,
      currentLocation: action.currentLocation
    });
    delete _query.sort;
    if (action.currentLocation) {
      _query = addFilter(
        _query,
        "nearCoordinate",
        `${action.currentLocation.longitude}|${action.currentLocation.latitude}`
      );
      _query = addFilter(
        _query,
        "currentCoordinate",
        `${action.currentLocation.longitude}|${action.currentLocation.latitude}`
      );
      yield put({
        type: types.SET_QUERY_SERVICE,
        queryData: _query
      });
      sessionStorage.setItem(
        "@shelter_current_location",
        JSON.stringify(action.currentLocation)
      );
    } else {
      _query = removeFilter(_query, "nearCoordinate");
      _query = removeFilter(_query, "currentCoordinate");

      yield put({
        type: types.SET_QUERY_SERVICE,
        queryData: _query
      });
      sessionStorage.removeItem("@shelter_current_location");
    }

    yield put({ type: types.SET_LOADING_LOCATION, loading: false });
  } catch (error) {
    return Promise.reject(error);
  }
}

function* cLocation() {
  yield takeLatest(types.SET_CURRENT_LOCATION_REQUEST, setCurrentLocation);
}

export default cLocation;
