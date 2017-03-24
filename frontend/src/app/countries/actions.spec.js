import {
  CHANGE_FILTER,
  changeFilter,
  REQUEST_COUNTRIES,
  RECEIVE_COUNTRIES,
  fetchCountriesIfNeeded
} from './actions';

specTest('Countries action creator', () => {
  afterEach(fetchMock.restore);

  it('should create CHANGE_FILTER action', () => {
    // given
    const filter = 'new-filter-value';
    // when
    const action = changeFilter(filter);
    // then
    expect(action).eql({
      type: CHANGE_FILTER,
      filter
    });
  });

  it('should fetch countries when no countries are cached', () => {
    // given
    const store = createStore();
    const response = { countries: ['Poland'] };
    fetchMock.get('/api/countries', response);
    // expect
    return store.dispatch(fetchCountriesIfNeeded())
      .then(() => store.expectActions([
        { type: REQUEST_COUNTRIES },
        {
          type: RECEIVE_COUNTRIES,
          response
        }
      ]));
  });

  it('should not fetch countries if countries are cached', () => {
    // given
    const store = createStore({ countries: { items: ['Poland'] } });
    // expect
    return store.dispatch(fetchCountriesIfNeeded())
      .then(() => store.expectNoActions());
  });
});
