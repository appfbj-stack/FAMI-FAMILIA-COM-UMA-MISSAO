
import React from 'react';
import { CHURCHES } from '../constants';

interface FilterBarProps {
  selectedChurch: string;
  onChurchChange: (church: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ selectedChurch, onChurchChange }) => {
  return (
    <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl p-4 md:p-6 shadow-sm border-b border-slate-100 dark:border-slate-800 sticky top-[60px] md:top-[72px] z-40 transition-colors duration-500">
      <div className="container mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-indigo-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 dark:text-brand-gold" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
            </svg>
          </div>
          <label htmlFor="church-filter" className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            Filtrar por igreja local
          </label>
        </div>
        <div className="relative flex-grow max-w-xl">
          <select
            id="church-filter"
            value={selectedChurch}
            onChange={(e) => onChurchChange(e.target.value)}
            className="w-full appearance-none bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-800 dark:text-white py-4 px-6 pr-12 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-brand-gold/10 focus:border-indigo-500 dark:focus:border-brand-gold transition-all cursor-pointer font-black uppercase tracking-widest shadow-sm"
          >
            <option value="all">Todas as Igrejas da Região</option>
            {CHURCHES.map(church => (
              <option key={church} value={church}>{church}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400 dark:text-slate-500">
            <svg className="fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
