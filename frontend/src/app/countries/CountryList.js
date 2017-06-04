import { connect } from 'react-redux';
import { changeFilter } from './actions';
import FilterableList from '../components/FilterableList';
import style from './CountryList.scss';

const mapStateToProps = state => ({
  items: state.countries.items,
  filter: state.countries.filter,
  className: style.countries
});

const mapDispatchToProps = dispatch => ({
  onFilterChange: filter => dispatch(changeFilter(filter))
});

const CountryList = connect(mapStateToProps, mapDispatchToProps)(FilterableList);

export default CountryList;
