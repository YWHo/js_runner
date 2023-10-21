import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

const App = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const onClick = () => {
    console.log(input);
  };

  return (
    <div>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre></pre>
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
