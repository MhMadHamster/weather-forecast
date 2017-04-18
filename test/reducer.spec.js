import { Map } from 'immutable';
import reducer from '../src/reducers/city';
import * as types from '../src/constants/ActionTypes';

describe('city reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {}),
    ).toEqual({
      arrCities: Map([]),
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
    const payload = {
      city: {
        id: 1,
      },
      value: 'some city',
    };
    const expectedResult = Map().set(1, payload);

    expect(
      reducer({
        arrCities: Map([]),
        loading: true,
      }, {
        type: types.FETCH_CITY_SUCCESS,
        payload: {
          city: {
            id: 1,
          },
          value: 'some city',
        },
      }),
    ).toEqual({
      arrCities: expectedResult,
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
    const payload = {
      city: {
        id: 1,
      },
      value: 'some city',
    };
    const defaultMap = Map().set(1, payload);


    expect(
      reducer({
        arrCities: defaultMap,
      }, {
        type: types.CITY_REMOVE,
        payload: 1,
      }),
    ).toEqual({
      arrCities: Map([]),
    });
  });
});
