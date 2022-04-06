import { call, put, takeLatest } from "redux-saga/effects";
import { getServiceDetail } from "api/services/getServices";
import * as types from "redux/reducers/ServiceDetail/actionTypes";
import { SET_LOADING } from "redux/reducers/service/actionTypes";

function* getService(action) {
  try {
    yield put({ type: SET_LOADING, loading: true });

    let service = yield call(getServiceDetail, action.id);

    yield put({ type: types.SET_SERVICE_DETAIL, service });
    yield put({ type: SET_LOADING, loading: false });
  } catch (error) {
    return Promise.reject(error);
  }
}

function* ServiceDetail() {
  yield takeLatest(types.GET_SERVICE_REQUEST, getService);
}

export default ServiceDetail;
