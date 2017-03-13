const initialState = {
  arrCities: [],
  loading: false,
  error: null,
};

function cityReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_CITY_PENDING':
      return {
        ...state,
        loading: true,
      };
    case 'FETCH_CITY_FULFILLED':
      return {
        ...state,
        loading: false,
        arrCities: [
          ...state.arrCities,
          action.payload.data,
        ],
      };
    case 'FETCH_CITY_REJECTED':
      return {
        ...state,
        loading: false,
        error: `${action.payload.message}`,
      };
    case 'REMOVE_CITY':
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
