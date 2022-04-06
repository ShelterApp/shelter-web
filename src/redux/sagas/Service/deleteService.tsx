import { call, takeLatest, select, put } from "redux-saga/effects";
import { deleteService } from "api/services/deleteService";
import * as types from "redux/reducers/service/actionTypes";
import { SET_MESSAGES_REDUCER } from "redux/reducers/messages/actionTypes";

export const getServices = state => state.service.data;

function* fdeleteService(action) {
  try {
    const { id } = action;
    const services: any[] = yield select(getServices);
    let newServices = [...services];
    var i = services.findIndex(s => s.id === id);
    if (i > -1) {
      newServices.splice(i, 1);
    }
    yield put({ type: types.GET_SERVICES, services: newServices });
    yield call(deleteService, id);
    yield put({
      type: SET_MESSAGES_REDUCER,
      message: {
        type: "success",
        key: "",
        message: "This service was removed successful!"
      }
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

function* DeleteService() {
  yield takeLatest(types.DELETE_SERVICE_REQUEST, fdeleteService);
}

export default DeleteService;
