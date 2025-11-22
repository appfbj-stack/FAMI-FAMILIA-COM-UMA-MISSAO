
import React from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../hooks/useAdmin';

const Header: React.FC = () => {
  const isAdmin = useAdmin();

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-lg sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 md:py-6 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 group">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10 group-hover:scale-110 transition-transform" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 12.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
          </svg>
          <div className="flex flex-col">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight leading-tight">
              FAMI
            </h1>
            <span className="text-xs md:text-sm font-medium text-indigo-100">Família com uma Missão</span>
          </div>
        </Link>
        
        <Link 
          to="/admin" 
          className="p-2 rounded-full hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label="Painel Administrativo"
        >
          {isAdmin ? (
             <div className="flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
                <span className="text-xs font-bold hidden md:inline">Painel Admin</span>
             </div>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-200 hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;
