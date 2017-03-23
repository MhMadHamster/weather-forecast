import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import expect from 'expect';
import * as actions from '../src/actions/city';
import * as types from '../src/constants/ActionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it(`create ${types.FETCH_CITY_SUCCESS} when fetching city has been done`, () => {
    nock('http://api.openweathermap.org')
      .get('/data/2.5/forecast/daily?appid=619cd4039c26e42174770ad2b8c5ab64&units=metric&q=Moscow&cnt=1')
      .reply(200, {
        body: 'test data',
      });

    const expectedActions = [
      { type: types.FETCH_CITY_REQUEST },
      { type: types.FETCH_CITY_SUCCESS, payload: { body: 'test data' } },
    ];
    const store = mockStore({
      loading: false,
      arrCities: [],
    });

    return store.dispatch(actions.fetchCity('Moscow'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
