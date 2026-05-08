import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Hammer, ChevronLeft, CheckCircle2, Circle, Code2, Terminal, 
  Play, Save, Layout, FileCode, CheckSquare, Sparkles, Trophy,
  Bot, Info, ChevronRight, Share2, Rocket
} from 'lucide-react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import CodeEditor from '../components/CodeEditor';
import Seo from '../components/Seo';
import { useStore } from '../store/useStore';
import confetti from 'canvas-confetti';

const PROJECT_DATA: Record<string, any> = {
  'todo-react': {
    title: 'Gestionnaire de Tâches React',
    difficulty: 'Intermédiaire',
    lang: 'JavaScript',
    xp: 500,
    steps: [
      { id: 1, title: 'Initialisation du State', desc: 'Créez un state `todos` avec `useState` pour stocker la liste des tâches.' },
      { id: 2, title: 'Affichage de la Liste', desc: 'Utilisez `.map()` pour transformer votre tableau de tâches en éléments JSX.' },
      { id: 3, title: 'Ajout de Tâches', desc: 'Implémentez la fonction `addTodo` qui met à jour le state avec une nouvelle entrée.' },
      { id: 4, title: 'Marquer comme Complété', desc: 'Ajoutez une fonction pour basculer l\'état `completed` d\'une tâche au clic.' },
      { id: 5, title: 'Persistance locale', desc: 'Utilisez `useEffect` et `localStorage` pour sauvegarder vos tâches.' }
    ],
    files: [
      { name: 'App.jsx', language: 'javascript', content: 'import React, { useState } from "react";\n\nexport default function App() {\n  const [todos, setTodos] = useState([]);\n\n  return (\n    <div className="p-8">\n      <h1 className="text-2xl font-bold">Ma Todo List</h1>\n      {/* Étape 1 : Implémentez ici */}\n    </div>\n  );\n}' },
      { name: 'index.css', language: 'css', content: 'body { background: #0a0a0a; color: white; }' }
    ]
  },
  'weather-py': {
    title: 'Bot Météo Python',
    difficulty: 'Débutant',
    lang: 'Python',
    xp: 300,
    steps: [
      { id: 1, title: 'Requête API', desc: 'Utilisez la bibliothèque `requests` pour appeler OpenWeatherMap.' },
      { id: 2, title: 'Parsing JSON', desc: 'Extrayez la température et les conditions météo du résultat.' },
      { id: 3, title: 'Formatage', desc: 'Créez une chaîne de caractères lisible avec les informations extraites.' }
    ],
    files: [
      { name: 'main.py', language: 'python', content: 'import requests\n\ndef get_weather(city):\n    # Étape 1 : Votre code ici\n    pass\n\nprint(get_weather("Paris"))' }
    ]
  }
};

