import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import CityContainer from './containers/city';
import Store from './store';

render(
  <Provider store={Store}>
    <CityContainer />
  </Provider>,
  document.getElementById('app'),
);
