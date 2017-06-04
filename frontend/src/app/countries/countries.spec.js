import {
  changeFilter,
  fetchCountries
} from './actions';
import reducer from './reducer';

specTest('Countries', () => {
  let store;

  beforeEach(() => {
    store = createStore(reducer);
  });

  it('should change filter', () => {
    // given
    const filter = 'new-filter-value';
    // expect
    return store.dispatch(changeFilter(filter))
      .then(() =>
        expect(store.getState())
          .containSubset({ filter }));
  });

  it('should fetch countries', () => {
    // given
    const response = { countries: ['Poland'] };
    fetchMock.get('/api/countries', response);
    // expect
    return store.dispatch(fetchCountries())
      .then(() =>
        expect(store.getState()).containSubset({
          items: response.countries
        }));
  });
});
