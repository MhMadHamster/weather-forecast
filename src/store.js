import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import promise from 'redux-promise-middleware';
import throttle from 'lodash/throttle';
import { loadState, saveState } from './localStorage';
import cityReducer from './reducers/city';

const configureStore = () => {
  const persistedState = loadState();
  const store = createStore(
    cityReducer,
    persistedState,
    applyMiddleware(
      logger(),
      promise(),
    ),
  );

  store.subscribe(throttle(() => {
    saveState(store.getState());
  }, 1000));

  return store;
};

export default configureStore;
