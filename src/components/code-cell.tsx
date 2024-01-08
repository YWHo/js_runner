import { useEffect, useState } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';
import bundle from '../bundler';

const initialValue =
  'import React from "react";\n' +
  'const a = 1;\n' +
  'const App = () => {\n' +
  '  return (\n' +
  '    <div>\n' +
  '      <h1>Hello World</h1>\n' +
  '      <button onClick={() => console.log("clicked!")}>Click me</button>\n' +
  '    </div>\n' +
  '  )\n' +
  '}';

const CodeCell = () => {
  const [userCode, setUserCode] = useState('');
  const [input, setInput] = useState(initialValue);

  useEffect(() => {
    const timer = setTimeout(async () => {
      const result = await bundle(input);
      setUserCode(result);
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
        <Preview userCode={userCode} />
        {/* <div>
          <button onClick={onClick}>Submit</button>
        </div> */}
      </div>
    </Resizable>
  );
};

export default CodeCell;
