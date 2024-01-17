import { legacy_createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import reducers from './reducers';
import { ActionType } from './action-types';

export const store = legacy_createStore(
  reducers,
  composeWithDevTools(applyMiddleware(reduxThunk)),
);

// Note: The following code is not supposed to be included in the store.ts file
//       in actual production. This code is intended to produce a demo when the app
//       is first launched so that users will understand what to do with the app.

const sampleCode = `// This is a sample Javascript code.
// To try out the sample, please remove the comment below ("/*" and "*/").

/*
import React, { useState } from "react";
import ReactDOM from "react-dom/client";

const App = () => {
  const [count, setCount] = useState(0);
  console.log("count = ", count);

  return (
    <div>
      <h1>This is a demo</h1>
      <button onClick={() => setCount(count + 1)}>
        Click count: {count}
      </button>
    </div>
  )
};
show(<App />);
*/
`;

const instructionText = `This is a **markdown** editor.

To edit the content, please click on this window.

To add more windows, hover over the top or bottom border of any window to reveal buttons. After that, you can click on the "+ Code" or "+ Text" button.

Please note that everything in this app is temporary. Your writing or code will be lost if you refresh or close the browser.
`;

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
    content: instructionText,
  },
});
