import { connect } from 'react-redux';
import City from '../components/city';
import { fetchCity, removeCity } from '../actions/city';

const mapStateToProps = state => ({
  data: state,
});

const mapDispatchToProps = dispatch => ({
  fetchCity: (cityName, dayCnt) => {
    dispatch(fetchCity(cityName, dayCnt))
  },
  removeCity: (cityId) => {
    dispatch(removeCity(cityId))
  },
});

const CityContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(City);

export default CityContainer;
