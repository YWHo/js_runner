import React, { useEffect, useRef } from 'react';
import './preview.css';

const html = `
    <html>
      <head>
        <style>html {background-color: white; }</style>
      </head>
      <body>
        <div id="root"></div>
        <script>
          const handleError = (err) => {
            const root = document.querySelector('#root');
            root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
            console.error(err);
          }

          window.addEventListener('error', (event) => {
            event.preventDefault();
            handleError(event.error);
          });

          window.addEventListener('message', (event) => {
            try {
              eval(event.data); 
            } catch (err) {
              handleError(err);
            }
          }, false)

        </script>
      </body>
    </html>
  `;

interface PreviewProps {
  userCode: string;
  bundlingErr: string;
}

const Preview: React.FC<PreviewProps> = ({ userCode, bundlingErr }) => {
  const iframeRef = useRef<any>();

  useEffect(() => {
    iframeRef.current.srcdoc = html;
    setTimeout(() => {
      iframeRef.current.contentWindow.postMessage(userCode, '*');
    }, 50);
  }, [userCode]);

  return (
    <div className='preview-wrapper'>
      <iframe
        title='code preview'
        ref={iframeRef}
        sandbox='allow-scripts'
        srcDoc={html}
      />
      {bundlingErr && <div className='preview-error'>{bundlingErr}</div> }
    </div>
  );
};

export default Preview;
