import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'bot';
  text: string;
  isTyping?: boolean;
}

const SYSTEM_PROMPT = `Tu es l'Expert-Instructeur d'AlgoMaster. Ton ton est sérieux, professionnel, mais encourageant (style mentor de la Silicon Valley). 
Ton objectif est d'aider les développeurs à maîtriser l'algorithmique de haut niveau. 
- Ne donne jamais la solution complète immédiatement : guide l'utilisateur par des questions ou des indices.
- Utilise des termes techniques précis (Big O, Structure de Données, Optimisation).
- Formate tes réponses avec du Markdown propre.
- Si on te demande du code, explique chaque ligne de manière pédagogique.
- Rappelle-toi que tes réponses IA peuvent être imprécises.`;

async function callGeminiAPI(messages: Message[]): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('VITE_GEMINI_API_KEY non configurée');
  }

  const history = messages.slice(0, -1).map(m => ({
    role: m.role === 'user' ? 'user' : 'model',
    parts: [{ text: m.text }]
  }));

  const lastMessage = messages[messages.length - 1];

  const body = {
    system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents: [
      ...history,
      { role: 'user', parts: [{ text: lastMessage.text }] }
    ],
    generationConfig: {
      maxOutputTokens: 512,
      temperature: 0.7,
    }
  };

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message || 'Erreur API Gemini');
  }

  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Désolé, je ne peux pas répondre pour le moment.';
}

// Fallback smart responses when no API key
function smartFallback(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes('algo') || lower.includes('algorithme')) {
    return "Les algorithmes sont le cœur de l'informatique. Commencez par le 'Bubble Sort' pour comprendre les bases du tri, puis passez au 'Quick Sort' pour plus d'efficacité !";
  }
  if (lower.includes('python')) {
    return "Python est parfait pour débuter grâce à sa syntaxe lisible. Consultez notre guide dans la section 'Langages' pour comparer avec JavaScript et d'autres !";
  }
  if (lower.includes('prix') || lower.includes('gratuit') || lower.includes('payant') || lower.includes('pro')) {
    return "Nous avons un plan gratuit pour débuter et un plan Pro (19€/mois) pour accéder à tous les exercices avancés et obtenir des certificats !";
  }
  if (lower.includes('recrutement') || lower.includes('job') || lower.includes('entretien')) {
    return "Notre section 'Roadmap' est conçue pour vous préparer aux entretiens techniques. Suivez le parcours 'Ingénieur Logiciel' pour un prep complet !";
  }
  if (lower.includes('complexit') || lower.includes('big o')) {
    return "La notation Big O mesure l'efficacité d'un algorithme. O(1) = constant, O(log n) = logarithmique, O(n) = linéaire, O(n²) = quadratique. Les algos de tri avancés visent O(n log n) !";
  }
  if (lower.includes('graph') || lower.includes('bfs') || lower.includes('dfs')) {
    return "BFS (Breadth-First Search) explore niveau par niveau — parfait pour trouver le chemin le plus court. DFS (Depth-First Search) va en profondeur d'abord. Les deux sont dans notre section Algorithmes !";
  }
  if (lower.includes('merci') || lower.includes('super') || lower.includes('parfait')) {
    return "Je vous en prie ! C'est un plaisir de vous aider dans votre apprentissage. N'hésitez pas si vous avez d'autres questions 😊";
  }
  return "C'est une excellente question ! Explorez notre section Algorithmes et Exercices pour approfondir ce sujet. Puis-je vous aider avec quelque chose de plus précis ?";
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: "Bonjour ! Je suis l'assistant AlgoMaster. Comment puis-je vous aider aujourd'hui ? (Les réponses IA peuvent contenir des erreurs — vérifiez les points importants.)" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userText = input.trim();
    setInput('');

    const userMsg: Message = { role: 'user', text: userText };
    const typingMsg: Message = { role: 'bot', text: '...', isTyping: true };

    setMessages(prev => [...prev, userMsg, typingMsg]);
    setIsLoading(true);

    try {
      let botText: string;
      const hasKey = !!import.meta.env.VITE_GEMINI_API_KEY;
      if (hasKey) {
        const allMsgs = [...messages, userMsg];
        botText = await callGeminiAPI(allMsgs);
      } else {
        await new Promise(r => setTimeout(r, 800));
        botText = smartFallback(userText);
      }
      setMessages(prev => [...prev.filter(m => !m.isTyping), { role: 'bot', text: botText }]);
    } catch (err: any) {
      setMessages(prev => prev.filter(m => !m.isTyping));
      toast.error('Erreur du chatbot. Vérifiez votre clé API.');
    } finally {
      setIsLoading(false);
    }
  };

  const TypingIndicator = () => (
    <div className="flex gap-1 items-center py-1 px-2">
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
          className="w-2 h-2 bg-[var(--primary)] rounded-full"
        />
      ))}
    </div>
  );

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[var(--primary)] text-white rounded-full shadow-[0_0_30px_rgba(99,102,241,0.4)] flex items-center justify-center z-[9999]"
        aria-label="Ouvrir l'assistant"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isOpen ? 'close' : 'open'}
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? <X /> : <MessageSquare />}
          </motion.div>
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 w-[350px] md:w-[400px] h-[520px] bg-[var(--bg2)] border border-[var(--border)] rounded-2xl shadow-2xl flex flex-col z-[9999] overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-[var(--bg3)] border-b border-[var(--border)] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-[var(--primary)]/10 rounded-xl flex items-center justify-center">
                  <Bot className="w-5 h-5 text-[var(--primary)]" />
                </div>
                <div>
                  <div className="text-sm font-bold">Assistant AlgoMaster</div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full animate-pulse" />
                    <span className="text-[10px] text-[var(--text-dim)]">
                      {import.meta.env.VITE_GEMINI_API_KEY ? 'IA Gemini connectée' : 'Mode hors-ligne'}
                    </span>
                  </div>
                </div>
              </div>
              <Sparkles className="w-4 h-4 text-[var(--yellow)] opacity-60" />
            </div>

            <div className="px-4 py-2 text-[10px] text-[var(--text-dim)] border-b border-[var(--border)] bg-[var(--bg)]/80 leading-snug">
              Avertissement : contenu généré par IA — ne substitue pas un cours, un mentor ou les spécifications officielles d&apos;un examen.
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-[var(--bg)] to-[var(--bg2)]" style={{ scrollbarWidth: 'none' }}>
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`relative max-w-[85%] px-5 py-3.5 rounded-2xl text-sm leading-relaxed shadow-lg ${
                    m.role === 'user'
                      ? 'bg-[var(--primary)] text-white rounded-tr-sm font-medium'
                      : 'bg-[var(--bg3)] text-[var(--text-bright)] rounded-tl-sm border border-[var(--border)] glass'
                  }`}>
                    {m.role === 'bot' && (
                      <div className="absolute -top-6 left-0 text-[9px] font-black uppercase tracking-tighter text-[var(--primary)] mb-1 opacity-60">
                        Expert Instructeur
                      </div>
                    )}
                    {m.isTyping ? <TypingIndicator /> : (
                      <div className="markdown-content">
                        <ReactMarkdown>{m.text}</ReactMarkdown>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-[var(--border)] flex gap-2">
              <input
                ref={inputRef}
                type="text"
                placeholder="Posez votre question..."
                className="flex-1 bg-[var(--bg3)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-sm focus:border-[var(--primary)] outline-none transition-all"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="bg-[var(--primary)] text-white p-2.5 rounded-xl hover:bg-[var(--primary)]/80 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
