import React from 'react';
import Countries from './Countries';

uiTest('<Countries />', () => {
  it('should render loading', () => {
    // given
    const store = createStore({ countries: { } });
    // when
    const wrapper = mountWithStore(<Countries />, store);
    // expect
    expect(wrapper.find('.loading').length).to.be.not.empty;
  });

  it('should render countries', () => {
    // given
    const store = createStore({
      countries: {
        items: ['Poland', 'Germany'],
        isFetching: false,
        filter: ''
      }
    });
    // when
    const wrapper = mountWithStore(<Countries />, store);
    // expect
    expect(wrapper.text()).to.contain('Poland');
    expect(wrapper.text()).to.contain('Germany');
  });

  it('should render filtered countries', () => {
    // given
    const store = createStore({
      countries: {
        items: ['Poland', 'Germany'],
        isFetching: false,
        filter: 'Pol'
      }
    });
    // when
    const wrapper = mountWithStore(<Countries />, store);
    // then
    expect(wrapper.text()).to.not.contain('Germany');
  });

  it('should fetch countries on mount', () => {
    // given
    const store = createAppStore();
    fetchMock.get('/api/countries', { countries: ['Poland'] });
    // when
    const wrapper = mountWithStore(<Countries />, store);
    // then
    return store.dispatched().then(() => {
      expect(wrapper.text()).to.contain('Poland');
    });
  });

  it('should filter countries on filter change', () => {
    // given
    const store = createAppStore();
    fetchMock.get('/api/countries', { countries: ['Poland', 'Germany'] });
    const wrapper = mountWithStore(<Countries />, store);
    return store.dispatched().then(() => {
      // when
      wrapper.find('input.filter').simulate('change', { target: { value: 'Pol' } });
      // then
      return store.dispatched().then(() => {
        expect(wrapper.text()).to.contain('Poland');
        expect(wrapper.text()).to.not.contain('Germany');
      });
    });
  });
});
