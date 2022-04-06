import { call, takeLatest } from "redux-saga/effects";
import { likeService } from "api/services/likeService";
import * as types from "redux/reducers/service/actionTypes";

function* fLikeService(action) {
  try {
    const { id } = action;
    yield call(likeService, id);
  } catch (error) {
    return Promise.reject(error);
  }
}

function* Service() {
  yield takeLatest(types.LIKE_SERVICE_REQUEST, fLikeService);
}

export default Service;
