import {
  changeFilter,
  fetchCountriesIfNeeded
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

  it('should fetch countries when no countries are cached', () => {
    // given
    const response = { countries: ['Poland'] };
    fetchMock.get('/api/countries', response);
    // expect
    return store.dispatch(fetchCountriesIfNeeded())
      .then(() =>
        expect(store.getState()).containSubset({
          items: response.countries,
          isFetching: false
        }));
  });

  it('should not fetch countries when countries are cached', () => {
    // given
    const storeWithCountries = createStore(reducer, { countries: { items: ['Poland'] } });
    // expect
    return storeWithCountries.dispatch(fetchCountriesIfNeeded())
      .then(() => store.expectNoActions());
  });
});
