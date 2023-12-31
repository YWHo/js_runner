import React, { useRef } from 'react';
import MonacoEditor, {
  OnChange as EditorOnChange,
  OnMount as EditorDidMount,
} from '@monaco-editor/react';
import { editor as mEditor } from 'monaco-editor';
import prettier from 'prettier';
import babel from 'prettier/plugins/babel';
import estree from 'prettier/plugins/estree';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import MonacoJSXHighlighter from 'monaco-jsx-highlighter';
import './code-editor.css';
import './syntax.css';

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

// CodeEditor component
const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<mEditor.IStandaloneCodeEditor>();

  const onEditorChange: EditorOnChange = (value) => {
    onChange(value || '');
  };

  const onEditorDidMount: EditorDidMount = (editorInstance, monacoInstance) => {
    editorRef.current = editorInstance;
    // editorInstance.onDidChangeModelContent(() => {
    //   console.log('onMount: editorInstance change:\n', editorInstance.getValue());
    //   onChange(editorInstance.getValue());
    // });

    editorInstance.updateOptions({ tabSize: 2 });

    const babelParse = (code: string) => {
      return parse(code, {
        sourceType: 'module',
        plugins: ['jsx'],
        errorRecovery: true,
      });
    };

    const highlighter = new MonacoJSXHighlighter(
      monacoInstance,
      babelParse,
      traverse,
      editorInstance,
    );
    highlighter.highlightOnDidChangeModelContent(100);
  };

  const onClickFormat = async () => {
    // get current value from editor
    const unformatted = editorRef.current?.getValue();

    // format that value
    const formatted = (
      await prettier.format(unformatted || '', {
        parser: 'babel',
        plugins: [babel, estree],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
    ).replace(/\n$/, '');

    // set the formatted value back
    editorRef.current?.setValue(formatted);
  };

  return (
    <div className='editor-wrapper'>
      <button
        className='button button-format is-primary is-small'
        onClick={onClickFormat}
      >
        Format
      </button>
      <MonacoEditor
        onMount={onEditorDidMount}
        value={initialValue}
        theme='vs-dark'
        language='javascript'
        height='100%'
        onChange={onEditorChange}
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
