
import React from 'react';
import { usePwaInstall } from '../hooks/usePwaInstall';

const PwaInstallButton: React.FC = () => {
  const { canInstall, triggerInstall } = usePwaInstall();

  if (!canInstall) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-20 animate-fade-in">
      <button
        onClick={triggerInstall}
        className="flex items-center space-x-2 bg-indigo-600 text-white font-bold py-3 px-5 rounded-full shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-105"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
        <span>Instalar App</span>
      </button>
    </div>
  );
};

export default PwaInstallButton;
