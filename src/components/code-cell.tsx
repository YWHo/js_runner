import { useEffect, useState } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';
import bundle from '../bundler';

const initialValue =
  'import React from "react";\n' +
  'import ReactDOM from "react-dom/client";\n' +
  'const a = 1;\n' +
  'console.log("a = ", a);\n' +
  'const App = () => {\n' +
  '  return (\n' +
  '    <div>\n' +
  '      <h1>Hello World</h1>\n' +
  '      <button onClick={() => console.log("clicked!")}>Click me</button>\n' +
  '    </div>\n' +
  '  )\n' +
  '};\n' +
  'const root = ReactDOM.createRoot(document.getElementById("root"))\n' + 
  'root.render(<App />);\n';

const CodeCell = () => {
  const [userCode, setUserCode] = useState('');
  const [err, setErr] = useState('');
  const [input, setInput] = useState(initialValue);

  useEffect(() => {
    const initialRun = async () => {
      const result = await bundle(input);
      setUserCode(result.code);
    }
    setTimeout(initialRun, 500);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      const result = await bundle(input);
      setUserCode(result.code);
      setErr(result
        .err);
    }, 1000);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    }
  }, [input]);

  return (
    <Resizable direction='vertical'>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row'}}>
        <Resizable direction='horizontal'>
          <CodeEditor
            initialValue={initialValue}
            onChange={(value) => setInput(value)}
          />
        </Resizable>
        <Preview userCode={userCode} bundlingErr={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
