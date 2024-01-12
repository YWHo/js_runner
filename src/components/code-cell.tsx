import React, { useEffect, useState } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';
import bundle from '../bundler';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';

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
  const [userCode, setUserCode] = useState('');
  const [err, setErr] = useState('');
  const { updateCell } = useActions();

  useEffect(() => {
    const initialRun = async () => {
      const result = await bundle(cell.content);
      setUserCode(result.code);
    };
    setTimeout(initialRun, 500);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      const result = await bundle(cell.content);
      setUserCode(result.code);
      setErr(result.err);
    }, 1000);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [cell.content]);

  return (
    <Resizable direction='vertical'>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction='horizontal'>
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <Preview userCode={userCode} bundlingErr={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
