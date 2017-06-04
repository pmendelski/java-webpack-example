import {
  CHANGE_FILTER,
  changeFilter,
  fetchCountries,
  RECEIVE_COUNTRIES,
  REQUEST_COUNTRIES
} from './actions';

specTest('Countries action creator', () => {
  afterEach(fetchMock.restore);

  it('should emit filter change action', () => {
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

  it('should fetch countries and emit request and receive actions', () => {
    // given
    const store = createStore();
    const response = { countries: ['Poland'] };
    fetchMock.get('/api/countries', response);
    // expect
    return store.dispatch(fetchCountries())
      .then(() => store.expectActions([
        { type: REQUEST_COUNTRIES },
        {
          type: RECEIVE_COUNTRIES,
          response
        }
      ]));
  });
});
