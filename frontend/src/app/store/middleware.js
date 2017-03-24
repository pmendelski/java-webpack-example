/* eslint-disable no-underscore-dangle */
import { applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

// https://github.com/zalmoxisus/redux-devtools-extension#12-advanced-store-setup
const composeEnhancers = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const noActionMiddleware = () => next => action => (
  !action ? Promise.resolve() : next(action)
);

const promiseResultMiddleware = () => next => (action) => {
  const result = next(action) || action;
  const isPromise = result && typeof result.then === 'function';
  return isPromise ? result : Promise.resolve(action);
};

const middlewares = [
  noActionMiddleware,
  thunkMiddleware,
  promiseResultMiddleware
];

const composedMiddlewares = composeEnhancers(applyMiddleware(...middlewares));

export default composedMiddlewares;
