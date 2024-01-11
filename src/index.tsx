import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import CodeCell from './components/code-cell';
import TextEditor from './components/text-editor';
import { store } from './state';
import 'bulmaswatch/superhero/bulmaswatch.min.css';

const App = () => (
  <Provider store={store}>
    <div data-color-mode='dark'>
      <TextEditor />
      <CodeCell />
    </div>
  </Provider>
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
