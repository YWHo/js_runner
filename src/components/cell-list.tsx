import { Fragment } from 'react';
import { createSelector } from 'reselect';
import { RootState, useTypedSelector } from '../hooks/use-typed-selector';
import AddCell from './add-cell';
import CellListItem from './cell-list-item';

// Refer to: https://redux.js.org/usage/deriving-data-selectors#optimizing-selectors-with-memoization
export const memoizedSelectCells = createSelector(
  [(state: RootState) => state.cells],
  (cells) => {
    const { order, data } = cells;
    return order.map((id) => data[id]);
  },
);

const CellList: React.FC = () => {
  const cells = useTypedSelector((state) => memoizedSelectCells(state));

  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell previousCellId={cell.id} />
    </Fragment>
  ));

  return (
    <div>
      <AddCell previousCellId={null} forceVisible={cells.length === 0} />
      {renderedCells}
    </div>
  );
};

export default CellList;
