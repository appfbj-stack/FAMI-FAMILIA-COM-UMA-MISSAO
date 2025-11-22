import React from 'react';

interface LightboxProps {
  imageUrl: string;
  altText: string;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ imageUrl, altText, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Visualizador de imagem"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-5xl font-bold hover:text-gray-300 transition z-10"
        aria-label="Fechar visualizador de imagem"
      >
        &times;
      </button>
      <div className="relative p-4" onClick={(e) => e.stopPropagation()}>
        <img
          src={imageUrl}
          alt={altText}
          className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
        />
      </div>
    </div>
  );
};

export default Lightbox;
