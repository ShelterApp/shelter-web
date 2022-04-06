import { call, put, takeLatest, select } from "redux-saga/effects";
import { getCrisisLines } from "api/services/getCrisisLines";
import * as types from "redux/reducers/service/actionTypes";
import { DIRECTION, LIMIT, SKIP, SORT } from "common/";
import { CrisisLine as CrisisLineProp } from "@shelter/core";

export const getCurrentLines = state => state.service.crisis_lines;

const initQueryCL = {
  sort: SORT,
  direction: DIRECTION,
  limit: LIMIT,
  skip: SKIP
};

function* getCrisisLinesSaga(action) {
  try {
    yield put({ type: types.SET_LOADING, loading: true });
    const { params } = action;
    const query = {
      ...initQueryCL,
      ...params
    };

    let crisis_lines = yield call(getCrisisLines, query);

    if (crisis_lines.length === LIMIT) {
      yield put({ type: types.SET_CAN_LOADING_MORE, canLoadmore: true });
    } else if (crisis_lines.length < LIMIT) {
      yield put({ type: types.SET_CAN_LOADING_MORE, canLoadmore: false });
    }

    yield put({ type: types.SET_CRISIS_LINES, crisis_lines });
    yield put({ type: types.SET_LOADING, loading: false });
  } catch (error) {
    return Promise.reject(error);
  }
}

function* loadmoreCrisisLines(action) {
  try {
    const { params } = action;
    const data: CrisisLineProp[] = yield select(getCurrentLines);
    yield put({ type: types.SET_LOADING_MORE, loadingMore: true });
    const query = {
      ...initQueryCL,
      ...params,
      skip: data.length
    };

    let crisis_lines = yield call(getCrisisLines, query);

    if (crisis_lines.length === LIMIT) {
      yield put({ type: types.SET_CAN_LOADING_MORE, canLoadmore: true });
    } else if (crisis_lines.length < LIMIT) {
      yield put({ type: types.SET_CAN_LOADING_MORE, canLoadmore: false });
    }
    yield put({ type: types.UPDATE_CRISIS_LINES, crisis_lines });
    yield put({ type: types.SET_LOADING_MORE, loadingMore: false });
  } catch (error) {
    return Promise.reject(error);
  }
}

function* CrisisLine() {
  yield takeLatest(types.GET_CRISISLINES_REQUEST, getCrisisLinesSaga);
  yield takeLatest(types.LOADMORE_CRISISLINES_REQUEST, loadmoreCrisisLines);
}

export default CrisisLine;
