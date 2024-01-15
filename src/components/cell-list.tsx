import { Fragment } from 'react';
import { useTypedSelector } from '../hooks/use-typed-selector';
import { memoizedSelectOrderedCells } from '../state/selectors';
import AddCell from './add-cell';
import CellListItem from './cell-list-item';

const CellList: React.FC = () => {
  const cells = useTypedSelector((state) => memoizedSelectOrderedCells(state));

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
