import Editor from '@monaco-editor/react';

type CodeEditorProps = {
  value: string;
  language: string;
  onChange?: (value: string | undefined) => void;
  theme?: string;
};

export default function CodeEditor({ value, language, onChange, theme = 'codelearn-premium' }: CodeEditorProps) {
  const handleEditorWillMount = (monaco: any) => {
    monaco.editor.defineTheme('codelearn-premium', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'keyword', foreground: '10b981', fontStyle: 'bold' },
        { token: 'string', foreground: '60a5fa' },
        { token: 'comment', foreground: '6b7280', fontStyle: 'italic' },
        { token: 'number', foreground: 'f59e0b' },
        { token: 'type', foreground: 'a855f7' },
      ],
      colors: {
        'editor.background': '#131313', 
        'editor.foreground': '#f3f4f6',
        'editor.lineHighlightBackground': '#1e1e1e',
        'editorCursor.foreground': '#10b981',
        'editor.selectionBackground': '#10b98140',
        'editorLineNumber.foreground': '#4b5563',
      }
    });
  };

  return (
    <div className="rounded-lg overflow-hidden border border-[var(--border)] h-full min-h-[400px]">
      <Editor
        height="100%"
        defaultLanguage={language}
        value={value}
        theme={theme}
        onChange={onChange}
        beforeMount={handleEditorWillMount}
        options={{
          fontSize: 14,
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          fontLigatures: true,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          padding: { top: 16, bottom: 16 },
          smoothScrolling: true,
          cursorBlinking: 'smooth',
          cursorSmoothCaretAnimation: 'on',
        }}
      />
    </div>
  );
}
