
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Announcement, Department, Church } from '../types';
import { getAnnouncements, deleteAnnouncement, getDepartments, getChurches } from '../services/announcementService';
import AnnouncementForm from './AnnouncementForm';
import DepartmentForm from './DepartmentForm';
import ChurchForm from './ChurchForm';
import LoadingSpinner from './LoadingSpinner';
import { Link } from 'react-router-dom';
import { 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  ExternalLink, 
  LogOut, 
  LayoutGrid, 
  Building2, 
  Users,
  FileText,
  ChevronRight
} from 'lucide-react';

type ViewMode = 'announcements' | 'departments' | 'churches';

const AdminPanel: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [departments, setDepartments] = useState<Department[]>([]);
    const [churches, setChurches] = useState<Church[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [viewMode, setViewMode] = useState<ViewMode>('announcements');

    // Modal states
    const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
    const [isAnnouncementFormVisible, setIsAnnouncementFormVisible] = useState(false);
    
    const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
    const [isDepartmentFormVisible, setIsDepartmentFormVisible] = useState(false);

    const [editingChurch, setEditingChurch] = useState<Church | null>(null);
    const [isChurchFormVisible, setIsChurchFormVisible] = useState(false);

    const hasHandledDeepLink = useRef(false);

    const fetchData = useCallback(() => {
        setIsLoading(true);
        Promise.all([getAnnouncements(), getDepartments(), getChurches()]).then(([annData, deptData, churchData]) => {
            setAnnouncements(annData);
            setDepartments(deptData);
            setChurches(churchData);
            setIsLoading(false);
        });
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Handle Deep Linking
    useEffect(() => {
        if (!isLoading && !hasHandledDeepLink.current) {
            const tabParam = searchParams.get('tab');
            const editId = searchParams.get('editId');

            if (tabParam) {
                if (tabParam === 'announcements' || tabParam === 'departments' || tabParam === 'churches') {
                    setViewMode(tabParam as ViewMode);
                }
            }

            if (editId && tabParam) {
                if (tabParam === 'announcements') {
                    const item = announcements.find(a => a.id === editId);
                    if (item) {
                        setEditingAnnouncement(item);
                        setIsAnnouncementFormVisible(true);
                    }
                } else if (tabParam === 'departments') {
                    const item = departments.find(d => d.id === editId);
                    if (item) {
                        setEditingDepartment(item);
                        setIsDepartmentFormVisible(true);
                    }
                } else if (tabParam === 'churches') {
                    const item = churches.find(c => c.id === editId);
                    if (item) {
                        setEditingChurch(item);
                        setIsChurchFormVisible(true);
                    }
                }
            }
            hasHandledDeepLink.current = true;
        }
    }, [isLoading, searchParams, announcements, departments, churches]);

    // Cleanup URL params when closing forms
    const clearUrlParams = () => {
        setSearchParams({});
    };

    // --- Announcement Handlers ---
    const handleDeleteAnnouncement = async (id: string) => {
        if (window.confirm('Tem certeza que deseja excluir este anúncio?')) {
            await deleteAnnouncement(id);
            fetchData();
        }
    };

    const handleEditAnnouncement = (announcement: Announcement) => {
        setEditingAnnouncement(announcement);
        setIsAnnouncementFormVisible(true);
    };

    const handleAddAnnouncement = () => {
        setEditingAnnouncement(null);
        setIsAnnouncementFormVisible(true);
    };

    const handleAnnouncementFormClose = (shouldRefresh: boolean) => {
        setIsAnnouncementFormVisible(false);
        setEditingAnnouncement(null);
        clearUrlParams();
        if (shouldRefresh) {
            fetchData();
        }
    };

    // --- Department Handlers ---
    const handleEditDepartment = (department: Department) => {
        setEditingDepartment(department);
        setIsDepartmentFormVisible(true);
    };

    const handleDepartmentFormClose = (shouldRefresh: boolean) => {
        setIsDepartmentFormVisible(false);
        setEditingDepartment(null);
        clearUrlParams();
        if (shouldRefresh) {
            fetchData();
        }
    };

    // --- Church Handlers ---
    const handleEditChurch = (church: Church) => {
        setEditingChurch(church);
        setIsChurchFormVisible(true);
    };

    const handleChurchFormClose = (shouldRefresh: boolean) => {
        setIsChurchFormVisible(false);
        setEditingChurch(null);
        clearUrlParams();
        if (shouldRefresh) {
            fetchData();
        }
    };

    return (
        <>
            <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500 ${(isAnnouncementFormVisible || isDepartmentFormVisible || isChurchFormVisible) ? 'overflow-hidden' : ''}`}>
                <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm sticky top-0 z-20 border-b border-slate-100 dark:border-slate-800">
                    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-indigo-600 dark:bg-brand-gold rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-brand-gold/20">
                            <Settings className="h-5 w-5 text-white dark:text-slate-950" />
                          </div>
                          <h1 className="text-xl font-black text-slate-800 dark:text-white tracking-tighter hidden md:block uppercase">Painel Administrativo</h1>
                          <h1 className="text-lg font-black text-slate-800 dark:text-white md:hidden uppercase tracking-tighter">Admin</h1>
                        </div>
                        <div className="flex items-center space-x-6">
                            <Link to="/" className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-brand-gold hover:text-indigo-800 dark:hover:text-brand-amber transition-colors flex items-center space-x-1">
                              <ExternalLink className="h-3 w-3" />
                              <span>Ver Site</span>
                            </Link>
                            <button onClick={onLogout} className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-red-700 transition-colors bg-red-50 dark:bg-red-950/30 px-4 py-2 rounded-xl flex items-center space-x-1">
                              <LogOut className="h-3 w-3" />
                              <span>Sair</span>
                            </button>
                        </div>
                    </div>
                </header>

                <main className="container mx-auto p-6 md:p-10">
                    {/* Navigation Categories */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                        {/* Sidebar Navigation */}
                        <div className="lg:col-span-1 space-y-8">
                            <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-sm border border-slate-100 dark:border-slate-800">
                                <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-6 px-4">Menu Principal</p>
                                <nav className="space-y-2">
                                    <button
                                        onClick={() => setViewMode('announcements')}
                                        className={`w-full flex items-center space-x-3 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                                            viewMode === 'announcements' 
                                            ? 'bg-indigo-600 dark:bg-brand-gold text-white dark:text-slate-950 shadow-xl shadow-indigo-100 dark:shadow-brand-gold/20 translate-x-2' 
                                            : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-brand-gold'
                                        }`}
                                    >
                                        <FileText className="h-4 w-4" />
                                        <span>Anúncios</span>
                                    </button>
                                </nav>

                                <div className="my-8 h-px bg-slate-50 dark:bg-slate-800 mx-4"></div>

                                <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-6 px-4">Gestão Regional</p>
                                <nav className="space-y-2">
                                    <button
                                        onClick={() => setViewMode('departments')}
                                        className={`w-full flex items-center space-x-3 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                                            viewMode === 'departments' 
                                            ? 'bg-indigo-600 dark:bg-brand-gold text-white dark:text-slate-950 shadow-xl shadow-indigo-100 dark:shadow-brand-gold/20 translate-x-2' 
                                            : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-brand-gold'
                                        }`}
                                    >
                                        <Users className="h-4 w-4" />
                                        <span>Ministérios</span>
                                    </button>
                                    <button
                                        onClick={() => setViewMode('churches')}
                                        className={`w-full flex items-center space-x-3 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                                            viewMode === 'churches' 
                                            ? 'bg-indigo-600 dark:bg-brand-gold text-white dark:text-slate-950 shadow-xl shadow-indigo-100 dark:shadow-brand-gold/20 translate-x-2' 
                                            : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-brand-gold'
                                        }`}
                                    >
                                        <Building2 className="h-4 w-4" />
                                        <span>Igrejas Locais</span>
                                    </button>
                                </nav>
                            </div>

                            {/* Quick Stats or Info */}
                            <div className="bg-indigo-900 dark:bg-slate-900 rounded-[2rem] p-8 text-white shadow-2xl shadow-indigo-200 dark:shadow-none border border-transparent dark:border-slate-800 hidden lg:block">
                                <h4 className="text-lg font-black tracking-tighter mb-2 uppercase">FAMI Regional</h4>
                                <p className="text-indigo-200 dark:text-slate-400 text-xs font-medium leading-relaxed mb-6">Painel de controle unificado para gestão da Regional Sorocaba.</p>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-indigo-300 dark:text-slate-500">
                                        <span>Total Igrejas</span>
                                        <span className="text-white">{churches.length}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-indigo-300 dark:text-slate-500">
                                        <span>Ministérios</span>
                                        <span className="text-white">{departments.length}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="lg:col-span-3">
                            {isLoading ? <LoadingSpinner /> : (
                                <div className="animate-fade-in">
                                    {viewMode === 'announcements' && (
                                        <div>
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
                                                <div className="flex items-center space-x-3">
                                                  <div className="w-1.5 h-6 bg-indigo-600 dark:bg-brand-gold rounded-full"></div>
                                                  <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">Anúncios Publicados</h2>
                                                </div>
                                                <button
                                                    onClick={handleAddAnnouncement}
                                                    className="bg-indigo-600 dark:bg-brand-gold text-white dark:text-slate-950 text-[10px] font-black uppercase tracking-widest py-4 px-8 rounded-2xl hover:bg-indigo-700 dark:hover:bg-brand-amber transition-all shadow-xl shadow-indigo-100 dark:shadow-brand-gold/20 flex items-center justify-center space-x-2 transform active:scale-95"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                    <span>Novo Anúncio</span>
                                                </button>
                                            </div>
                                            
                                            {announcements.length > 0 ? (
                                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                                                    {announcements.map(ann => (
                                                        <div key={ann.id} className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-sm overflow-hidden flex flex-col group hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 border border-slate-100 dark:border-slate-800">
                                                            <div className="relative cursor-pointer aspect-[4/3] overflow-hidden" onClick={() => handleEditAnnouncement(ann)}>
                                                                <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={ann.imageUrl} alt={ann.imageAlt || ann.title} />
                                                                <div className="absolute inset-0 bg-indigo-900/40 dark:bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                                                                    <div className="text-white text-[10px] font-black uppercase tracking-widest py-3 px-6 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center space-x-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                                                        <Edit className="h-4 w-4" />
                                                                        <span>Editar</span>
                                                                    </div>
                                                                </div>
                                                                <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/50 dark:border-slate-700 shadow-sm">
                                                                  <p className="text-[9px] font-black text-indigo-600 dark:text-brand-gold uppercase tracking-widest">{ann.church}</p>
                                                                </div>
                                                            </div>
                                                            <div className="p-6 flex flex-col flex-grow">
                                                                <h3 className="text-lg font-black text-slate-800 dark:text-white leading-tight group-hover:text-indigo-600 dark:group-hover:text-brand-gold transition-colors" title={ann.title}>{ann.title}</h3>
                                                                <div className="mt-auto pt-4 flex items-center justify-between">
                                                                  <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                                                                      {new Date(ann.date + 'T00:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                                                                  </p>
                                                                  <button onClick={() => handleDeleteAnnouncement(ann.id)} className="text-slate-300 dark:text-slate-700 hover:text-red-500 dark:hover:text-red-400 transition-colors p-2">
                                                                      <Trash2 className="h-5 w-5" />
                                                                  </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="text-center py-24 text-slate-400 dark:text-slate-600 bg-white dark:bg-slate-900 rounded-[3rem] shadow-sm border border-slate-100 dark:border-slate-800">
                                                    <div className="bg-slate-50 dark:bg-slate-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                                      <FileText className="h-10 w-10 text-slate-200 dark:text-slate-700" />
                                                    </div>
                                                    <h3 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-tighter">Nenhum anúncio publicado</h3>
                                                    <p className="mt-2 text-sm font-medium">Comece criando seu primeiro anúncio para a região.</p>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {viewMode === 'departments' && (
                                        <div>
                                            <div className="flex items-center space-x-3 mb-10">
                                              <div className="w-1.5 h-6 bg-indigo-600 dark:bg-brand-gold rounded-full"></div>
                                              <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">Ministérios Regionais</h2>
                                            </div>
                                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                                                {departments.map(dept => (
                                                    <div key={dept.id} className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-sm p-8 flex flex-col sm:flex-row sm:items-center gap-8 border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all duration-500 group">
                                                        <div className={`w-20 h-20 md:w-24 md:h-24 rounded-[1.5rem] flex-shrink-0 flex items-center justify-center text-white ${dept.acronym.length >= 15 ? 'text-[8px] md:text-[10px]' : dept.acronym.length >= 10 ? 'text-[10px] md:text-xs' : 'text-xs md:text-sm'} font-black shadow-lg group-hover:scale-110 transition-transform duration-500 text-center break-words p-2 ${dept.color}`}>
                                                          {dept.acronym}
                                                        </div>
                                                        <div className="flex-grow">
                                                            <div className="flex justify-between items-start mb-4">
                                                                <div>
                                                                    <h3 className="text-xl font-black text-slate-800 dark:text-white tracking-tight leading-none mb-1">{dept.name}</h3>
                                                                    <p className="text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Regional FAMI</p>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-50 dark:border-slate-800">
                                                                <div className="flex -space-x-3">
                                                                    {dept.team.slice(0, 4).map((member, idx) => (
                                                                        <div key={idx} className="w-10 h-10 rounded-full border-4 border-white dark:border-slate-800 overflow-hidden shadow-sm">
                                                                            <img src={member.photoUrl} alt={member.name} className="w-full h-full object-cover" />
                                                                        </div>
                                                                    ))}
                                                                    {dept.team.length > 4 && (
                                                                        <div className="w-10 h-10 rounded-full border-4 border-white dark:border-slate-800 bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-[10px] font-black text-slate-500 dark:text-slate-300 shadow-sm">
                                                                          +{dept.team.length - 4}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <button 
                                                                    onClick={() => handleEditDepartment(dept)}
                                                                    className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-brand-gold hover:text-white dark:hover:text-slate-950 hover:bg-indigo-600 dark:hover:bg-brand-gold px-6 py-3 rounded-2xl border-2 border-indigo-50 dark:border-slate-800 transition-all flex items-center space-x-2"
                                                                >
                                                                    <Settings className="h-3 w-3" />
                                                                    <span>Configurar</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {viewMode === 'churches' && (
                                        <div>
                                            <div className="flex items-center space-x-3 mb-10">
                                              <div className="w-1.5 h-6 bg-indigo-600 dark:bg-brand-gold rounded-full"></div>
                                              <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">Igrejas Locais</h2>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                {churches.map(church => (
                                                    <div key={church.id} className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-sm overflow-hidden group flex flex-col border border-slate-100 dark:border-slate-800 hover:shadow-2xl transition-all duration-500">
                                                        <div className="h-40 overflow-hidden relative">
                                                            <img src={church.coverUrl} alt={church.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent dark:from-slate-950/80 dark:via-slate-950/20"></div>
                                                            <div className="absolute bottom-6 left-8 right-8">
                                                                <h3 className="text-white font-black text-2xl tracking-tight leading-none">{church.name}</h3>
                                                            </div>
                                                        </div>
                                                        <div className="p-8 flex-grow">
                                                            <div className="flex items-center space-x-4 mb-6">
                                                                <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-md border-2 border-white dark:border-slate-700">
                                                                  <img src={church.pastoralFamily.photoUrl} alt="Pastor" className="w-full h-full object-cover" />
                                                                </div>
                                                                <div>
                                                                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-1">Pastor Responsável</p>
                                                                    <p className="text-sm font-bold text-slate-800 dark:text-white truncate">{church.pastoralFamily.pastorName}</p>
                                                                </div>
                                                            </div>
                                                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">{church.description}</p>
                                                        </div>
                                                        <div className="px-8 pb-8">
                                                             <button 
                                                                onClick={() => handleEditChurch(church)}
                                                                className="w-full text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-brand-gold hover:text-white dark:hover:text-slate-950 hover:bg-indigo-600 dark:hover:bg-brand-gold py-4 rounded-2xl border-2 border-indigo-50 dark:border-slate-800 transition-all flex items-center justify-center space-x-2"
                                                            >
                                                                <Edit className="h-4 w-4" />
                                                                <span>Configurar Igreja</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>

            {isAnnouncementFormVisible && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-start pt-10 md:pt-20 px-4 animate-fade-in overflow-y-auto"
                    onClick={() => handleAnnouncementFormClose(false)}
                >
                    <div
                        className="w-full max-w-3xl mb-10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <AnnouncementForm announcement={editingAnnouncement} onClose={handleAnnouncementFormClose} />
                    </div>
                </div>
            )}

            {isDepartmentFormVisible && editingDepartment && (
                 <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-start pt-4 md:pt-10 px-4 animate-fade-in overflow-y-auto"
                    onClick={() => handleDepartmentFormClose(false)}
                >
                    <div
                        className="w-full max-w-4xl mb-10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <DepartmentForm department={editingDepartment} onClose={handleDepartmentFormClose} />
                    </div>
                </div>
            )}

             {isChurchFormVisible && editingChurch && (
                 <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-start pt-4 md:pt-10 px-4 animate-fade-in overflow-y-auto"
                    onClick={() => handleChurchFormClose(false)}
                >
                    <div
                        className="w-full max-w-4xl mb-10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <ChurchForm church={editingChurch} onClose={handleChurchFormClose} />
                    </div>
                </div>
            )}
        </>
    );
};

export default AdminPanel;
