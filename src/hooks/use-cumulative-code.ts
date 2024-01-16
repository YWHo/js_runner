import { useMemo } from 'react';
import { useTypedSelector } from './use-typed-selector';
import { memoizedSelectOrderedCells } from '../state/selectors';

export const useCumulativeCodeString = (cellId: string) => {
  const orderedCells = useTypedSelector((state) =>
    memoizedSelectOrderedCells(state),
  );
  return useMemo(() => {
    const showFunc = `
      import _React from 'react';
      import _ReactDOM from 'react-dom';
      var show = (value) => {
        const root = document.querySelector('#root');
        if (typeof value === 'object') {
          if (value.$$typeof && value.props) {
            const reactRoot = _ReactDOM.createRoot(root);
            reactRoot.render(value);
          } else {
            root.innerHTML = JSON.stringify(value);
          }
        } else {
          root.innerHTML = value;
        }
      };
    `;
    const showFuncNoop = 'var show = () => {}'; // use 'var' to allow multiple redefine
    const tmpCumulativeCode = [];
    for (let c of orderedCells) {
      if (c.type === 'code') {
        if (c.id === cellId) {
          tmpCumulativeCode.push(showFunc);
        } else {
          tmpCumulativeCode.push(showFuncNoop);
        }
        tmpCumulativeCode.push(c.content);
      }
      if (c.id === cellId) {
        break;
      }
    }
    const cumulativeCodeString = tmpCumulativeCode.join('\n');
    return cumulativeCodeString;
  }, [cellId, orderedCells]);
};
