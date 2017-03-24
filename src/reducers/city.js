import * as types from '../constants/ActionTypes';

const initialState = {
  arrCities: [],
  loading: false,
  error: null,
};

function cityReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_CITY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_CITY_SUCCESS:
      return {
        ...state,
        loading: false,
        arrCities: [
          ...state.arrCities,
          action.payload,
        ],
      };
    case types.FETCH_CITY_FAILURE:
      return {
        ...state,
        loading: false,
        error: `${action.err}`,
      };
    case types.CITY_REMOVE:
      return {
        ...state,
        arrCities: [
          ...state.arrCities.slice(0, action.payload),
          ...state.arrCities.slice(action.payload + 1),
        ],
      };
    default:
      return state;
  }
}

export default cityReducer;
