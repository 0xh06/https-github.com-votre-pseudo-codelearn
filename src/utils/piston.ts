const PISTON_URLS = [
  'https://emkc.org/api/v2/piston/execute',
  'https://piston.engineering/api/v2/execute' // Alternative possible
];

const LANGUAGE_MAP: Record<string, { language: string; version: string }> = {
  javascript: { language: 'javascript', version: '18.15.0' },
  js: { language: 'javascript', version: '18.15.0' },
  python: { language: 'python', version: '3.10.0' },
};

export async function executeCode(sourceCode: string, lang: string) {
  const config = LANGUAGE_MAP[lang];
  if (!config) throw new Error(`Language ${lang} not supported`);

  for (const url of PISTON_URLS) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: config.language,
          version: config.version,
          files: [{ content: sourceCode }],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return data.run;
      }
    } catch (err) {
      console.warn(`Failed to connect to ${url}, trying next...`);
    }
  }

  throw new Error("Service d'exécution temporairement indisponible. Veuillez réessayer.");
}
