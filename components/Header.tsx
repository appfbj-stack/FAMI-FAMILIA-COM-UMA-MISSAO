
import React from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../hooks/useAdmin';
import { Sun, Moon } from 'lucide-react';

interface HeaderProps {
  toggleTheme?: () => void;
  isDarkMode?: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleTheme, isDarkMode }) => {
  const isAdmin = useAdmin();

  return (
    <header className="bg-white dark:bg-slate-900/80 text-slate-900 dark:text-white shadow-sm sticky top-0 z-50 backdrop-blur-md transition-colors duration-500 border-b border-slate-100 dark:border-slate-800">
      <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 md:space-x-3 group">
          <div className="bg-indigo-600 dark:bg-brand-gold p-1.5 md:p-2 rounded-xl shadow-lg shadow-indigo-200 dark:shadow-brand-gold/20 group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-7 md:w-7 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 12.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl md:text-2xl font-black tracking-tighter leading-none font-display uppercase italic">
              FAMI
            </h1>
            <span className="text-[10px] md:text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Regional Sorocaba</span>
          </div>
        </Link>
        
        <div className="flex items-center space-x-3 md:space-x-6">
          {toggleTheme && (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300"
              aria-label="Alternar tema"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          )}

          <Link 
            to="/admin" 
            className="transition-all duration-300 transform active:scale-95"
            aria-label="Painel Administrativo"
          >
            {isAdmin ? (
               <div className="flex items-center space-x-2 bg-indigo-50 dark:bg-slate-800 border border-indigo-100 dark:border-slate-700 px-4 py-2 rounded-xl hover:bg-indigo-100 dark:hover:bg-slate-700 transition shadow-sm">
                  <div className="w-2 h-2 bg-indigo-600 dark:bg-brand-gold rounded-full animate-pulse"></div>
                  <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-brand-gold">Painel Admin</span>
               </div>
            ) : (
              <div className="bg-slate-100 dark:bg-slate-800 p-2.5 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
