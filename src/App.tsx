import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { supabase } from './lib/supabase';
import { useStore } from './store/useStore';
import ProtectedRoute from './components/ProtectedRoute';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Algorithms from './pages/Algorithms';
import AlgorithmDetail from './pages/AlgorithmDetail';
import Exercises from './pages/Exercises';
import ExerciseDetail from './pages/ExerciseDetail';
import Paths from './pages/Paths';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Pricing from './pages/Pricing';
import Languages from './pages/Languages';
import LanguageDetail from './pages/LanguageDetail';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Leaderboard from './pages/Leaderboard';
import ResetPassword from './pages/ResetPassword';
import Flashcards from './pages/Flashcards';
import FlashcardSession from './pages/FlashcardSession';

import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import UIPolish from './components/UIPolish';
import XPBubbles from './components/XPBubbles';
import QuestWidget from './components/QuestWidget';

export default function App() {
  const setUser = useStore(state => state.setUser);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [setUser]);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text)]">
      <UIPolish />
      <XPBubbles />
      <QuestWidget />
      <Toaster 
        position="bottom-center" 
        toastOptions={{ 
          style: { 
            background: 'var(--bg3)', 
            color: 'var(--text-bright)', 
            borderRadius: '1rem', 
            border: '1px solid var(--border)' 
          } 
        }} 
      />
      <Navbar />
      <main className="flex-1 relative z-10 pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/algorithms" element={<Algorithms />} />
          <Route path="/algorithms/:id" element={<AlgorithmDetail />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/exercises/:id" element={<ExerciseDetail />} />
          <Route path="/paths" element={<Paths />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/languages" element={<Languages />} />
          <Route path="/languages/:id" element={<LanguageDetail />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/flashcards" element={<ProtectedRoute><Flashcards /></ProtectedRoute>} />
          <Route path="/flashcards/session" element={<ProtectedRoute><FlashcardSession /></ProtectedRoute>} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Chatbot />
        <Footer />
      </main>
    </div>
  );
}
