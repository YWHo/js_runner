import { createSelector } from 'reselect';
import { RootState } from '../reducers';

// Refer to: https://redux.js.org/usage/deriving-data-selectors#optimizing-selectors-with-memoization
export const memoizedSelectOrderedCells = createSelector(
  [(state: RootState) => state.cells],
  (cells) => {
    const { order, data } = cells;
    return order.map((id) => data[id]);
  },
);
