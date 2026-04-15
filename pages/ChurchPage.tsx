
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Church, Announcement } from '../types';
import { getChurchById, getAnnouncements } from '../services/announcementService';
import AnnouncementCard from '../components/AnnouncementCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Lightbox from '../components/Lightbox';
import Header from '../components/Header';
import AnnouncementDetail from '../components/AnnouncementDetail';
import { useAdmin } from '../hooks/useAdmin';
import { 
  ArrowLeft, 
  MapPin, 
  Users, 
  Heart, 
  Calendar, 
  Edit, 
  Image as ImageIcon, 
  ChevronRight,
  Info,
  ExternalLink,
  FileText,
  Globe
} from 'lucide-react';

interface ChurchPageProps {
  toggleTheme?: () => void;
  isDarkMode?: boolean;
}

const ChurchPage: React.FC<ChurchPageProps> = ({ toggleTheme, isDarkMode }) => {
    const { id } = useParams<{ id: string }>();
    const [church, setChurch] = useState<Church | null>(null);
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
    const isAdmin = useAdmin();

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            setIsLoading(true);
            try {
                const churchData = await getChurchById(id);
                const allAnnouncements = await getAnnouncements();
                
                setChurch(churchData || null);
                
                if (churchData) {
                    // Filter announcements matching the church name
                    const churchAnnouncements = allAnnouncements.filter(
                        a => a.church === churchData.name
                    );
                    setAnnouncements(churchAnnouncements);
                }
            } catch (error) {
                console.error("Failed to fetch church data", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (isLoading) return <LoadingSpinner />;

    if (!church) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 transition-colors duration-500">
                <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
                <div className="text-center mt-20">
                    <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-4 uppercase tracking-tighter">Igreja não encontrada</h2>
                    <Link to="/" className="text-indigo-600 dark:text-brand-gold hover:underline font-black uppercase tracking-widest text-sm">
                        Voltar para a Regional
                    </Link>
                </div>
            </div>
        );
    }

    if (selectedAnnouncement) {
        return (
            <>
                <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
                <AnnouncementDetail 
                    announcement={selectedAnnouncement} 
                    onBack={() => setSelectedAnnouncement(null)} 
                />
            </>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 animate-fade-in pb-12 transition-colors duration-500">
            <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
            
            {/* Hero Section */}
            <div className="relative h-80 md:h-[500px] w-full group overflow-hidden">
                <img 
                    src={church.coverUrl} 
                    alt={`Fachada ${church.name}`} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent flex flex-col justify-end p-6 md:p-16 text-white">
                    <div className="container mx-auto relative">
                        <Link 
                            to="/" 
                            className="text-white/70 hover:text-white text-[10px] font-black uppercase tracking-widest mb-6 inline-flex items-center group/back transition-all"
                        >
                            <div className="bg-white/10 p-1.5 rounded-lg mr-2 group-hover/back:bg-white/20 transition-colors">
                                <ArrowLeft className="h-3 w-3" />
                            </div>
                            Voltar para Regional
                        </Link>
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div>
                                <h1 className="text-5xl md:text-8xl font-black mb-3 tracking-tighter leading-none font-display italic uppercase">{church.name}</h1>
                                <div className="flex flex-wrap items-center gap-4 mt-4">
                                    <div className="flex items-center gap-2 text-white/80 font-bold text-sm md:text-lg">
                                        <div className="bg-blue-500 dark:bg-brand-amber p-1.5 rounded-lg">
                                            <MapPin className="h-4 w-4 md:h-5 md:w-5 text-white" />
                                        </div>
                                        {church.address}
                                    </div>
                                    
                                    {church.mapUrl && (
                                        <a 
                                            href={church.mapUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl backdrop-blur-md transition-all border border-white/20 font-black uppercase tracking-widest text-[10px] flex items-center gap-2"
                                        >
                                            <ExternalLink className="h-3 w-3" />
                                            Como Chegar
                                        </a>
                                    )}
                                </div>
                                
                                <div className="flex items-center gap-3 mt-6">
                                    {church.socialInstagram && (
                                        <a 
                                            href={church.socialInstagram} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="bg-white/10 hover:bg-white/20 p-2.5 rounded-full backdrop-blur-md transition-all border border-white/20 text-white"
                                            title="Instagram"
                                        >
                                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                            </svg>
                                        </a>
                                    )}
                                    {church.socialFacebook && (
                                        <a 
                                            href={church.socialFacebook} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="bg-white/10 hover:bg-white/20 p-2.5 rounded-full backdrop-blur-md transition-all border border-white/20 text-white"
                                            title="Facebook"
                                        >
                                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                            </svg>
                                        </a>
                                    )}
                                    {church.websiteUrl && (
                                        <a 
                                            href={church.websiteUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="bg-white/10 hover:bg-white/20 p-2.5 rounded-full backdrop-blur-md transition-all border border-white/20 text-white"
                                            title="Site Oficial"
                                        >
                                            <Globe className="h-5 w-5" />
                                        </a>
                                    )}
                                </div>
                            </div>
                            {isAdmin && (
                                <Link 
                                    to={`/admin?tab=churches&editId=${church.id}`}
                                    className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-2xl backdrop-blur-md transition-all shadow-xl border border-white/20 font-black uppercase tracking-widest text-[10px] flex items-center gap-2 self-start md:self-auto"
                                    title="Editar Igreja"
                                >
                                    <Edit className="h-4 w-4" />
                                    Editar Igreja
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <main className="container mx-auto p-4 md:p-8 lg:p-12 -mt-12 md:-mt-20 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
                    {/* Left Column: Info & Pastoral Family */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Pastoral Family Card */}
                        <div className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl p-10 text-center relative overflow-hidden border border-slate-100 dark:border-slate-800 transition-colors duration-500">
                             <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-indigo-600 to-blue-600 dark:from-brand-gold dark:to-brand-amber opacity-5"></div>
                            <div className="w-44 h-44 mx-auto rounded-full p-1.5 bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-500 dark:from-brand-gold dark:via-brand-amber dark:to-brand-gold mb-8 relative z-10 shadow-2xl">
                                <img 
                                    src={church.pastoralFamily.photoUrl} 
                                    alt="Família Pastoral" 
                                    className="w-full h-full rounded-full object-cover border-4 border-white dark:border-slate-900"
                                />
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight leading-none font-display italic uppercase">{church.pastoralFamily.pastorName}</h3>
                                <h4 className="text-xl font-bold text-indigo-600 dark:text-brand-gold mt-2">& {church.pastoralFamily.wifeName}</h4>
                                <div className="flex items-center justify-center space-x-2 mt-6 mb-8">
                                  <span className="h-px w-8 bg-slate-200 dark:bg-slate-800"></span>
                                  <p className="text-slate-400 dark:text-slate-500 font-black text-[10px] uppercase tracking-[0.2em]">Família Pastoral</p>
                                  <span className="h-px w-8 bg-slate-200 dark:bg-slate-800"></span>
                                </div>
                                
                                {church.pastoralFamily.children.length > 0 && (
                                    <div className="mb-8 bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 border border-slate-100 dark:border-slate-800">
                                        <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 block mb-2 uppercase tracking-widest">FILHOS</span>
                                        <p className="text-slate-700 dark:text-slate-300 text-sm font-bold">
                                            {church.pastoralFamily.children.join(' • ')}
                                        </p>
                                    </div>
                                )}

                                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed italic font-serif">
                                    "{church.description}"
                                </p>
                                {church.pastoralFamily.biography && (
                                     <p className="text-slate-400 dark:text-slate-500 text-xs mt-8 leading-relaxed border-t border-slate-50 dark:border-slate-800 pt-8">{church.pastoralFamily.biography}</p>
                                )}
                            </div>
                        </div>

                         {/* Local Leadership Preview */}
                         {church.leadership.length > 0 && (
                            <div className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-xl p-10 border border-slate-100 dark:border-slate-800 transition-colors duration-500">
                                <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-8 flex items-center gap-4 tracking-tight font-display italic uppercase">
                                    <div className="bg-indigo-100 dark:bg-slate-800 p-2.5 rounded-2xl">
                                        <Users className="h-6 w-6 text-indigo-600 dark:text-brand-gold" />
                                    </div>
                                    Liderança Local
                                </h3>
                                <div className="space-y-6">
                                    {church.leadership.map((leader, idx) => (
                                        <div key={idx} className="flex items-center space-x-5 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-[2rem] transition-all group cursor-default border border-transparent hover:border-slate-100 dark:hover:border-slate-700">
                                            <div className="relative">
                                              <img src={leader.photoUrl} alt={leader.names} className="w-14 h-14 rounded-full object-cover border-2 border-white dark:border-slate-700 shadow-sm group-hover:border-indigo-200 dark:group-hover:border-brand-gold transition-colors" />
                                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
                                            </div>
                                            <div>
                                                <p className="text-base font-black text-slate-800 dark:text-white leading-tight tracking-tight">{leader.names}</p>
                                                <p className="text-[10px] text-indigo-600 dark:text-brand-gold font-black uppercase tracking-widest mt-1">{leader.role}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                         )}
                    </div>

                    {/* Right Column: Announcements */}
                    <div className="lg:col-span-2">
                         <div className="flex items-center space-x-6 mb-10">
                            <h2 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white tracking-tighter font-display italic uppercase">
                                Mural de <span className="text-indigo-600 dark:text-brand-gold">Anúncios</span>
                            </h2>
                            <div className="h-px flex-grow bg-slate-200 dark:bg-slate-800"></div>
                         </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {announcements.length > 0 ? (
                                announcements.map(ann => (
                                    <AnnouncementCard 
                                        key={ann.id} 
                                        announcement={ann} 
                                        onSelect={setSelectedAnnouncement} 
                                    />
                                ))
                            ) : (
                                <div className="col-span-full bg-white dark:bg-slate-900 rounded-[3rem] shadow-sm p-20 text-center border-2 border-dashed border-slate-200 dark:border-slate-800">
                                    <div className="bg-slate-50 dark:bg-slate-800 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <FileText className="h-12 w-12 text-slate-300 dark:text-slate-700" />
                                    </div>
                                    <p className="text-slate-400 dark:text-slate-500 text-xl font-bold">Nenhum anúncio recente desta igreja.</p>
                                    <p className="text-slate-300 dark:text-slate-600 text-sm mt-2">Fique atento para as próximas novidades!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ChurchPage;
