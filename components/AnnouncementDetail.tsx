
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Announcement } from '../types';
import Lightbox from './Lightbox';
import { useAdmin } from '../hooks/useAdmin';
import { 
  ChevronLeft, 
  Edit, 
  ZoomIn, 
  Calendar, 
  Share2, 
  ArrowLeft
} from 'lucide-react';

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

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(`*${announcement.title}*\n\n${announcement.description.substring(0, 100)}...\n\nConfira no FAMI: ${window.location.href}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <>
      <div className="animate-fade-in min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
        <div className="container mx-auto p-4 md:p-8 lg:p-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <button
                onClick={onBack}
                className="flex items-center space-x-3 text-indigo-600 dark:text-brand-gold font-black uppercase tracking-widest text-xs hover:text-indigo-800 dark:hover:text-brand-amber transition group"
            >
                <div className="bg-indigo-100 dark:bg-slate-800 p-2.5 rounded-xl group-hover:bg-indigo-200 dark:group-hover:bg-slate-700 transition-colors">
                    <ChevronLeft className="h-4 w-4" />
                </div>
                <span>Voltar ao Início</span>
            </button>
            {isAdmin && (
                <Link
                    to={`/admin?tab=announcements&editId=${announcement.id}`}
                     className="flex items-center space-x-2 text-indigo-600 dark:text-brand-gold font-black text-xs uppercase tracking-widest hover:text-indigo-800 dark:hover:text-brand-amber transition bg-white dark:bg-slate-900 px-6 py-3 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800"
                >
                    <Edit className="h-4 w-4" />
                    <span>Editar Anúncio</span>
                </Link>
            )}
          </div>
          
          <div className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800 transition-colors duration-500">
            <div className="relative group overflow-hidden">
              <img
                className="w-full h-72 md:h-[500px] object-cover cursor-pointer transition-transform duration-700 group-hover:scale-105"
                src={imageUrl}
                alt={imageAlt}
                onClick={() => setIsLightboxOpen(true)}
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center pointer-events-none">
                <div className="bg-white/20 backdrop-blur-md p-6 rounded-full text-white">
                    <ZoomIn className="h-10 w-10" />
                </div>
              </div>
            </div>
            <div className="p-8 md:p-16">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-12">
                <div className="flex-grow">
                  <div className="flex items-center space-x-3 mb-6">
                    <span className="w-10 h-1.5 bg-indigo-600 dark:bg-brand-gold rounded-full"></span>
                    <p className="text-sm text-indigo-600 dark:text-brand-gold font-black tracking-[0.2em] uppercase">{church}</p>
                  </div>
                  <h1 className="text-4xl md:text-7xl font-black text-slate-800 dark:text-white tracking-tighter leading-none mb-6 font-display italic uppercase">{title}</h1>
                  <div className="flex items-center space-x-3 text-slate-400 dark:text-slate-500 font-black text-[10px] uppercase tracking-widest">
                    <Calendar className="h-4 w-4" />
                    <span>{formattedDate}</span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={handleWhatsAppShare}
                    className="flex items-center space-x-3 bg-green-500 text-white font-black uppercase tracking-widest text-[10px] py-4 px-8 rounded-2xl shadow-lg hover:bg-green-600 hover:shadow-green-200 transition-all duration-300 transform active:scale-95"
                    aria-label="Compartilhar no WhatsApp"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    <span>WhatsApp</span>
                  </button>
                  {isShareSupported && (
                    <button
                      onClick={handleShare}
                      className="flex items-center space-x-3 bg-indigo-600 dark:bg-brand-gold text-white dark:text-slate-950 font-black uppercase tracking-widest text-[10px] py-4 px-8 rounded-2xl shadow-lg hover:bg-indigo-700 dark:hover:bg-brand-amber hover:shadow-indigo-200 dark:hover:shadow-brand-gold/20 transition-all duration-300 transform active:scale-95"
                      aria-label="Compartilhar anúncio"
                    >
                      <Share2 className="h-5 w-5" />
                      <span>Compartilhar</span>
                    </button>
                  )}
                </div>
              </div>
              <div className="prose prose-lg max-w-none text-slate-600 dark:text-slate-400 font-medium leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-12">
                {description.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-6 last:mb-0">{paragraph}</p>
                ))}
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
