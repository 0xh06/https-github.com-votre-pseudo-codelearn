const PISTON_URL = 'https://emkc.org/api/v2/piston/execute';

const LANGUAGE_MAP: Record<string, { language: string; version: string }> = {
  javascript: { language: 'javascript', version: '18.15.0' },
  js: { language: 'javascript', version: '18.15.0' },
  python: { language: 'python', version: '3.10.0' },
};

export async function executeCode(sourceCode: string, lang: string) {
  const config = LANGUAGE_MAP[lang];
  if (!config) throw new Error(`Language ${lang} not supported`);

  const response = await fetch(PISTON_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      language: config.language,
      version: config.version,
      files: [{ content: sourceCode }],
    }),
  });

  const data = await response.json();
  return data.run; // { stdout, stderr, code, signal, output }
}
