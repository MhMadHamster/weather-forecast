import { Map } from 'immutable';
import * as types from '../constants/ActionTypes';

const initialState = {
  arrCities: Map([]),
  loading: false,
  error: null,
};

function cityReducer(state = initialState, action) {
  let arrCities;

  switch (action.type) {
    case types.FETCH_CITY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_CITY_SUCCESS:
      if (!state.arrCities.has(action.payload.city.id)) {
        arrCities = state.arrCities.set(action.payload.city.id, action.payload);
      } else {
        arrCities = state.arrCities;
      }
      return {
        ...state,
        loading: false,
        arrCities,
      };
    case types.FETCH_CITY_FAILURE:
      return {
        ...state,
        loading: false,
        error: `${action.err}`,
      };
    case types.CITY_REMOVE:
      arrCities = state.arrCities.delete(action.payload);
      return {
        ...state,
        arrCities,
      };
    default:
      return state;
  }
}

export default cityReducer;
