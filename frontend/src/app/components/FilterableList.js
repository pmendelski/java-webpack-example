import React, { PropTypes } from 'react';
import List from './List';

const FilterableList = ({ items, filter, onFilterChange }) => {
  const filtered = items.filter(item => item.includes(filter));
  return (
    <div>
      <input
        className="filter"
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
  onFilterChange: PropTypes.func.isRequired
};

FilterableList.defaultProps = {
  items: [],
  filter: ''
};

export default FilterableList;
