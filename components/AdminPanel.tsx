
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Announcement, Department, Church } from '../types';
import { getAnnouncements, deleteAnnouncement, getDepartments, getChurches } from '../services/announcementService';
import AnnouncementForm from './AnnouncementForm';
import DepartmentForm from './DepartmentForm';
import ChurchForm from './ChurchForm';
import LoadingSpinner from './LoadingSpinner';
import { Link } from 'react-router-dom';

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
            <div className={`min-h-screen bg-slate-100 ${(isAnnouncementFormVisible || isDepartmentFormVisible || isChurchFormVisible) ? 'overflow-hidden' : ''}`}>
                <header className="bg-white shadow-md sticky top-0 z-20">
                    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                        <h1 className="text-xl font-bold text-slate-800 hidden md:block">Painel Administrativo</h1>
                         <h1 className="text-lg font-bold text-slate-800 md:hidden">Admin</h1>
                        <div>
                            <Link to="/" className="text-sm text-indigo-600 hover:text-indigo-800 mr-4">Ver FAMI</Link>
                            <button onClick={onLogout} className="text-sm text-indigo-600 hover:text-indigo-800">Sair</button>
                        </div>
                    </div>
                </header>

                <main className="container mx-auto p-4 md:p-8">
                    {/* Tabs */}
                    <div className="flex flex-col md:flex-row md:space-x-1 bg-white p-1 rounded-lg shadow mb-6 w-full md:w-auto inline-flex">
                        <button
                            onClick={() => setViewMode('announcements')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                viewMode === 'announcements' 
                                ? 'bg-indigo-600 text-white shadow' 
                                : 'text-slate-600 hover:bg-slate-100'
                            }`}
                        >
                            Gerenciar Anúncios
                        </button>
                        <button
                            onClick={() => setViewMode('departments')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                viewMode === 'departments' 
                                ? 'bg-indigo-600 text-white shadow' 
                                : 'text-slate-600 hover:bg-slate-100'
                            }`}
                        >
                            Departamentos
                        </button>
                        <button
                            onClick={() => setViewMode('churches')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                viewMode === 'churches' 
                                ? 'bg-indigo-600 text-white shadow' 
                                : 'text-slate-600 hover:bg-slate-100'
                            }`}
                        >
                            Gerenciar Igrejas
                        </button>
                    </div>

                    {isLoading ? <LoadingSpinner /> : (
                        <>
                            {viewMode === 'announcements' && (
                                <div>
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-lg font-semibold text-slate-700">Anúncios Publicados</h2>
                                        <button
                                            onClick={handleAddAnnouncement}
                                            className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 transition-transform transform hover:scale-105 shadow-lg flex items-center space-x-2"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                            </svg>
                                            <span className="hidden md:inline">Adicionar Novo</span>
                                            <span className="md:hidden">Novo</span>
                                        </button>
                                    </div>
                                    
                                    {announcements.length > 0 ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                            {announcements.map(ann => (
                                                <div key={ann.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col group transform hover:-translate-y-1 transition-all duration-300">
                                                    <div className="relative cursor-pointer" onClick={() => handleEditAnnouncement(ann)}>
                                                        <img className="w-full h-48 object-cover" src={ann.imageUrl} alt={ann.imageAlt || ann.title} />
                                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                                                            <div className="text-white font-bold py-2 px-4 rounded-full bg-indigo-600 bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center space-x-2">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                                                    <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                                                                </svg>
                                                                <span>Editar</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="p-4 flex flex-col flex-grow">
                                                        <h3 className="text-lg font-bold text-slate-800 truncate" title={ann.title}>{ann.title}</h3>
                                                        <p className="text-sm text-slate-600 mt-1">{ann.church}</p>
                                                        <p className="text-sm text-slate-500 mt-2 font-medium">
                                                            {new Date(ann.date + 'T00:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                                                        </p>
                                                    </div>
                                                    <div className="p-3 bg-slate-50 border-t flex justify-end items-center">
                                                        <button onClick={() => handleDeleteAnnouncement(ann.id)} className="font-medium text-sm text-red-600 hover:text-red-800 transition-colors flex items-center space-x-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                                                            </svg>
                                                            <span>Excluir</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-16 text-slate-500 bg-white rounded-lg shadow">
                                            <h3 className="text-xl font-semibold">Nenhum anúncio encontrado.</h3>
                                            <p className="mt-2">Clique em "Adicionar Novo" para começar.</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {viewMode === 'departments' && (
                                <div>
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-lg font-semibold text-slate-700">Editar Departamentos Regionais</h2>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {departments.map(dept => (
                                            <div key={dept.id} className="bg-white rounded-lg shadow-md p-6 flex flex-col border-l-4" style={{ borderLeftColor: dept.color.includes('indigo') ? '#4f46e5' : dept.color.includes('orange') ? '#f97316' : dept.color.includes('pink') ? '#ec4899' : '#334155' }}>
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <h3 className="text-xl font-bold text-slate-800">{dept.acronym}</h3>
                                                        <p className="text-sm text-slate-500">{dept.name}</p>
                                                    </div>
                                                    <button 
                                                        onClick={() => handleEditDepartment(dept)}
                                                        className="text-indigo-600 hover:text-indigo-800 font-semibold text-sm flex items-center bg-indigo-50 hover:bg-indigo-100 px-3 py-1 rounded transition"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                        </svg>
                                                        Editar
                                                    </button>
                                                </div>
                                                <div className="mb-4">
                                                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Liderança Atual</h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {dept.team.slice(0, 3).map((member, idx) => (
                                                            <div key={idx} className="flex items-center space-x-2 bg-slate-50 rounded-full pr-3 pl-1 py-1 border border-slate-200">
                                                                <img src={member.photoUrl} alt={member.name} className="w-6 h-6 rounded-full object-cover" />
                                                                <span className="text-xs font-medium text-slate-700">{member.name.split(' ')[0]}...</span>
                                                            </div>
                                                        ))}
                                                        {dept.team.length > 3 && (
                                                            <span className="text-xs text-slate-400 flex items-center px-2">+ {dept.team.length - 3}</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {viewMode === 'churches' && (
                                <div>
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-lg font-semibold text-slate-700">Gerenciar Igrejas e Lideranças Locais</h2>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {churches.map(church => (
                                            <div key={church.id} className="bg-white rounded-lg shadow-md overflow-hidden group flex flex-col">
                                                <div className="h-32 overflow-hidden relative">
                                                    <img src={church.coverUrl} alt={church.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                                                    <div className="absolute bottom-2 left-4 right-4">
                                                        <h3 className="text-white font-bold text-lg shadow-black drop-shadow-md">{church.name}</h3>
                                                    </div>
                                                </div>
                                                <div className="p-4 flex-grow">
                                                    <div className="flex items-center space-x-3 mb-3">
                                                        <img src={church.pastoralFamily.photoUrl} alt="Pastor" className="w-10 h-10 rounded-full border border-slate-200 object-cover" />
                                                        <div>
                                                            <p className="text-xs text-slate-500 font-semibold uppercase">Pastor Responsável</p>
                                                            <p className="text-sm font-medium text-slate-800 truncate">{church.pastoralFamily.pastorName}</p>
                                                        </div>
                                                    </div>
                                                    <p className="text-xs text-slate-500 line-clamp-2">{church.description}</p>
                                                </div>
                                                <div className="bg-slate-50 p-3 border-t border-slate-100 flex justify-center">
                                                     <button 
                                                        onClick={() => handleEditChurch(church)}
                                                        className="text-indigo-600 hover:text-indigo-800 font-semibold text-sm flex items-center w-full justify-center py-1 rounded hover:bg-indigo-50 transition"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                        </svg>
                                                        Editar Igreja Completa
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </main>
            </div>

            {isAnnouncementFormVisible && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-start pt-10 md:pt-20 px-4 animate-fade-in overflow-y-auto"
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
                    className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-start pt-4 md:pt-10 px-4 animate-fade-in overflow-y-auto"
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
                    className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-start pt-4 md:pt-10 px-4 animate-fade-in overflow-y-auto"
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
