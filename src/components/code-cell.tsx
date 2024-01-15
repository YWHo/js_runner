import React, { useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';

// const initialValue =
//   'import React from "react";\n' +
//   'import ReactDOM from "react-dom/client";\n' +
//   'const a = 1;\n' +
//   'console.log("a = ", a);\n' +
//   'const App = () => {\n' +
//   '  return (\n' +
//   '    <div>\n' +
//   '      <h1>Hello World</h1>\n' +
//   '      <button onClick={() => console.log("clicked!")}>Click me</button>\n' +
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

  useEffect(() => {
    if (!bundleResult) {
      createBundle(cell.id, cell.content);
      return;
    }

    const timer = setTimeout(async () => {
      createBundle(cell.id, cell.content);
    }, 800);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.id, cell.content, createBundle]);

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
        {bundleResult && (
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
