import reducer from '../src/reducers/city';
import * as types from '../src/constants/ActionTypes';

describe('city reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {}),
    ).toEqual({
      arrCities: [],
      loading: false,
      error: null,
    });
  });

  it(`should handle ${types.FETCH_CITY_REQUEST}`, () => {
    expect(
      reducer({
        loading: false,
      }, {
        type: types.FETCH_CITY_REQUEST,
      }),
    ).toEqual({
      loading: true,
    });
  });

  it(`should handle ${types.FETCH_CITY_SUCCESS}`, () => {
    expect(
      reducer({
        arrCities: [],
        loading: true,
      }, {
        type: types.FETCH_CITY_SUCCESS,
        payload: {
          city: 'some city',
        },
      }),
    ).toEqual({
      arrCities: [{
        city: 'some city',
      }],
      loading: false,
    });
  });

  it(`should handle ${types.FETCH_CITY_FAILURE}`, () => {
    expect(
      reducer({
        error: null,
        loading: true,
      }, {
        type: types.FETCH_CITY_FAILURE,
        err: 'error message',
      }),
    ).toEqual({
      loading: false,
      error: 'error message',
    });
  });

  it(`should handle ${types.CITY_REMOVE}`, () => {
    expect(
      reducer({
        arrCities: [{
          city: 'some city',
        }],
      }, {
        type: types.CITY_REMOVE,
        payload: 0,
      }),
    ).toEqual({
      arrCities: [],
    });
  });
});
