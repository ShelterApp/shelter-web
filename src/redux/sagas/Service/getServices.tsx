import { call, put, takeLatest, select } from "redux-saga/effects";
import { getServices } from "api/services/getServices";
import * as types from "redux/reducers/service/actionTypes";
import { QueryServiceProps, PageSize, addFilter, removeFilter } from "common/";

export const getQueryService = state => state.service.queryData;
export const getQueryServiceSearch = state => state.service.queryDataSearch;
export const getQueryManageService = state => state.service.queryDataMS;

export const getLoadingMore = state => state.service.loadingMore;

function* getListServices(action) {
  try {
    const { noLoading, params, searchService } = action;

    if (!noLoading) {
      yield put({ type: types.SET_LOADING, loading: true });
    }
    let _query: QueryServiceProps;
    let pageSize = action.pageSize || PageSize;
    if (!searchService) {
      _query = {
        ...params
      };

      if (action.defaultQuery) {
        yield put({
          type: types.SET_QUERY_MANAGE_SERVICE,
          queryDataMS: _query
        });
      } else if (!action.notApproved) {
        _query = addFilter(_query, "isApproved", true);
        yield put({ type: types.SET_QUERY_SERVICE, queryData: _query });
      }
    } else {
      const currentLocation = sessionStorage.getItem(
        "@shelter_current_location"
      );

      _query = {
        ...params
      };
      if (currentLocation && currentLocation !== "undefined") {
        _query = addFilter(
          _query,
          "nearCoordinate",
          `${JSON.parse(currentLocation).longitude}|${
            JSON.parse(currentLocation).latitude
          }`
        );
        _query = addFilter(
          _query,
          "currentCoordinate",
          `${JSON.parse(currentLocation).longitude}|${
            JSON.parse(currentLocation).latitude
          }`
        );
      } else {
        _query = removeFilter(_query, "nearCoordinate");
        _query = removeFilter(_query, "currentCoordinate");
      }

      yield put({
        type: types.SET_QUERY_SEARCH_SERVICE,
        queryDataSearch: _query
      });
    }
    let services = yield call(getServices, _query);

    if (services.length === pageSize) {
      yield put({ type: types.SET_CAN_LOADING_MORE, canLoadmore: true });
    } else if (services.length < pageSize) {
      yield put({ type: types.SET_CAN_LOADING_MORE, canLoadmore: false });
    }

    yield put({ type: types.GET_SERVICES, services });
    yield put({ type: types.SET_LOADING, loading: false });
  } catch (error) {
    return Promise.reject(error);
  }
}

function* refreshService(action) {
  try {
    yield put({ type: types.SET_LOADING, loading: true });
    const _query: QueryServiceProps = yield select(getQueryService);
    let services = yield call(getServices, _query);
    let pageSize = action.pageSize || PageSize;
    if (services.length === pageSize) {
      yield put({ type: types.SET_CAN_LOADING_MORE, canLoadmore: true });
    } else if (services.length < pageSize) {
      yield put({ type: types.SET_CAN_LOADING_MORE, canLoadmore: false });
    }

    yield put({ type: types.GET_SERVICES, services });
    yield put({ type: types.SET_LOADING, loading: false });
  } catch (error) {
    return Promise.reject(error);
  }
}

function* loadmoreServices(action) {
  try {
    const { searchService } = action;
    let pageSize = action.pageSize || PageSize;

    yield put({ type: types.SET_LOADING_MORE, loadingMore: true });
    let _query: QueryServiceProps;

    if (!searchService) {
      if (action.defaultQuery) {
        _query = yield select(getQueryManageService);
      } else {
        _query = yield select(getQueryService);
      }
      _query = {
        ..._query,
        skip: _query.skip + _query.limit
      };
      if (action.defaultQuery) {
        yield put({
          type: types.SET_QUERY_MANAGE_SERVICE,
          queryDataMS: _query
        });
      } else {
        yield put({ type: types.SET_QUERY_SERVICE, queryData: _query });
      }
    } else {
      _query = yield select(getQueryServiceSearch);
      _query = {
        ..._query,
        skip: _query.skip + _query.limit
      };
      yield put({
        type: types.SET_QUERY_SEARCH_SERVICE,
        queryDataSearch: _query
      });
    }

    let services = yield call(getServices, _query);

    if (services.length === pageSize) {
      yield put({ type: types.SET_CAN_LOADING_MORE, canLoadmore: true });
    } else if (services.length < pageSize) {
      yield put({ type: types.SET_CAN_LOADING_MORE, canLoadmore: false });
    }
    yield put({ type: types.UPDATE_LIST_SERVICES, services });
    yield put({ type: types.SET_LOADING_MORE, loadingMore: false });
  } catch (error) {
    return Promise.reject(error);
  }
}

function* getCriticalHeader(action) {
  try {
    let _query: QueryServiceProps;
    const initQuery: QueryServiceProps = yield select(getQueryService);

    if (action.params) {
      _query = { ...action.params };
    } else {
      _query = {
        ...initQuery,
        skip: 0,
        limit: 20
      };
    }

    _query = addFilter(_query, "isCriticalHeader", true);

    let services = yield call(getServices, _query);

    yield put({ type: types.SET_CRITICAL_HEADER, services });
  } catch (error) {
    return Promise.reject(error);
  }
}

function* Service() {
  yield takeLatest(types.GET_SERVICES_REDUCER, getListServices);
  yield takeLatest(types.REFRESH_SERVICES_REQUEST, refreshService);
  yield takeLatest(types.LOADMORE_SERVICES_REQUEST, loadmoreServices);
  yield takeLatest(types.GET_CRITICAL_HEADER, getCriticalHeader);
}

export default Service;
