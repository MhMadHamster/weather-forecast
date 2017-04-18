import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import throttle from 'lodash/throttle';
import { Map } from 'immutable';
import { loadState, saveState } from './localStorage';
import cityReducer from './reducers/city';

const configureStore = () => {
  const persistedState = loadState();
  if (persistedState) {
    persistedState.arrCities = Map(persistedState.arrCities);
  }
  const store = createStore(
    cityReducer,
    persistedState,
    applyMiddleware(
      thunk,
      logger(),
    ),
  );

  store.subscribe(throttle(() => {
    saveState({
      arrCities: store.getState().arrCities.toJS(),
    });
  }, 1000));

  return store;
};

export default configureStore;
