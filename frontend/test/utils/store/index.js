/* eslint-disable no-param-reassign */
import { createStore } from 'redux';
import { isFunction, isPlainObject } from 'lodash';
import { middleware, rootReducer } from '../../../src/app/store';
import setupAssertions from './assertions';

const setupActionsAccessor = (store, reducer) => {
  const actions = [];
  store.replaceReducer((state, action) => {
    if (!action.type.startsWith('@@redux')) {
      actions.push(action);
    }
    return reducer(state, action);
  });
  store.getActions = () => actions.slice();
  store.clearActions = () => { actions.length = 0; };
};

const setupPromiseHolder = (store) => {
  const realDispatch = store.dispatch;
  const promises = [];
  store.dispatch = (action) => {
    const result = realDispatch(action);
    if (result.then) {
      promises.push(result);
    }
    return result;
  };
  store.dispatched = () => Promise.all(promises);
};

const resolveReducer = (args) => {
  const argReducer = args.find(arg => isFunction(arg));
  const defaultReducer = store => store || {};
  return argReducer || defaultReducer;
};

const resolveInitialState = args =>
  args.find(arg => isPlainObject(arg));

export const createMockStore = (...args) => {
  const reducer = resolveReducer(args);
  const store = createStore(
    reducer,
    resolveInitialState(args),
    middleware
  );
  setupActionsAccessor(store, reducer);
  setupPromiseHolder(store);
  setupAssertions(store);
  return store;
};

export const createAppStore = (...args) =>
  createMockStore(rootReducer, ...args);
