import { call, put, takeLatest, select } from "redux-saga/effects";
import {
  getUsersAPI,
  updatePermissionUser,
  deleteUser,
  getUserAPI
} from "api/services/getUsers";
import * as types from "redux/reducers/service/actionTypes";
import { SET_MESSAGES_REDUCER } from "redux/reducers/messages/actionTypes";
import { DIRECTION, LIMIT, SKIP, SORT } from "common/";
import { User } from "@shelter/core";
import produce from "immer";

export const getListUsers = state => state.service.users;
export const getQueryServiceSearch = state => state.service.queryDataSearch;

const initQueryCL = {
  sort: SORT,
  direction: DIRECTION,
  limit: LIMIT,
  skip: SKIP
};

function* getListUsersSaga(action) {
  try {
    yield put({ type: types.SET_LOADING, loading: true });
    const _query = {
      ...initQueryCL,
      ...action.params
    };
    yield put({
      type: types.SET_QUERY_SEARCH_SERVICE,
      queryDataSearch: _query
    });

    let users = yield call(getUsersAPI, _query);

    if (users.length === LIMIT) {
      yield put({ type: types.SET_CAN_LOADING_MORE, canLoadmore: true });
    } else if (users.length < LIMIT) {
      yield put({ type: types.SET_CAN_LOADING_MORE, canLoadmore: false });
    }

    yield put({ type: types.SET_USERS, users });
    yield put({ type: types.SET_LOADING, loading: false });
  } catch (error) {
    return Promise.reject(error);
  }
}

function* loadmoreListUsers(action) {
  try {
    const data: User[] = yield select(getListUsers);
    yield put({ type: types.SET_LOADING_MORE, loadingMore: true });
    const _query = yield select(getQueryServiceSearch);
    const query = {
      ..._query,
      skip: data.length
    };
    yield put({
      type: types.SET_QUERY_SEARCH_SERVICE,
      queryDataSearch: query
    });

    let users = yield call(getUsersAPI, query);

    if (users.length === LIMIT) {
      yield put({ type: types.SET_CAN_LOADING_MORE, canLoadmore: true });
    } else if (users.length < LIMIT) {
      yield put({ type: types.SET_CAN_LOADING_MORE, canLoadmore: false });
    }
    yield put({ type: types.UPDATE_USERS, users });
    yield put({ type: types.SET_LOADING_MORE, loadingMore: false });
  } catch (error) {
    return Promise.reject(error);
  }
}

function* updatePermission(action) {
  try {
    const data: User[] = yield select(getListUsers);
    const { userId, role } = action;

    const user: User = yield call(updatePermissionUser, {
      userId: userId,
      role: role
    });

    const index = data.findIndex(v => v.id === userId);
    const users: User[] = produce(data, (draftState: any[]) => {
      draftState[index].roles = [...user.roles];
    });

    yield put({ type: types.SET_USERS, users });
  } catch (error) {
    return Promise.reject(error);
  }
}

function* fdeleteUser(action) {
  try {
    const { id } = action;
    const users: any[] = yield select(getListUsers);
    let newUsers = [...users];
    var i = users.findIndex(s => s.id === id);
    if (i > -1) {
      newUsers.splice(i, 1);
    }
    yield put({ type: types.SET_USERS, users: newUsers });
    yield call(deleteUser, id);
    yield put({
      type: SET_MESSAGES_REDUCER,
      message: {
        type: "success",
        key: "",
        message: "This user was removed successful!"
      }
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

function* getUser(action) {
  try {
    yield put({ type: types.SET_LOADING, loading: true });

    let user = yield call(getUserAPI, action.id);

    yield put({ type: types.SET_USER_DETAIL, user });
    yield put({ type: types.SET_LOADING, loading: false });
  } catch (error) {
    return Promise.reject(error);
  }
}

function* ListUsers() {
  yield takeLatest(types.GET_USERS_REQUEST, getListUsersSaga);
  yield takeLatest(types.LOADMORE_USERS_REQUEST, loadmoreListUsers);
  yield takeLatest(types.UPDATE_PERMISSION_REQUEST, updatePermission);
  yield takeLatest(types.DELETE_USERS_REQUEST, fdeleteUser);
  yield takeLatest(types.GET_USER_REQUEST, getUser);
}

export default ListUsers;
