import { call, put, takeLatest, select } from "redux-saga/effects";
import {
  getCrisisLineDetail,
  deleteCrisisline
} from "api/services/getCrisisLines";
import * as types from "redux/reducers/service/actionTypes";
import { SET_MESSAGES_REDUCER } from "redux/reducers/messages/actionTypes";

function* getLine(action) {
  try {
    yield put({ type: types.SET_LOADING, loading: true });

    let crisis_line = yield call(getCrisisLineDetail, action.id);

    yield put({ type: types.SET_CRISISLINE_DETAIL, crisis_line });
    yield put({ type: types.SET_LOADING, loading: false });
  } catch (error) {
    return Promise.reject(error);
  }
}

export const getCrisisLines = state => state.service.crisis_lines;

function* fdeleteLine(action) {
  try {
    const { id } = action;
    const crisis_lines: any[] = yield select(getCrisisLines);
    let newLines = [...crisis_lines];
    var i = crisis_lines.findIndex(s => s.id === id);
    if (i > -1) {
      newLines.splice(i, 1);
    }
    yield put({ type: types.SET_CRISIS_LINES, crisis_lines: newLines });
    yield call(deleteCrisisline, id);
    yield put({
      type: SET_MESSAGES_REDUCER,
      message: {
        type: "success",
        key: "",
        message: "This crisisline was removed successful!"
      }
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

function* LineDetail() {
  yield takeLatest(types.GET_CRISISLINE_REQUEST, getLine);
  yield takeLatest(types.DELETE_CRISISLINE_REQUEST, fdeleteLine);
}

export default LineDetail;
