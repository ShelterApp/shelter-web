import { all } from "redux-saga/effects";
import createFeedback from "./createFeedback";

export const feedbackSaga = function* root() {
  yield all([createFeedback()]);
};
