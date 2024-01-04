import React, { useEffect, useRef } from 'react';
import './preview.css';

const html = `
    <html>
      <head></head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener('message', (event) => {
            try {
              eval(event.data); 
            } catch (err) {
              const root = document.querySelector('#root');
              root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
              console.error(err);
            }
          }, false)
        </script>
      </body>
    </html>
  `;

interface PreviewProps {
  userCode: string;
}

const Preview: React.FC<PreviewProps> = ({ userCode }) => {
  const iframeRef = useRef<any>();

  useEffect(() => {
    iframeRef.current.srcdoc = html;
    iframeRef.current.contentWindow.postMessage(userCode, '*');
  }, [userCode]);

  return (
    <div className='preview-wrapper'>
      <iframe
        title='code preview'
        ref={iframeRef}
        sandbox='allow-scripts'
        srcDoc={html}
      />
    </div>
  );
};

export default Preview;
