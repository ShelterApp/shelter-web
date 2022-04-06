import { all } from "redux-saga/effects";
import login from "./login";

export const authSaga = function* root() {
  yield all([login()]);
};
