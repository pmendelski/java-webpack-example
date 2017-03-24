/* eslint-disable no-underscore-dangle, global-require */
import { createStore } from 'redux';
import middleware from './middleware';
import rootReducer from './reducer';

const replaceReducerInHmr = (store) => {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./reducer', () => {
    const nextRootReducer = require('./reducer').default;
    store.replaceReducer(nextRootReducer);
  });
};

const configureStore = (initialState = {}) => {
  const store = createStore(
    rootReducer,
    initialState,
    middleware
  );
  if (module.hot) {
    replaceReducerInHmr(store);
  }
  return store;
};

export { middleware, rootReducer };
export default configureStore;
