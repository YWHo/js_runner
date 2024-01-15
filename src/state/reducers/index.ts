import { combineReducers } from 'redux';
import bundlesReducer from './bundlesReducer';
import cellsReducer from './cellsReducer';

const reducers = combineReducers({
  bundles: bundlesReducer,
  cells: cellsReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
