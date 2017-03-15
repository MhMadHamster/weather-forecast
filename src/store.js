import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import promise from 'redux-promise-middleware';
import { loadState } from './localStorage';
import cityReducer from './reducers/city';

const persistedState = loadState();

export default createStore(
  cityReducer,
  persistedState,
  applyMiddleware(
    logger(),
    promise(),
  ),
);
