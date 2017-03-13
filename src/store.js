import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import promise from 'redux-promise-middleware';
import cityReducer from './reducers/city';

export default createStore(
  cityReducer,
  applyMiddleware(
    logger(),
    promise(),
  ),
);
