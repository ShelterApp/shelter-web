import { all } from "redux-saga/effects";
import { serviceSaga } from "./Service";
import { feedbackSaga } from "./Feedback";
import { authSaga } from "./Auth";

// Register all your watchers
export const rootSaga = function* root() {
  yield all([serviceSaga(), feedbackSaga(), authSaga()]);
};
