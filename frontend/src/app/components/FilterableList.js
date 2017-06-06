import React from 'react';
import PropTypes from 'prop-types';
import List from './List';

const FilterableList = ({ items, filter, onFilterChange, className }) => {
  const filtered = items.filter(item => item.includes(filter));
  return (
    <div className={className}>
      <input
        className="filter form-control"
        placeholder="Search"
        value={filter}
        onChange={e => onFilterChange(e.target.value)}
      />
      <List items={filtered} />
    </div>
  );
};

FilterableList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  className: PropTypes.string
};

FilterableList.defaultProps = {
  items: [],
  filter: '',
  className: 'filterable-list'
};

export default FilterableList;
