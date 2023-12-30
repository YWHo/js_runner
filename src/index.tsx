import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import * as esbuild from 'esbuild-wasm';
import Preview from './components/preview';
import { unpkgPathPlugin } from './pluggins/unpkg-path-pluggin';
import { fetchPlugin } from './pluggins/fetch-plugin';
import CodeEditor from './components/code-editor';
import 'bulmaswatch/superhero/bulmaswatch.min.css';

const App = () => {
  const ref = useRef<any>();
  const [userCode, setUserCode] = useState('');
  const [input, setInput] = useState('');

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: `https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm`,
    });
  };

  useEffect(() => {
    startService();
  }, []);

  const onClick = async () => {
    if (!ref.current) return;

    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        'process.env.NODE_ENV': 'production',
        global: 'window',
      },
    });

    setUserCode(result);
  };

  return (
    <div>
      <CodeEditor
        initialValue={
          'const a = 1;\n' +
          'const App = () => {\n' +
          '  return (\n' +
          '    <div>\n' +
          '      <h1>Hello World</h1>\n' +
          '      <button onClick={() => console.log("clicked!")}>Click me</button>\n' +
          '    </div>\n' +
          '  )\n' +
          '}'
        }
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
