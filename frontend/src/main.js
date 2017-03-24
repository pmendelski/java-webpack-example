/* eslint-disable global-require */
import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import './theme/global.scss';
import Root from './app/Root';
import configureStore from './app/store';

const store = configureStore();

const render = Component =>
  ReactDom.render(
    <AppContainer>
      <Component store={store} />
    </AppContainer>,
    document.getElementById('root')
  );

render(Root);

if (module.hot) {
  module.hot.accept('./app/Root.js', () => {
    const newRoot = require('./app/Root').default;
    render(newRoot);
  });
}
