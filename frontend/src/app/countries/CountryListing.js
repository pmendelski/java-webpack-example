import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { changeFilter } from './actions';
import CountryList from './CountryList';

const CountryListing = ({ items, filter = '', onFilterChange }) => {
  const handleFilterChange = (e) => {
    const newFilter = e.target.value;
    onFilterChange(newFilter);
  };
  const filtered = items
    .filter(item => item.includes(filter));
  return (
    <div>
      <input className="filter" onChange={handleFilterChange} value={filter} />
      <CountryList countries={filtered} />
    </div>
  );
};

CountryListing.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired
};

const mapStateToProps = state => state.countries;

const mapDispatchToProps = dispatch => ({
  onFilterChange: filter => dispatch(changeFilter(filter))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CountryListing);
