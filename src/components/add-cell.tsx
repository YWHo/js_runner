import { useActions } from '../hooks/use-actions';
import './add-cell.css';

interface AddCellProps {
  forceVisible?: boolean;
  nextCellId: string | null;
}

const AddCell: React.FC<AddCellProps> = ({
  forceVisible = false,
  nextCellId,
}) => {
  const { insertCellBefore } = useActions();
  return (
    <div className={`add-cell ${forceVisible && 'force-visible'}`}>
      <div className='add-buttons'>
        <button
          className='button is-rounded is-primary is-small'
          onClick={() => insertCellBefore(nextCellId, 'code')}
        >
          <span className='icon is-small'>
            <i className='fa-solid fa-plus'></i>
          </span>
          <span>Code</span>
        </button>
        <button
          className='button is-rounded is-primary is-small'
          onClick={() => insertCellBefore(nextCellId, 'text')}
        >
          <span className='icon is-small'>
            <i className='fa-solid fa-plus'></i>
          </span>
          <span>Text</span>
        </button>
        <div className='divider'></div>
      </div>
    </div>
  );
};

export default AddCell;
