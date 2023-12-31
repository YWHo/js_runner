import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Preview from './components/preview';
import CodeEditor from './components/code-editor';
import bundle from './bundler';
import 'bulmaswatch/superhero/bulmaswatch.min.css';

const initialValue =
  'const a = 1;\n' +
  'const App = () => {\n' +
  '  return (\n' +
  '    <div>\n' +
  '      <h1>Hello World</h1>\n' +
  '      <button onClick={() => console.log("clicked!")}>Click me</button>\n' +
  '    </div>\n' +
  '  )\n' +
  '}';

const App = () => {
  const [userCode, setUserCode] = useState('');
  const [input, setInput] = useState(initialValue);

  const onClick = async () => {
    const result = await bundle(input);
    setUserCode(result);
  };

  return (
    <div>
      <CodeEditor
        initialValue={initialValue}
        onChange={(value) => setInput(value)}
      />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <Preview userCode={userCode} />
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
