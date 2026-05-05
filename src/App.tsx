import { Routes, Route } from 'react-router-dom';
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
import Profile from './pages/Profile';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text)]">
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
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Chatbot />
        <Footer />
      </main>
    </div>
  );
}
