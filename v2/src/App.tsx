import Hero from './components/Hero';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Resume from './components/Resume';
import { useState, useEffect } from 'react';
import { cn } from './lib/utils';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { Menu, X } from 'lucide-react';

const MainContent = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 flex justify-between items-center",
        isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent"
      )}>
        <span className="font-bold text-xl tracking-tighter cursor-pointer" onClick={() => navigate('/')}>AM.</span>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 text-sm font-medium">
          <button onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-primary transition-colors">Home</button>
          <button onClick={() => scrollToSection('projects')} className="hover:text-primary transition-colors">Projects</button>
          <button onClick={() => scrollToSection('experience')} className="hover:text-primary transition-colors">Experience</button>
          <button onClick={() => scrollToSection('contact')} className="hover:text-primary transition-colors">Contact</button>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-background border-b border-border p-4 flex flex-col gap-4 md:hidden shadow-lg animate-in slide-in-from-top-5">
            <button onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); setIsMobileMenuOpen(false); }} className="text-left hover:text-primary transition-colors py-2">Home</button>
            <button onClick={() => { scrollToSection('projects'); setIsMobileMenuOpen(false); }} className="text-left hover:text-primary transition-colors py-2">Projects</button>
            <button onClick={() => { scrollToSection('experience'); setIsMobileMenuOpen(false); }} className="text-left hover:text-primary transition-colors py-2">Experience</button>
            <button onClick={() => { scrollToSection('contact'); setIsMobileMenuOpen(false); }} className="text-left hover:text-primary transition-colors py-2">Contact</button>
          </div>
        )}
      </nav>

      <main>
        <Hero />
        <Projects />
        <Experience />
        <Contact />
      </main>

      <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border">
        <p>© {new Date().getFullYear()} Avinash Raj Malaka. All rights reserved.</p>
      </footer>
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainContent />} />
      <Route path="/resume" element={<Resume />} />
    </Routes>
  );
}

export default App;
