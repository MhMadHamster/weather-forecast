import React from 'react';
import { Provider } from 'react-redux';
import CityContainer from '../containers/city';
import '../../styles/app.scss';

const Root = ({ store }) => (
  <Provider store={store}>
    <CityContainer />
  </Provider>
);

Root.propTypes = {
  store: React.PropTypes.shape({
    arrCities: React.PropTypes.array,
    loading: React.PropTypes.bool,
  }),
};

Root.defaultProps = {
  store: {},
};

export default Root;
