import produce from "immer";
// import * as types from "./actionTypes";

export interface FeedbackReducer {}

const initial = {} as FeedbackReducer;

export const feedbackReducer = (state = initial, action: any) =>
  produce(state, draft => {
    switch (action.type) {
      default:
        return draft;
    }
  });
