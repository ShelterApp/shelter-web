import produce from "immer";
import * as types from "./actionTypes";
import { UserRole } from "common/";

export interface AuthReducer {
  current_user: UserReducer;
  idToken: string;
}
export interface UserReducer {
  roles: string[];
  email: string;
  displayName: string;
  phone: string;
  id: string;
  isLogin: boolean;
  isAdmin: boolean;
  devices: any[];
  lastMethod?: string;
  totalServices: number;
}

const initialUser = {
  roles: [],
  email: "",
  displayName: "",
  phone: "",
  id: "",
  isLogin: false,
  isAdmin: false
} as UserReducer;

const initial = {
  current_user: initialUser,
  idToken: ""
} as AuthReducer;

export const authReducer = (state = initial, action: any) =>
  produce(state, draft => {
    switch (action.type) {
      case types.SET_CURRENT_USER:
        draft.current_user = checkIsAdminOrNot(action.current_user);
        draft.idToken = action.current_user.token;
        break;
      case types.UPDATE_CURRENT_USER:
        draft.current_user.displayName = action.current_user.displayName;
        draft.current_user.phone = action.current_user.phone;
        break;
      case types.CLEAR_AUTH:
        draft.current_user = initialUser;
        draft.idToken = "";
        break;
      case types.UPDATE_TOTAL_SERVICES:
        draft.current_user.totalServices = action.current_user.totalServices;
        break;
      default:
        return draft;
    }
    return draft;
  });

const checkIsAdminOrNot = userInfo => {
  if (userInfo.roles && userInfo.roles.includes(UserRole.Administrator)) {
    return {
      ...userInfo,
      isAdmin: true
    };
  }
  return userInfo;
};
