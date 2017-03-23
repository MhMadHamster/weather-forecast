import fetch from 'isomorphic-fetch';
import * as types from '../constants/ActionTypes';

const fetchCityRequest = () => ({
  type: types.FETCH_CITY_REQUEST,
});

const fetchCitySuccess = payload => ({
  type: types.FETCH_CITY_SUCCESS,
  payload,
});

const fetchCityFailure = err => ({
  type: types.FETCH_CITY_FAILURE,
  err,
});

export const fetchCity = (cityName, dayCnt = 1) =>
  (dispatch) => {
    dispatch(fetchCityRequest());
    return fetch(`http://api.openweathermap.org/data/2.5/forecast/daily?appid=619cd4039c26e42174770ad2b8c5ab64&units=metric&q=${cityName}&cnt=${dayCnt}`)
      .then(res => res.json())
      .then(json => dispatch(fetchCitySuccess(json)))
      .catch(err => dispatch(fetchCityFailure(err.message)));
  };

export const removeCity = (cityId = null) => ({
  type: types.CITY_REMOVE,
  payload: cityId,
});

