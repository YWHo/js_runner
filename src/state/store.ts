import { legacy_createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import reducers from './reducers';
import { ActionType } from './action-types';

export const store = legacy_createStore(
  reducers,
  composeWithDevTools(applyMiddleware(reduxThunk)),
);

const sampleCode =
  '// This is a sample code. Please remove the comment below to try\n\n' +
  '/*\n' +
  'import React, { useState } from "react";\n' +
  'import ReactDOM from "react-dom/client";\n' +
  '' +
  'const App = () => {\n' +
  '  const [count, setCount] = useState(0);\n' +
  '  console.log("count = ", count);\n' +
  '' +
  '  return (\n' +
  '    <div>\n' +
  '      <h1>This is a demo</h1>\n' +
  '      <button onClick={() => setCount(count + 1)}>\n' +
  '        Click count: {count}\n' +
  '      </button>\n' +
  '    </div>\n' +
  '  )\n' +
  '};\n' +
  'show(<App />);\n' +
  '*/';

store.dispatch({
  type: ActionType.INSERT_CELL_AFTER,
  payload: {
    id: null,
    type: 'code',
    content: sampleCode,
  },
});

store.dispatch({
  type: ActionType.INSERT_CELL_AFTER,
  payload: {
    id: null,
    type: 'text',
  },
});
