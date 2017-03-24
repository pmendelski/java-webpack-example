import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

const mountWithStore = (component, store) =>
  mount(
    <Provider store={store}>
      {component}
    </Provider>
  );

export default mountWithStore;
