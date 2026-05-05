import Editor from '@monaco-editor/react';

type CodeEditorProps = {
  value: string;
  language: string;
  onChange?: (value: string | undefined) => void;
  theme?: string;
};

export default function CodeEditor({ value, language, onChange, theme = 'vs-dark' }: CodeEditorProps) {
  return (
    <div className="rounded-lg overflow-hidden border border-[var(--border)] h-full min-h-[400px]">
      <Editor
        height="100%"
        defaultLanguage={language}
        defaultValue={value}
        theme={theme}
        onChange={onChange}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          padding: { top: 16, bottom: 16 },
        }}
      />
    </div>
  );
}
