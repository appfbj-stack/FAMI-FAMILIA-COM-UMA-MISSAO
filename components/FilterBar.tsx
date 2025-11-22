
import React from 'react';
import { CHURCHES } from '../constants';

interface FilterBarProps {
  selectedChurch: string;
  onChurchChange: (church: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ selectedChurch, onChurchChange }) => {
  return (
    <div className="bg-white p-4 shadow-md sticky top-[72px] md:top-[88px] z-10">
      <div className="container mx-auto">
        <label htmlFor="church-filter" className="block text-sm font-medium text-gray-700 mb-1">
          Filtrar por igreja
        </label>
        <select
          id="church-filter"
          value={selectedChurch}
          onChange={(e) => onChurchChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition"
        >
          <option value="all">Todas as Igrejas</option>
          {CHURCHES.map(church => (
            <option key={church} value={church}>{church}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
