
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import ChurchPage from './pages/ChurchPage';

import LandingPage from './pages/LandingPage';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('fami-theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('fami-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('fami-theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-500">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/mural" element={<HomePage toggleTheme={toggleTheme} isDarkMode={isDarkMode} />} />
        <Route path="/admin" element={<AdminPage toggleTheme={toggleTheme} isDarkMode={isDarkMode} />} />
        <Route path="/church/:id" element={<ChurchPage toggleTheme={toggleTheme} isDarkMode={isDarkMode} />} />
      </Routes>
    </div>
  );
}

export default App;
