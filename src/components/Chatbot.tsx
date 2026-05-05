import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Bonjour ! Je suis l\'assistant CodeLearn. Comment puis-je vous aider aujourd\'hui ?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulate Bot Response
    setTimeout(() => {
      let botText = "C'est une excellente question ! Je vous conseille d'explorer notre section Algorithmes pour approfondir ce sujet.";
      
      const lowerInput = input.toLowerCase();
      if (lowerInput.includes('algo') || lowerInput.includes('algorithme')) {
        botText = "Les algorithmes sont le cœur de l'informatique. Commencez par le 'Bubble Sort' pour comprendre les bases du tri.";
      } else if (lowerInput.includes('python')) {
        botText = "Python est parfait pour débuter grâce à sa syntaxe lisible. Regardez notre guide dans la section 'Langages'.";
      } else if (lowerInput.includes('prix') || lowerInput.includes('gratuit')) {
        botText = "Nous avons un plan gratuit pour débuter et un plan Pro pour accéder à tous les exercices avancés !";
      }

      setMessages(prev => [...prev, { role: 'bot', text: botText }]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[var(--green)] text-black rounded-full shadow-[0_0_20px_rgba(0,255,0,0.3)] flex items-center justify-center z-[9999]"
      >
        {isOpen ? <X /> : <MessageSquare />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-24 right-6 w-[350px] md:w-[400px] h-[500px] bg-[var(--bg2)] border border-[var(--border)] rounded-2xl shadow-2xl flex flex-col z-[9999] overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-[var(--bg3)] border-b border-[var(--border)] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[var(--green)]/10 rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-[var(--green)]" />
                </div>
                <div>
                  <div className="text-sm font-bold">Assistant CodeLearn</div>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-[var(--green)] rounded-full animate-pulse" />
                    <span className="text-[10px] text-[var(--text-dim)]">En ligne</span>
                  </div>
                </div>
              </div>
              <Sparkles className="w-4 h-4 text-[var(--yellow)] opacity-50" />
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    m.role === 'user' 
                      ? 'bg-[var(--green)] text-black rounded-tr-none' 
                      : 'bg-[var(--bg3)] text-[var(--text-bright)] rounded-tl-none border border-[var(--border)]'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-[var(--border)] flex gap-2">
              <input 
                type="text" 
                placeholder="Posez votre question..."
                className="flex-1 bg-[var(--bg3)] border border-[var(--border)] rounded-xl px-4 py-2 text-sm focus:border-[var(--green)] outline-none"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSend()}
              />
              <button 
                onClick={handleSend}
                className="bg-[var(--green)] text-black p-2 rounded-xl hover:bg-[var(--green)]/80 transition-all"
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
