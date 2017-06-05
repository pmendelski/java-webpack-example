import React from 'react';
import { connect } from 'react-redux';
import { fetchCountries } from './actions';
import CountryList from './CountryList';
import LazyComponent from '../components/LazyComponent';

const CenteredCountryList = () => (
  <div className="row">
    <div className="col-md-4 col-md-offset-4">
      <CountryList />
    </div>
  </div>
);

const mapState = state => ({
  isReady: !!state.countries.items,
  children: <CenteredCountryList />
});

const mapDispatch = dispatch => ({
  load: () => dispatch(fetchCountries())
});

const Countries = connect(mapState, mapDispatch)(LazyComponent);

export default Countries;
