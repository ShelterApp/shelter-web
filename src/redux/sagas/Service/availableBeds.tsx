import { call, put, takeLatest, select } from "redux-saga/effects";
import {
  getBeds,
  updateBeds,
  approveServices
} from "api/services/updateShelter";
import * as types from "redux/reducers/service/actionTypes";
import { ServiceProps } from "common/";
import produce from "immer";

export const getServices = state => state.service.data;

function* getListBeds(action) {
  try {
    yield put({ type: types.SET_LOADING, loading: true });

    let services = yield call(getBeds);

    yield put({ type: types.GET_SERVICES, services });
    yield put({ type: types.SET_LOADING, loading: false });
  } catch (error) {
    return Promise.reject(error);
  }
}

function* postUpdateBeds(action) {
  try {
    const services: ServiceProps[] = yield select(getServices);
    yield call(updateBeds, {
      services: [action.params]
    });
    yield call(approveServices, {
      services: [action.params.id]
    });
    const index = services.findIndex(v => v.id === action.params.id);
    const _services: ServiceProps[] = produce(services, (draftState: any[]) => {
      draftState[index].availableBeds = action.params.total;
    });
    yield put({ type: types.GET_SERVICES, services: _services });
  } catch (error) {
    return Promise.reject(error);
  }
}

function* AvailableBed() {
  yield takeLatest(types.GET_BEDS_REDUCER, getListBeds);
  yield takeLatest(types.UPDATE_BEDS_REDUCER, postUpdateBeds);
}

export default AvailableBed;
