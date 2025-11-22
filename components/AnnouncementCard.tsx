import React from 'react';
import { Announcement } from '../types';

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

  return (
    <div 
      className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col"
      onClick={() => onSelect(announcement)}
    >
      <img className="w-full h-48 object-cover" src={imageUrl} alt={imageAlt} />
      <div className="p-6 flex flex-col flex-grow">
        <p className="text-sm text-indigo-600 font-semibold">{church}</p>
        <h3 className="text-xl font-bold text-slate-800 mt-2">{title}</h3>
        <p className="text-slate-600 mt-2 flex-grow">{description.substring(0, 100)}...</p>
        <p className="text-sm text-slate-500 mt-4 font-medium">{formattedDate}</p>
      </div>
    </div>
  );
};

export default AnnouncementCard;
