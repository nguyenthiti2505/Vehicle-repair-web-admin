import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './rootSaga'
import reducers from './reducers'

const middleware = []
const enhancers = []

/* ------------- Saga Middleware ------------- */
const sagaMiddleware = createSagaMiddleware()
middleware.push(sagaMiddleware);

/* ------------- Assemble Middleware ------------- */
enhancers.push(applyMiddleware(...middleware))

export const store = createStore(reducers, compose(...enhancers))

sagaMiddleware.run(rootSaga)