import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import throttle from 'lodash/throttle';
import { saveState } from './localStorage';
import CityContainer from './containers/city';
import Store from './store';

Store.subscribe(throttle(() => {
  saveState(Store.getState());
}, 1000));

render(
  <Provider store={Store}>
    <CityContainer />
  </Provider>,
  document.getElementById('app'),
);
