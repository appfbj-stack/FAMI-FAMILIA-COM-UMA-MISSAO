
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Announcement } from '../types';
import Lightbox from './Lightbox';
import { useAdmin } from '../hooks/useAdmin';

interface AnnouncementDetailProps {
  announcement: Announcement;
  onBack: () => void;
}

const AnnouncementDetail: React.FC<AnnouncementDetailProps> = ({ announcement, onBack }) => {
  const { title, description, imageUrl, imageAlt, church, date } = announcement;
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isShareSupported, setIsShareSupported] = useState(false);
  const isAdmin = useAdmin();

  useEffect(() => {
    if (navigator.share) {
      setIsShareSupported(true);
    }
  }, []);

  const formattedDate = new Date(date + 'T00:00:00').toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: announcement.title,
          text: `Confira o novo anúncio no FAMI: ${announcement.title}`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing announcement:', error);
      }
    }
  };

  return (
    <>
      <div className="animate-fade-in">
        <div className="container mx-auto p-4 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <button
                onClick={onBack}
                className="flex items-center space-x-2 text-indigo-600 font-semibold hover:text-indigo-800 transition"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Voltar para o início</span>
            </button>
            {isAdmin && (
                <Link
                    to={`/admin?tab=announcements&editId=${announcement.id}`}
                     className="flex items-center space-x-2 text-indigo-600 font-semibold hover:text-indigo-800 transition bg-indigo-50 px-3 py-1 rounded-lg border border-indigo-100"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    <span>Editar Anúncio</span>
                </Link>
            )}
          </div>
          
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <img
              className="w-full h-64 md:h-96 object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
              src={imageUrl}
              alt={imageAlt}
              onClick={() => setIsLightboxOpen(true)}
            />
            <div className="p-6 md:p-10">
              <div className="flex justify-between items-start flex-wrap gap-4 mb-6">
                <div>
                  <p className="text-base text-indigo-600 font-bold tracking-wider uppercase">{church}</p>
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2">{title}</h1>
                  <p className="text-md text-slate-500 mt-2 font-medium">{formattedDate}</p>
                </div>
                {isShareSupported && (
                  <button
                    onClick={handleShare}
                    className="flex items-center space-x-2 bg-slate-100 text-slate-700 font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-slate-200 transition-colors duration-200 mt-2 md:mt-0"
                    aria-label="Compartilhar anúncio"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                    </svg>
                    <span>Compartilhar</span>
                  </button>
                )}
              </div>
              <div className="prose max-w-none text-slate-700 border-t pt-6">
                {description.split('\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              </div>
            </div>
          </div>
        </div>
      </div>
      {isLightboxOpen && (
        <Lightbox imageUrl={imageUrl} altText={imageAlt} onClose={() => setIsLightboxOpen(false)} />
      )}
    </>
  );
};

export default AnnouncementDetail;