export default function ProjectDetail() {
  const { id } = useParams();
  const { addXp } = useStore();
  const project = PROJECT_DATA[id || 'todo-react'];
  
  const [activeFile, setActiveFile] = useState(0);
  const [code, setCode] = useState(project?.files[0]?.content || '');
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  if (!project) return (
    <div className="container mx-auto py-20 text-center">
      <h1 className="text-2xl font-black mb-4">Projet introuvable dans La Forge</h1>
      <Link to="/projects" className="btn btn-primary">Retour à La Forge</Link>
    </div>
  );

  const toggleStep = (stepId: number) => {
    setCompletedSteps(prev => 
      prev.includes(stepId) ? prev.filter(s => s !== stepId) : [...prev, stepId]
    );
  };

  const handleRun = () => {
    setIsRunning(true);
    setOutput('Compilation du projet en cours...\n> Bundling assets...\n> Starting dev server...\n\n✅ Projet lancé avec succès sur http://localhost:3000\n\nLogs:\n[Render] App component mounted\n[State] todos initialized: []');
    setTimeout(() => setIsRunning(false), 1500);
  };

  const isProjectFinished = completedSteps.length === project.steps.length;

  const handleFinish = () => {
    if (isProjectFinished) {
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#f97316', '#fbbf24', '#ffffff']
      });
      addXp(project.xp);
      alert(`Félicitations ! Vous avez forgé : ${project.title}. +${project.xp} XP !`);
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col bg-[var(--bg)] overflow-hidden">
      <Seo title={`${project.title} | La Forge`} description={project.desc} />

      {/* Project Header */}
      <div className="h-14 border-b border-white/5 bg-white/[0.02] flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-4">
          <Link to="/projects" className="text-[var(--text-dim)] hover:text-white transition-colors">
            <ChevronLeft size={20} />
          </Link>
          <div className="h-4 w-px bg-white/10" />
          <div className="flex items-center gap-2">
            <Hammer size={16} className="text-orange-500" />
            <span className="text-sm font-black text-white">{project.title}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-orange-500">Live Workspace</span>
          </div>
          <button 
            onClick={handleFinish}
            disabled={!isProjectFinished}
            className={`px-4 py-1.5 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${
              isProjectFinished 
              ? 'bg-orange-500 text-black shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:scale-105' 
              : 'bg-white/5 text-white/20 border border-white/5 cursor-not-allowed'
            }`}
          >
            <Rocket size={14} /> Publier le Projet
          </button>
        </div>
      </div>

      <PanelGroup direction="horizontal" className="flex-1">
        {/* Left Side: Tasks & Instructions */}
        <Panel defaultSize={25} minSize={20} className="border-r border-white/5 bg-[#050505]">
          <div className="h-full flex flex-col">
            <div className="p-6 border-b border-white/5">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-[var(--text-dim)] mb-4">Objectifs de la Forge</h2>
              <div className="space-y-4">
                {project.steps.map((step: any) => (
                  <button 
                    key={step.id}
                    onClick={() => toggleStep(step.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all group ${
                      completedSteps.includes(step.id)
                      ? 'bg-orange-500/10 border-orange-500/30'
                      : 'bg-white/[0.02] border-white/5 hover:border-white/10'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1 shrink-0">
                        {completedSteps.includes(step.id) 
                          ? <CheckCircle2 size={18} className="text-orange-500" />
                          : <Circle size={18} className="text-[var(--text-dim)] group-hover:text-white" />
                        }
                      </div>
                      <div>
                        <div className={`text-sm font-black mb-1 ${completedSteps.includes(step.id) ? 'text-white' : 'text-[var(--text-dim)]'}`}>
                          {step.title}
                        </div>
                        <p className="text-[10px] leading-relaxed text-[var(--text-dim)]/70 font-medium">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto bg-white/[0.01]">
              <div className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/10 flex gap-3 mb-6">
                <Bot size={18} className="text-purple-400 shrink-0" />
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-purple-400 mb-1">Aide du Maître de Forge</div>
                  <p className="text-[11px] text-[var(--text-dim)] leading-relaxed">
                    N'oubliez pas que React rafraîchit l'interface à chaque fois que le state change. Utilisez des noms de variables explicites !
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Panel>

        <PanelResizeHandle className="w-1 flex items-center justify-center cursor-col-resize group hover:bg-orange-500/20 transition-colors">
          <div className="w-px h-12 bg-white/10 group-hover:bg-orange-500/50" />
        </PanelResizeHandle>

        {/* Center: Editor */}
        <Panel defaultSize={50} minSize={30} className="flex flex-col bg-[#080808]">
          <div className="h-10 border-b border-white/5 flex items-center bg-white/[0.01] px-4 gap-2">
            {project.files.map((file: any, i: number) => (
              <button
                key={file.name}
                onClick={() => { setActiveFile(i); setCode(file.content); }}
                className={`px-4 h-full flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all border-b-2 ${
                  activeFile === i ? 'border-orange-500 text-white bg-white/5' : 'border-transparent text-[var(--text-dim)] hover:text-white'
                }`}
              >
                <FileCode size={12} className={activeFile === i ? 'text-orange-500' : 'text-[var(--text-dim)]'} />
                {file.name}
              </button>
            ))}
          </div>
          <div className="flex-1 overflow-hidden">
            <CodeEditor 
              value={code}
              language={project.files[activeFile].language}
              onChange={(val) => setCode(val || '')}
            />
          </div>
          
          <div className="h-1/4 border-t border-white/5 bg-black flex flex-col">
            <div className="h-10 border-b border-white/5 flex items-center justify-between px-6 bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-[var(--text-dim)]" />
                <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-dim)]">Console de Sortie</span>
              </div>
              <button 
                onClick={handleRun}
                className="text-[10px] font-black uppercase tracking-widest text-orange-500 hover:text-orange-400 flex items-center gap-2"
              >
                <Play size={12} fill="currentColor" /> Refresh Preview
              </button>
            </div>
            <div className="flex-1 p-6 font-mono text-xs overflow-y-auto custom-scrollbar">
              <pre className="text-[var(--text-dim)] whitespace-pre-wrap">
                {output || '> Cliquez sur "Refresh Preview" pour compiler votre code.'}
              </pre>
            </div>
          </div>
        </Panel>

        <PanelResizeHandle className="w-1 flex items-center justify-center cursor-col-resize group hover:bg-orange-500/20 transition-colors">
          <div className="w-px h-12 bg-white/10 group-hover:bg-orange-500/50" />
        </PanelResizeHandle>

        {/* Right Side: Visual Preview */}
        <Panel defaultSize={25} minSize={20} className="bg-[#0a0a0a]">
          <div className="h-full flex flex-col p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-[var(--text-dim)]">Aperçu en Direct</h2>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500/20" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/20" />
                <div className="w-2 h-2 rounded-full bg-indigo-500/20" />
              </div>
            </div>
            
            <div className="flex-1 rounded-[32px] glass border border-white/5 overflow-hidden flex flex-col relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent pointer-events-none" />
              
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6">
                <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                  <Layout size={32} className="text-white/20" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-white mb-2">Web Render View</h4>
                  <p className="text-[11px] text-[var(--text-dim)] leading-relaxed">
                    Le rendu visuel de votre projet s'affichera ici une fois la compilation terminée.
                  </p>
                </div>
                
                {isRunning && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center"
                  >
                    <div className="w-12 h-12 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin mb-4" />
                    <span className="text-xs font-black uppercase tracking-widest text-orange-500">Compilation...</span>
                  </motion.div>
                )}
              </div>
            </div>
            
            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-dim)]">Progression</span>
                <span className="text-[10px] font-black text-orange-500">{Math.round((completedSteps.length / project.steps.length) * 100)}%</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden p-px border border-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(completedSteps.length / project.steps.length) * 100}%` }}
                  className="h-full bg-orange-500 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.5)]"
                />
              </div>
            </div>
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
}
