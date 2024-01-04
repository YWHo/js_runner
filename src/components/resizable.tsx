import { useEffect, useState } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import './resizable.css';

interface ResizableProps {
  direction: 'horizontal' | 'vertical'; // only allow certain strings
  children?: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  let resizableProps: ResizableBoxProps;

  useEffect(() => {
    const listener = debounce(() => {
      setInnerHeight(window.innerHeight);
      setInnerWidth(window.innerWidth);
    }, 100);

    window.addEventListener('resize', listener);

    return () => {
      window.removeEventListener('resize', listener);
    };
  }, []);

  // Note: Need Math.floor() to convert the result of floating point multiplication
  //      to an integer to avoid the issue of
  //      "ResizeObserver loop completed with undelivered notifications"
  if (direction === 'horizontal') {
    resizableProps = {
      className: 'resize-horizontal',
      height: Infinity,
      width: Math.floor(innerWidth * 0.75),
      minConstraints: [Math.floor(innerWidth * 0.2), Infinity],
      maxConstraints: [Math.floor(innerWidth * 0.75), Infinity],
      resizeHandles: ['e'],
    };
  } else {
    resizableProps = {
      height: 300,
      width: Infinity,
      minConstraints: [Infinity, 24],
      maxConstraints: [Infinity, Math.floor(innerHeight * 0.9)],
      resizeHandles: ['s'],
    };
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

function debounce(fn: Function, ms = 300) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
}

export default Resizable;
