import { combineReducers } from "redux";
import { History } from "history";
import { connectRouter } from "connected-react-router";
import { ServiceReducer, serviceReducer } from "./service";
import { ServiceDetailReducer, serviceDetailReducer } from "./ServiceDetail";
import { FeedbackReducer, feedbackReducer } from "./feedback";
import { AuthReducer, authReducer } from "./auth";
import { messageReducer, messageState } from "./messages";
export interface reducerType {
  service: ServiceReducer;
  serviceDetail: ServiceDetailReducer;
  feedback: FeedbackReducer;
  router: {
    location: {
      pathname: string;
      search: string;
      hash: string;
      query?: any;
    };
    action: string;
  };
  auth: AuthReducer;
  message: messageState;
}

const createRootReducer: any = (history: History) => {
  const reducers = combineReducers({
    router: connectRouter(history),
    service: serviceReducer,
    serviceDetail: serviceDetailReducer,
    feedback: feedbackReducer,
    auth: authReducer,
    message: messageReducer
  });
  return reducers;
};

export default createRootReducer;
