import produce from "immer";
import * as types from "./actionTypes";
import {
  QueryServiceProps,
  initQuery,
  initQuerySearch,
  ServiceProps
} from "common/";
import { CrisisLine } from "@shelter/core";
import { Feedback } from "@shelter/core/dist/models";
import { User } from "@shelter/core";

export interface ICoords {
  latitude: number;
  longitude: number;
}

export interface ServiceReducer {
  data: ServiceProps[];
  loading: boolean;
  loadingMore: boolean;
  loadingLocation: boolean;
  queryData: QueryServiceProps;
  queryDataMS: QueryServiceProps;
  queryDataSearch: QueryServiceProps;
  currentLocation: ICoords;
  canLoadmore: boolean;
  myFavorites: ServiceProps[];
  crisis_lines: CrisisLine[];
  feedbacks: Feedback[];
  lineDetail: CrisisLine;
  critical_header_services: ServiceProps[];
  users: User[];
  user: User;
}

const currentLocation = sessionStorage.getItem("@shelter_current_location");

const initial = {
  data: [] as ServiceProps[],
  loading: false,
  loadingMore: false,
  loadingLocation: false,
  queryData: initQuery,
  queryDataMS: {},
  queryDataSearch: initQuerySearch,
  currentLocation: currentLocation
    ? JSON.parse(currentLocation)
    : {
        latitude: 0,
        longitude: 0
      },
  canLoadmore: false,
  myFavorites: [] as ServiceProps[],
  crisis_lines: [] as CrisisLine[],
  feedbacks: [] as Feedback[],
  lineDetail: {} as CrisisLine,
  critical_header_services: [] as ServiceProps[],
  users: [] as User[],
  user: {} as User
} as ServiceReducer;

export const serviceReducer = (state = initial, action: any) =>
  produce(state, draft => {
    switch (action.type) {
      case types.GET_SERVICES:
        draft.data = action.services;
        break;
      case types.SET_LOADING:
        draft.loading = action.loading;
        break;
      case types.SET_QUERY_SERVICE:
        draft.queryData = action.queryData;
        break;
      case types.SET_CURRENT_LOCATION:
        draft.currentLocation = action.currentLocation;
        break;
      case types.SET_LOADING_MORE:
        draft.loadingMore = action.loadingMore;
        break;
      case types.SET_CAN_LOADING_MORE:
        draft.canLoadmore = action.canLoadmore;
        break;
      case types.SET_LOADING_LOCATION:
        draft.loadingLocation = action.loading;
        break;
      case types.UPDATE_LIST_SERVICES:
        draft.data = [...draft.data, ...action.services];
        break;
      case types.SET_MY_FAVORITES:
        draft.myFavorites = action.services;
        break;
      case types.SET_CRISIS_LINES:
        draft.crisis_lines = action.crisis_lines;
        break;
      case types.UPDATE_CRISIS_LINES:
        draft.crisis_lines = [...draft.crisis_lines, ...action.crisis_lines];
        break;
      case types.SET_USERS:
        draft.users = action.users;
        break;
      case types.UPDATE_USERS:
        draft.users = [...draft.users, ...action.users];
        break;
      case types.SET_QUERY_SEARCH_SERVICE:
        draft.queryDataSearch = action.queryDataSearch;
        break;
      case types.SET_QUERY_MANAGE_SERVICE:
        draft.queryDataMS = action.queryDataMS;
        break;
      case types.SET_FEEDBACKS:
        draft.feedbacks = action.feedbacks;
        break;
      case types.UPDATE_FEEDBACKS:
        draft.feedbacks = [...draft.feedbacks, ...action.feedbacks];
        break;
      case types.SET_CRISISLINE_DETAIL:
        draft.lineDetail = action.crisis_line;
        break;
      case types.SET_CRITICAL_HEADER:
        draft.critical_header_services = action.services;
        break;
      case types.SET_USER_DETAIL:
        draft.user = action.user;
        break;
      default:
        return draft;
    }
    return draft;
  });
