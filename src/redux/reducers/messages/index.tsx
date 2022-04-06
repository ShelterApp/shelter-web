import produce from "immer";
import { SET_MESSAGES_REDUCER, CLEAR_MESSAGES_REDUCER } from "./actionTypes";

export interface messageState {
  hasMessage: boolean;
  type: string;
  key?: string;
  message: string;
}

const initial: messageState = {
  hasMessage: false,
  type: "success",
  key: "",
  message: ""
};

export const messageReducer = (state = initial, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_MESSAGES_REDUCER:
        draft.hasMessage = true;
        draft.type = action.message.type;
        draft.key = action.message.key;
        draft.message = action.message.message;
        break;
      case CLEAR_MESSAGES_REDUCER:
        draft.hasMessage = false;
        draft.type = "success";
        draft.key = "";
        draft.message = "";
        break;
    }
  });

export default {
  messageReducer
};
