import React, { useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';
import './code-cell.css';

// const initialCodeSample =
//   'import React, { useState } from "react";\n' +
//   'import ReactDOM from "react-dom/client";\n' +
//   '' +
//   'const App = () => {\n' +
//   '  const [count, setCount] = useState(0);\n' +
//   '  console.log("count = ", count);\n' +
//   '' +
//   '  return (\n' +
//   '    <div>\n' +
//   '      <h1>This is a sample</h1>\n' +
//   '      <button onClick={() => setCount(count + 1)}>\n' +
//   '        Click count: {count}\n' +
//   '      </button>\n' +
//   '    </div>\n' +
//   '  )\n' +
//   '};\n' +
//   'const root = ReactDOM.createRoot(document.getElementById("root"))\n' +
//   'root.render(<App />);\n';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const bundleResult = useTypedSelector((state) => state.bundles[cell.id]);
  const cumulativeCode = useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map((id) => data[id]);
    const tmpCumulativeCode = [];
    for (let c of orderedCells) {
      if (c.type === 'code') {
        tmpCumulativeCode.push(c.content);
      }
      if (c.id === cell.id) {
        break;
      }
    }
    return tmpCumulativeCode;
  });
  const cumulativeCodeString = cumulativeCode.join('\n');

  // console.log(cumulativeCodeString);

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
