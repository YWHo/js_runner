import MonacoEditor, { OnMount } from "@monaco-editor/react";
import React from "react";

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const onEditorDidMount: OnMount = (editor) => {
    editor.onDidChangeModelContent(() => {
      onChange(editor.getValue());
    });

    editor.updateOptions({ tabSize: 2 });
  };

  return (
    <MonacoEditor
      onMount={onEditorDidMount}
      value={initialValue}
      theme="vs-dark"
      language="javascript"
      height="500px"
      options={{
        wordWrap: "on",
        minimap: { enabled: false },
        showUnused: false,
        folding: false,
        lineNumbersMinChars: 3,
        fontSize: 16,
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
    />
  );
};

export default CodeEditor;
