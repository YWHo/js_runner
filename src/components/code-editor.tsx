import React, { useRef } from 'react';
import MonacoEditor, { OnMount } from '@monaco-editor/react';
import { editor as mEditor } from 'monaco-editor';
import prettier from 'prettier';
import babel from 'prettier/plugins/babel';
import estree from 'prettier/plugins/estree';

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<mEditor.IStandaloneCodeEditor>();
  const onEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
    editor.onDidChangeModelContent(() => {
      onChange(editor.getValue());
    });

    editor.updateOptions({ tabSize: 2 });
  };

  const onClickFormat = async () => {
    // get current value from editor
    const unformatted = editorRef.current?.getValue();
    console.log('unformatted:\n', unformatted);

    // format that value
    const formatted = await prettier.format(unformatted || '', {
      parser: 'babel',
      plugins: [babel, estree],
      useTabs: false,
      semi: true,
      singleQuote: true,
    });

    // set the formatted value back
    editorRef.current?.setValue(formatted);
  };

  return (
    <div>
      <button onClick={onClickFormat}>Format</button>
      <MonacoEditor
        onMount={onEditorDidMount}
        value={initialValue}
        theme="vs-dark"
        language="javascript"
        height="500px"
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
