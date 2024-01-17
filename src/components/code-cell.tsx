import React, { useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';
import { useCumulativeCodeString } from '../hooks/use-cumulative-code';
import './code-cell.css';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const bundleResult = useTypedSelector((state) => state.bundles[cell.id]);
  const cumulativeCodeString = useCumulativeCodeString(cell.id);

  useEffect(() => {
    if (!bundleResult) {
      createBundle(cell.id, cumulativeCodeString);
      return;
    }

    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCodeString);
    }, 800);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.id, cumulativeCodeString, createBundle]);

  return (
    <Resizable direction='vertical'>
      <div
        style={{
          height: 'calc(100% - 10px)',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Resizable direction='horizontal'>
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        {!bundleResult || bundleResult.loading ? (
          <div className='progress-wrapper'>
            <div className='progress-cover'>
              <progress className='progress is-small is-primary' max='100'>
                Loading
              </progress>
            </div>
          </div>
        ) : (
          <Preview
            userCode={bundleResult.code}
            bundlingErr={bundleResult.err}
          />
        )}
      </div>
    </Resizable>
  );
};

export default CodeCell;
