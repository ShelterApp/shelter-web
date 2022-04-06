import { call, takeLatest, put } from "redux-saga/effects";
import { createFeedback, createFeedbackService } from "api/feedbacks/create";
import * as types from "redux/reducers/feedback/actionTypes";
import { SET_MESSAGES_REDUCER } from "redux/reducers/messages/actionTypes";

function* createFeedbackFunction(action) {
  try {
    const { form } = action;
    yield call(createFeedback, form);
    yield put({
      type: SET_MESSAGES_REDUCER,
      message: {
        type: "success",
        key: "SENT_FEEDBACK_SUCCESSFULLY",
        message: action.message
      }
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

function* createFeedbackServiceFunction(action) {
  try {
    const { form } = action;
    console.log(form);
    yield call(createFeedbackService, form);
    yield put({
      type: SET_MESSAGES_REDUCER,
      message: {
        type: "success",
        key: "SENT_FEEDBACK_SUCCESSFULLY",
        message: action.message
      }
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

function* Feedback() {
  yield takeLatest(types.CREATE_FEEDBACK_REQUEST, createFeedbackFunction);
  yield takeLatest(
    types.CREATE_FEEDBACK_SERVICE_REQUEST,
    createFeedbackServiceFunction
  );
}

export default Feedback;
