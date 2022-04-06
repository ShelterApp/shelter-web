import { call, put, takeLatest, select } from "redux-saga/effects";
import { getServices } from "api/services/getServices";
import * as types from "redux/reducers/service/actionTypes";
import { QueryServiceProps } from "common/";

export const getQueryService = state => state.service.queryData;

function* getMyFavorite(action) {
  try {
    yield put({ type: types.SET_LOADING, loading: true });
    let _query: QueryServiceProps;
    const initQuery: QueryServiceProps = yield select(getQueryService);
    const { params } = action;
    _query = {
      ...initQuery,
      ...params
    };
    let services = yield call(getServices, _query);

    yield put({ type: types.SET_MY_FAVORITES, services });
    yield put({ type: types.SET_LOADING, loading: false });
  } catch (error) {
    return Promise.reject(error);
  }
}

function* MyFavorites() {
  yield takeLatest(types.GET_MY_FAVORITES_REQUEST, getMyFavorite);
}

export default MyFavorites;
