const PISTON_URL = 'https://emkc.org/api/v2/piston/execute';

const LANGUAGE_MAP: Record<string, { language: string; version: string }> = {
  javascript: { language: 'javascript', version: '18.15.0' },
  js: { language: 'javascript', version: '18.15.0' },
  python: { language: 'python', version: '3.10.0' },
};

export async function executeCode(sourceCode: string, lang: string) {
  // --- 1. LOCAL EXECUTION FOR JAVASCRIPT (100% RELIABLE) ---
  if (lang === 'js' || lang === 'javascript') {
    return new Promise((resolve) => {
      // Construction du Web Worker pour exécuter le JS sans bloquer le thread principal (Premium UX)
      const workerCode = `
        let logs = [];
        const originalLog = console.log;
        console.log = (...args) => {
          logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
        };
        try {
          let sourceCode = ${JSON.stringify(sourceCode)};
          let finalCode = sourceCode;
          if (sourceCode.includes('function bubbleSort') && !sourceCode.includes('bubbleSort([')) {
            finalCode += "\\nconsole.log('Résultat du tri:', bubbleSort([5, 2, 9, 1, 5, 6]));";
          } else if (sourceCode.includes('function binarySearch') && !sourceCode.includes('binarySearch([')) {
            finalCode += "\\nconsole.log('Index trouvé:', binarySearch([1, 2, 3, 4, 5], 3));";
          } else if (sourceCode.includes('function fib') && !sourceCode.includes('fib(')) {
            finalCode += "\\nconsole.log('Fibonacci(7):', fib(7));";
          }
          const result = eval(finalCode);
          if (logs.length === 0 && result !== undefined) logs.push(String(result));
          postMessage({ type: 'success', output: logs.join('\\n') || 'Exécuté avec succès (pas de sortie).' });
        } catch(err) {
          postMessage({ type: 'error', output: \`Erreur d'exécution: \${err.message}\` });
        }
      `;
      const blob = new Blob([workerCode], { type: 'application/javascript' });
      const worker = new Worker(URL.createObjectURL(blob));
      
      const timeoutId = setTimeout(() => {
        worker.terminate();
        resolve({ output: '❌ Erreur fatale: Temps d\\'exécution dépassé (> 3s).\\nUne boucle infinie a été détectée et arrêtée par sécurité.' });
      }, 3000);

      worker.onmessage = (e) => {
        clearTimeout(timeoutId);
        worker.terminate();
        resolve({ output: e.data.type === 'error' ? '❌ ' + e.data.output : e.data.output });
      };
      
      worker.onerror = (err) => {
        clearTimeout(timeoutId);
        worker.terminate();
        resolve({ output: \`❌ Erreur critique du Worker: \${err.message}\` });
      };
    });
  }

  // --- 2. REMOTE EXECUTION FOR OTHERS (PYTHON) ---
  const config = LANGUAGE_MAP[lang];
  if (!config) throw new Error(`Language ${lang} not supported`);

  try {
    // Add auto-call for Python too
    let finalPython = sourceCode;
    if (sourceCode.includes('def bubble_sort') && !sourceCode.includes('bubble_sort([')) {
      finalPython += "\nprint('Résultat du tri:', bubble_sort([5, 2, 9, 1, 5, 6]))";
    }

    const response = await fetch(PISTON_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: config.language,
        version: config.version,
        files: [{ content: finalPython }],
      }),
    });

    const data = await response.json();
    return data.run;
  } catch (err) {
    throw new Error("Service d'exécution distant indisponible. Vérifiez votre connexion.");
  }
}
