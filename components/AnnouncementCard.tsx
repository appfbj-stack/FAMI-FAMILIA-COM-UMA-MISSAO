import React from 'react';
import { Announcement } from '../types';
import { Calendar, ArrowRight } from 'lucide-react';

interface AnnouncementCardProps {
  announcement: Announcement;
  onSelect: (announcement: Announcement) => void;
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ announcement, onSelect }) => {
  const { title, description, imageUrl, imageAlt, church, date } = announcement;
  
  const formattedDate = new Date(date + 'T00:00:00').toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  const handleWhatsAppShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = encodeURIComponent(`*${announcement.title}*\n\nConfira no FAMI: ${window.location.origin}/announcement/${announcement.id}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div 
      className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-sm hover:shadow-2xl overflow-hidden transform hover:-translate-y-2 transition-all duration-500 cursor-pointer flex flex-col h-full border border-slate-100 dark:border-slate-800 group"
      onClick={() => onSelect(announcement)}
    >
      <div className="relative h-56 md:h-64 overflow-hidden">
        <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={imageUrl} alt={imageAlt} />
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-indigo-700 dark:text-brand-gold text-[9px] font-black px-3 py-1.5 rounded-lg shadow-sm uppercase tracking-widest border border-indigo-100/50 dark:border-slate-700">
            {church}
          </span>
        </div>
        <button 
          onClick={handleWhatsAppShare}
          className="absolute top-4 right-4 bg-green-500 text-white p-2.5 rounded-2xl shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 hover:bg-green-600 active:scale-90"
          title="Compartilhar no WhatsApp"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </button>
      </div>
      <div className="p-8 md:p-10 flex flex-col flex-grow">
        <h3 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white leading-tight group-hover:text-indigo-600 dark:group-hover:text-brand-gold transition-colors tracking-tighter font-display italic uppercase">
          {title}
        </h3>
        <p className="text-slate-500 dark:text-slate-400 mt-4 flex-grow text-sm md:text-base leading-relaxed line-clamp-3 font-medium">
          {description}
        </p>
        <div className="mt-8 pt-8 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-slate-400 dark:text-slate-600" />
            <span className="text-xs text-slate-400 dark:text-slate-600 font-black uppercase tracking-widest">{formattedDate}</span>
          </div>
          <div className="text-indigo-600 dark:text-brand-gold opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
            <ArrowRight className="h-6 w-6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard;
