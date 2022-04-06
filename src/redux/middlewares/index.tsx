import loggerMiddleware from "redux/middlewares/logger";
import routerMiddleware from "redux/middlewares/router";
import sagaMiddleware from "redux/middlewares/saga";
import { History } from "history";

export default (history: History) => {
  return [routerMiddleware(history), loggerMiddleware, sagaMiddleware];
};
