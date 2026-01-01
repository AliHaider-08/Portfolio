import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Provider } from 'jotai';
import { useDarkMode } from './hooks/useAtomState';

import Navbar from "./Componets/Navbar";
import HeroSection from "./Componets/HeroSection";
import Skills from "./Componets/Skills";
import Service from "./Componets/Service";
import Projects from "./Componets/Projects";
import Education from "./Componets/Education";
import Contact from "./Componets/Contactus";
import Experience from "./Componets/Experience";
import CV from "./Componets/CV";
import ScrollToTop from "./Componets/ScrollToTop";
import Footer from "./Componets/Footer";

function App() {
  return (
    <Provider>
      <AppContent />
    </Provider>
  );
}

function AppContent() {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <Router
      basename={import.meta.env.BASE_URL}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <div className={`min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300`}>
        <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />

        {/* Scroll to hash on navigation (e.g., /#skills) */}
        <ScrollToHash />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/services" element={<Service />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/education" element={<Education />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/cv" element={<CV />} />
          <Route
            path="*"
            element={
              <div className="flex items-center justify-center min-h-[70vh] text-center text-gray-700 dark:text-gray-300">
                <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
              </div>
            }
          />
        </Routes>

        {/* Scroll to Top Button */}
        <ScrollToTop />
      </div>
    </Router>
  );
}

export default App;

// Compose a single-page Home with all major sections
function Home() {
  return (
    <>
      <HeroSection />
      <Service />
      <Projects />
      <Skills />
      {/* Ensure Experience/Education sections have section ids inside their components if needed */}
      <Experience />
      <Education />
      <Contact />
      <Footer />
    </>
  );
}

// Smoothly scroll to an element id when URL contains a hash (e.g., /#contact)
function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        // Delay to ensure element is mounted (esp. after route changes)
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 0);
      }
    }
  }, [location]);

  return null;
}
