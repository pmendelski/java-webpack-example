/* eslint-disable no-underscore-dangle, global-require */
import { combineReducers } from 'redux';
import countriesReducer from '../countries/reducer';

const rootReducer = combineReducers({
  countries: countriesReducer
});

export default rootReducer;
