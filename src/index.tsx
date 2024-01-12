import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import CellList from './components/cell-list';
import { store } from './state';
import 'bulmaswatch/superhero/bulmaswatch.min.css';

const App = () => (
  <Provider store={store}>
    <CellList />
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
