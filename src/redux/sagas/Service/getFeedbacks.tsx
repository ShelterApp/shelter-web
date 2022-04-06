import { call, put, takeLatest, select } from "redux-saga/effects";
import { getFeedbacks } from "api/feedbacks/get";
import * as types from "redux/reducers/service/actionTypes";
import { DIRECTION, LIMIT, SKIP, SORT } from "common/";
import { Feedback as FeedbackProps } from "@shelter/core/dist/models";

export const getCurrentFeedbacks = state => state.service.feedbacks;

const initQueryCL = {
  sort: SORT,
  direction: DIRECTION,
  limit: LIMIT,
  skip: SKIP
};

function* getFeedbacksSaga(action) {
  try {
    yield put({ type: types.SET_LOADING, loading: true });
    const { params } = action;
    const query = {
      ...initQueryCL,
      ...params
    };

    let feedbacks = yield call(getFeedbacks, query);

    if (feedbacks.length === LIMIT) {
      yield put({ type: types.SET_CAN_LOADING_MORE, canLoadmore: true });
    } else if (feedbacks.length < LIMIT) {
      yield put({ type: types.SET_CAN_LOADING_MORE, canLoadmore: false });
    }

    yield put({ type: types.SET_FEEDBACKS, feedbacks });
    yield put({ type: types.SET_LOADING, loading: false });
  } catch (error) {
    return Promise.reject(error);
  }
}

function* loadmoreFeedbacks(action) {
  try {
    const { params } = action;
    const data: FeedbackProps[] = yield select(getCurrentFeedbacks);
    yield put({ type: types.SET_LOADING_MORE, loadingMore: true });
    const query = {
      ...initQueryCL,
      ...params,
      skip: data.length
    };

    let feedbacks = yield call(getFeedbacks, query);

    if (feedbacks.length === LIMIT) {
      yield put({ type: types.SET_CAN_LOADING_MORE, canLoadmore: true });
    } else if (feedbacks.length < LIMIT) {
      yield put({ type: types.SET_CAN_LOADING_MORE, canLoadmore: false });
    }
    yield put({ type: types.UPDATE_FEEDBACKS, feedbacks });
    yield put({ type: types.SET_LOADING_MORE, loadingMore: false });
  } catch (error) {
    return Promise.reject(error);
  }
}

function* Feedback() {
  yield takeLatest(types.GET_FEEDBACKS_REQUEST, getFeedbacksSaga);
  yield takeLatest(types.LOADMORE_FEEDBACKS_REQUEST, loadmoreFeedbacks);
}

export default Feedback;
