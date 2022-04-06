import { takeLatest, put } from "redux-saga/effects";
import * as types from "redux/reducers/auth/actionTypes";
import { SET_MESSAGES_REDUCER } from "redux/reducers/messages/actionTypes";
import { setToken } from "api/configApi";
// import Cookie from 'js-cookie';

function* loginFunction(action) {
  try {
    const { current_user } = action;
    console.log("saga logigin", current_user);
    setToken(current_user.token);
    yield put({
      type: types.SET_CURRENT_USER,
      current_user: {
        ...current_user,
        isLogin: true
      }
    });
    yield put({
      type: SET_MESSAGES_REDUCER,
      message: {
        type: "success",
        key: "WELCOME_BACK_WITH_USER",
        message: `Welcome user ${current_user.email}`
      }
    });
    // localStorage.setItem('@token-shelter', current_user.devices[0].token)
    // localStorage.setItem('@shelter-current_user', JSON.stringify(current_user))
    // const res = Cookie.set(process.env.REACT_APP_COOKIE_APP, "s%3AwcrIfIdQBdixTBMo1uF4w6-igBrU7Yz3.oYS3h9AA913SpjYPIzl24CxJLVc2Y4UVjf6FhTtGRSA")
    // console.log(res)
    // console.log(process.env.REACT_APP_COOKIE_APP);
    // console.log(process.env.REACT_APP_WWW_MOBILE_API_URL);
  } catch (error) {
    return Promise.reject(error);
  }
}

function* logoutFunction(action) {
  try {
    setToken("");
    yield put({
      type: types.CLEAR_AUTH
    });
    yield put({
      type: SET_MESSAGES_REDUCER,
      message: {
        type: "success",
        key: "SIGNED_OUT_SUCCESSFULLY",
        message: `Signed out successfully`
      }
    });
    // localStorage.setItem('@token-shelter', current_user.devices[0].token)
    // localStorage.setItem('@shelter-current_user', JSON.stringify(current_user))
    // const res = Cookie.set(process.env.REACT_APP_COOKIE_APP, "s%3AwcrIfIdQBdixTBMo1uF4w6-igBrU7Yz3.oYS3h9AA913SpjYPIzl24CxJLVc2Y4UVjf6FhTtGRSA")
    // console.log(res)
    // console.log(process.env.REACT_APP_COOKIE_APP);
    // console.log(process.env.REACT_APP_WWW_MOBILE_API_URL);
  } catch (error) {
    return Promise.reject(error);
  }
}

function* Login() {
  yield takeLatest(types.LOGIN_REQUEST, loginFunction);
  yield takeLatest(types.LOGOUT_REQUEST, logoutFunction);
}

export default Login;
