import React from 'react';
import ReactDOM from 'react-dom/client';
import CodeCell from './components/code-cell';
import 'bulmaswatch/superhero/bulmaswatch.min.css';

const App = () => (
  <div>
    <CodeCell />
  </div>
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
