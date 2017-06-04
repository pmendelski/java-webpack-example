import {
  REQUEST_COUNTRIES,
  RECEIVE_COUNTRIES,
  CHANGE_FILTER
} from './actions';
import reducer from './reducer';

specTest('Countries reducer ', () => {
  it('should handle CHANGE_FILTER', () => {
    // given
    const action = {
      type: CHANGE_FILTER,
      filter: 'new-filter-value'
    };
    // when
    const newState = reducer(undefined, action);
    // then
    expect(newState.filter).eql(action.filter);
  });

  it('should handle REQUEST_COUNTRIES', () => {
    // given
    const action = { type: REQUEST_COUNTRIES };
    // when
    const newState = reducer(undefined, action);
    // then
    expect(newState).containSubset({
      items: null,
      filter: ''
    });
  });

  it('should handle RECEIVE_COUNTRIES', () => {
    // given
    const action = {
      type: RECEIVE_COUNTRIES,
      response: { countries: ['Poland'] }
    };
    // when
    const newState = reducer(undefined, action);
    // then
    expect(newState).containSubset({
      items: action.response.countries
    });
  });
});
