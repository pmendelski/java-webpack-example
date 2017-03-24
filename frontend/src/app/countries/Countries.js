import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchCountriesIfNeeded } from './actions';
import CountryListing from './CountryListing';
import Loading from '../components/Loading';

class Countries extends Component {
  componentDidMount() {
    this.props.onMounted();
  }
  render() {
    return this.props.isLoaded ?
      <CountryListing /> :
      <Loading />;
  }
}

Countries.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  onMounted: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isLoaded: (state.countries.items != null &&
    !state.countries.isFetching)
});

const mapDispatchToProps = dispatch => ({
  onMounted: () => dispatch(fetchCountriesIfNeeded())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Countries);
