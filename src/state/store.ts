import { legacy_createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import reducers from './reducers';

export const store = legacy_createStore(
  reducers,
  composeWithDevTools(applyMiddleware(reduxThunk)),
);
