
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

const ChurchPage: React.FC = () => {
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
            <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Igreja não encontrada</h2>
                <Link to="/" className="text-indigo-600 hover:text-indigo-800 font-semibold">
                    Voltar para a página inicial
                </Link>
            </div>
        );
    }

    if (selectedAnnouncement) {
        return (
            <>
                <Header />
                <AnnouncementDetail 
                    announcement={selectedAnnouncement} 
                    onBack={() => setSelectedAnnouncement(null)} 
                />
            </>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 animate-fade-in pb-12">
            <Header />
            
            {/* Hero Section */}
            <div className="relative h-64 md:h-96 w-full group">
                <img 
                    src={church.coverUrl} 
                    alt={`Fachada ${church.name}`} 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-12 text-white">
                    <div className="container mx-auto relative">
                        <Link 
                            to="/" 
                            className="text-white/80 hover:text-white text-sm font-medium mb-4 inline-flex items-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                            </svg>
                            Voltar para Regional
                        </Link>
                        <div className="flex justify-between items-end">
                            <div>
                                <h1 className="text-3xl md:text-5xl font-bold mb-2 shadow-sm">{church.name}</h1>
                                <p className="text-white/90 text-lg flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                    {church.address}
                                </p>
                            </div>
                            {isAdmin && (
                                <Link 
                                    to={`/admin?tab=churches&editId=${church.id}`}
                                    className="bg-white/20 hover:bg-white/40 text-white p-3 rounded-full backdrop-blur-md transition-all shadow-lg"
                                    title="Editar Igreja"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                    </svg>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <main className="container mx-auto p-4 md:p-8 -mt-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Info & Pastoral Family */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Pastoral Family Card */}
                        <div className="bg-white rounded-xl shadow-lg p-6 text-center relative overflow-hidden">
                             <div className="absolute top-0 left-0 right-0 h-20 bg-indigo-600 opacity-10"></div>
                            <div className="w-36 h-36 mx-auto rounded-full p-1 bg-gradient-to-r from-indigo-500 to-blue-500 mb-4 relative z-10">
                                <img 
                                    src={church.pastoralFamily.photoUrl} 
                                    alt="Família Pastoral" 
                                    className="w-full h-full rounded-full object-cover border-4 border-white"
                                />
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold text-slate-800">{church.pastoralFamily.pastorName}</h3>
                                <h4 className="text-lg font-semibold text-indigo-600">& {church.pastoralFamily.wifeName}</h4>
                                <p className="text-slate-400 font-medium text-xs uppercase tracking-wide mt-1 mb-4">Família Pastoral</p>
                                
                                {church.pastoralFamily.children.length > 0 && (
                                    <div className="mb-4 bg-slate-50 rounded-lg p-2 border border-slate-100">
                                        <span className="text-xs font-bold text-slate-500 block mb-1">FILHOS</span>
                                        <p className="text-slate-700 text-sm font-medium">
                                            {church.pastoralFamily.children.join(' • ')}
                                        </p>
                                    </div>
                                )}

                                <p className="text-slate-600 text-sm leading-relaxed italic border-t border-slate-100 pt-4 mt-2">
                                    "{church.description}"
                                </p>
                                {church.pastoralFamily.biography && (
                                     <p className="text-slate-500 text-xs mt-3">{church.pastoralFamily.biography}</p>
                                )}
                            </div>
                        </div>

                         {/* Local Leadership Preview */}
                         {church.leadership.length > 0 && (
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    Liderança Local
                                </h3>
                                <div className="space-y-3">
                                    {church.leadership.map((leader, idx) => (
                                        <div key={idx} className="flex items-center space-x-3 p-2 hover:bg-slate-50 rounded-lg transition">
                                            <img src={leader.photoUrl} alt={leader.names} className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                                            <div>
                                                <p className="text-sm font-bold text-slate-700 leading-tight">{leader.names}</p>
                                                <p className="text-xs text-indigo-600 font-medium">{leader.role}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                         )}
                    </div>

                    {/* Right Column: Announcements */}
                    <div className="lg:col-span-2">
                         <h2 className="text-2xl font-bold text-slate-800 mb-6 border-l-4 border-indigo-600 pl-4">
                            Mural de Anúncios
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {announcements.length > 0 ? (
                                announcements.map(ann => (
                                    <AnnouncementCard 
                                        key={ann.id} 
                                        announcement={ann} 
                                        onSelect={setSelectedAnnouncement} 
                                    />
                                ))
                            ) : (
                                <div className="col-span-full bg-white rounded-lg shadow p-8 text-center">
                                    <p className="text-slate-500 text-lg">Nenhum anúncio recente desta igreja.</p>
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
