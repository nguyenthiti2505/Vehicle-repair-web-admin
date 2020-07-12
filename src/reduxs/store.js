import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "react-router-redux";
import createSagaMiddleware from "redux-saga";
import { createLogger } from "redux-logger";
import createHistory from "history/createBrowserHistory";
import { createBrowserHistory } from "history";
import reducers from "./reducers";
import rootSaga from "./sagas";

export const history = createBrowserHistory();

const initialState = {};
const enhancers = [];
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware, routerMiddleware(history)];

const loggerMiddleware = createLogger({
  predicate: () => process.env.NODE_ENV === "development",
});

middleware.push(loggerMiddleware);

if (process.env.NODE_ENV === "development") {
  const devToolsExtension = window.devToolsExtension;

  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const store = createStore(reducers, initialState, composedEnhancers);

sagaMiddleware.run(rootSaga);

export default store;
