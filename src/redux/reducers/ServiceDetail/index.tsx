import produce from "immer";
import * as types from "./actionTypes";
import { ServiceProps } from "common/";

export interface ServiceDetailReducer {
  data: ServiceProps;
}

const initial = {
  data: {} as ServiceProps
} as ServiceDetailReducer;

export const serviceDetailReducer = (state = initial, action: any) =>
  produce(state, draft => {
    switch (action.type) {
      case types.SET_SERVICE_DETAIL:
        draft.data = action.service;
        break;
      default:
        return draft;
    }
    return draft;
  });
