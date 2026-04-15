
import React, { useState, useRef } from 'react';
import { Department, TeamMember } from '../types';
import { updateDepartment, uploadBanner } from '../services/announcementService';

interface DepartmentFormProps {
    department: Department;
    onClose: (shouldRefresh: boolean) => void;
}

const DepartmentForm: React.FC<DepartmentFormProps> = ({ department, onClose }) => {
    const [formData, setFormData] = useState<Department>({ ...department });
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<'info' | 'team' | 'gallery'>('info');

    // Generic Input Handler
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // --- TEAM MANAGEMENT ---
    const handleTeamChange = (index: number, field: keyof TeamMember, value: string) => {
        const newTeam = [...formData.team];
        newTeam[index] = { ...newTeam[index], [field]: value };
        setFormData(prev => ({ ...prev, team: newTeam }));
    };

    const handleAddTeamMember = () => {
        const newMember: TeamMember = {
            name: 'Novo Membro',
            role: 'Cargo',
            photoUrl: 'https://picsum.photos/200/200', // Default placeholder
            familyBiography: ''
        };
        setFormData(prev => ({ ...prev, team: [...prev.team, newMember] }));
    };

    const handleRemoveTeamMember = (index: number) => {
        if (window.confirm('Remover este membro da equipe?')) {
            const newTeam = formData.team.filter((_, i) => i !== index);
            setFormData(prev => ({ ...prev, team: newTeam }));
        }
    };

    const handleTeamPhotoUpload = async (index: number, file: File) => {
        try {
            setIsLoading(true);
            const url = await uploadBanner(file);
            handleTeamChange(index, 'photoUrl', url);
        } catch (e) {
            alert('Erro ao fazer upload da foto.');
        } finally {
            setIsLoading(false);
        }
    };

    // --- GALLERY MANAGEMENT ---
    const handleAddGalleryPhoto = async (file: File) => {
        try {
            setIsLoading(true);
            const url = await uploadBanner(file);
            setFormData(prev => ({ ...prev, eventPhotos: [...prev.eventPhotos, url] }));
        } catch (e) {
            alert('Erro ao enviar foto para galeria.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleRemoveGalleryPhoto = (index: number) => {
         if (window.confirm('Remover esta foto da galeria?')) {
            const newPhotos = formData.eventPhotos.filter((_, i) => i !== index);
            setFormData(prev => ({ ...prev, eventPhotos: newPhotos }));
         }
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await updateDepartment(formData);
            onClose(true);
        } catch (error) {
            console.error("Failed to update department", error);
            alert("Erro ao salvar alterações.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl overflow-hidden max-h-[95vh] flex flex-col w-full max-w-4xl border border-slate-100 dark:border-slate-800 transition-colors duration-500">
            {/* Header */}
            <div className="bg-slate-50 dark:bg-slate-950 p-6 md:p-8 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center flex-shrink-0">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-8 bg-indigo-600 dark:bg-brand-gold rounded-full"></div>
                  <h2 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white tracking-tighter">Editar: {formData.acronym}</h2>
                </div>
                <button onClick={() => onClose(false)} className="text-slate-400 hover:text-slate-700 dark:hover:text-white bg-white dark:bg-slate-900 p-2 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex-shrink-0 px-4 md:px-8 overflow-x-auto hide-scrollbar">
                <button 
                    onClick={() => setActiveTab('info')}
                    className={`whitespace-nowrap px-6 py-4 text-[10px] font-black uppercase tracking-widest border-b-4 transition-all ${activeTab === 'info' ? 'border-indigo-600 dark:border-brand-gold text-indigo-600 dark:text-brand-gold' : 'border-transparent text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300'}`}
                >
                    Informações Gerais
                </button>
                <button 
                    onClick={() => setActiveTab('team')}
                    className={`whitespace-nowrap px-6 py-4 text-[10px] font-black uppercase tracking-widest border-b-4 transition-all ${activeTab === 'team' ? 'border-indigo-600 dark:border-brand-gold text-indigo-600 dark:text-brand-gold' : 'border-transparent text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300'}`}
                >
                    Equipe e Liderança
                </button>
                <button 
                    onClick={() => setActiveTab('gallery')}
                    className={`whitespace-nowrap px-6 py-4 text-[10px] font-black uppercase tracking-widest border-b-4 transition-all ${activeTab === 'gallery' ? 'border-indigo-600 dark:border-brand-gold text-indigo-600 dark:text-brand-gold' : 'border-transparent text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300'}`}
                >
                    Galeria de Fotos
                </button>
            </div>

            {/* Content Scrollable Area */}
            <div className="p-6 md:p-10 overflow-y-auto flex-grow bg-slate-50/30 dark:bg-slate-950/30">
                <form id="deptForm" onSubmit={handleSubmit} className="space-y-10">
                    
                    {activeTab === 'info' && (
                        <div className="space-y-8 animate-fade-in">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="md:col-span-2">
                                    <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Nome do Ministério</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm focus:border-indigo-500 dark:focus:border-brand-gold focus:ring-indigo-500 dark:focus:ring-brand-gold py-3 px-4 font-bold text-slate-800 dark:text-white transition-all" />
                                </div>
                                 <div className="md:col-span-1">
                                    <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Sigla</label>
                                    <input type="text" name="acronym" value={formData.acronym} onChange={handleChange} className="mt-1 block w-full rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm focus:border-indigo-500 dark:focus:border-brand-gold focus:ring-indigo-500 dark:focus:ring-brand-gold py-3 px-4 font-black text-slate-800 dark:text-white transition-all" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Descrição Curta</label>
                                <textarea name="description" rows={2} value={formData.description} onChange={handleChange} className="mt-1 block w-full rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm focus:border-indigo-500 dark:focus:border-brand-gold focus:ring-indigo-500 dark:focus:ring-brand-gold py-3 px-4 font-medium text-slate-700 dark:text-slate-300 transition-all" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Trabalhos Realizados (Texto Longo)</label>
                                <textarea name="works" rows={5} value={formData.works} onChange={handleChange} className="mt-1 block w-full rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm focus:border-indigo-500 dark:focus:border-brand-gold focus:ring-indigo-500 dark:focus:ring-brand-gold py-3 px-4 font-medium text-slate-700 dark:text-slate-300 transition-all" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Banner Principal</label>
                                <div className="mt-2 space-y-4">
                                  <input type="text" name="bannerUrl" value={formData.bannerUrl} onChange={handleChange} className="block w-full rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm focus:border-indigo-500 dark:focus:border-brand-gold focus:ring-indigo-500 dark:focus:ring-brand-gold py-3 px-4 font-mono text-[10px] text-slate-400 dark:text-slate-500" />
                                  <div className="relative h-40 w-full overflow-hidden rounded-3xl shadow-lg border-4 border-white dark:border-slate-800">
                                    <img src={formData.bannerUrl} alt="Banner Preview" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                      <p className="text-white text-[10px] font-black uppercase tracking-widest">Pré-visualização do Banner</p>
                                    </div>
                                  </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'team' && (
                        <div className="space-y-8 animate-fade-in">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">Membros da Equipe</h3>
                                <button 
                                  type="button" 
                                  onClick={handleAddTeamMember} 
                                  className="text-[10px] font-black uppercase tracking-widest bg-indigo-600 dark:bg-brand-gold text-white dark:text-slate-950 px-6 py-3 rounded-2xl hover:bg-indigo-700 dark:hover:bg-brand-amber transition-all shadow-lg hover:shadow-indigo-200 dark:hover:shadow-brand-gold/20"
                                >
                                    + Adicionar Membro
                                </button>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-6">
                                {formData.team.map((member, index) => (
                                    <div key={index} className="flex flex-col md:flex-row gap-8 bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 items-start relative group hover:shadow-xl transition-all duration-500">
                                        <div className="flex-shrink-0 flex flex-col items-center space-y-4">
                                            <div className={`w-24 h-24 md:w-32 md:h-32 rounded-full p-1.5 bg-gradient-to-br ${department.color} shadow-lg`}>
                                              <img src={member.photoUrl} alt={member.name} className="w-full h-full rounded-full object-cover border-4 border-white dark:border-slate-800" />
                                            </div>
                                            <label className="cursor-pointer text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-brand-gold hover:text-indigo-800 dark:hover:text-brand-amber transition-colors bg-indigo-50 dark:bg-slate-800 px-4 py-2 rounded-xl">
                                                Alterar Foto
                                                <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleTeamPhotoUpload(index, e.target.files[0])} />
                                            </label>
                                        </div>
                                        <div className="flex-grow w-full space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Nome Completo</label>
                                                    <input 
                                                        type="text" 
                                                        value={member.name} 
                                                        onChange={(e) => handleTeamChange(index, 'name', e.target.value)}
                                                        className="w-full rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 font-bold text-slate-800 dark:text-white border focus:ring-indigo-500 dark:focus:ring-brand-gold focus:border-indigo-500 dark:focus:border-brand-gold transition-all"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Cargo / Função</label>
                                                    <input 
                                                        type="text" 
                                                        value={member.role} 
                                                        onChange={(e) => handleTeamChange(index, 'role', e.target.value)}
                                                        className="w-full rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 font-black text-indigo-600 dark:text-brand-gold border focus:ring-indigo-500 dark:focus:ring-brand-gold focus:border-indigo-500 dark:focus:border-brand-gold transition-all uppercase text-xs tracking-widest"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Biografia e Família</label>
                                                <textarea 
                                                    value={member.familyBiography || ''} 
                                                    onChange={(e) => handleTeamChange(index, 'familyBiography', e.target.value)}
                                                    placeholder="Descreva a biografia, família e trajetória ministerial..."
                                                    rows={3}
                                                    className="w-full rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 text-sm font-medium text-slate-600 dark:text-slate-400 border focus:ring-indigo-500 dark:focus:ring-brand-gold focus:border-indigo-500 dark:focus:border-brand-gold transition-all"
                                                />
                                            </div>
                                        </div>
                                        <button 
                                            type="button" 
                                            onClick={() => handleRemoveTeamMember(index)}
                                            className="absolute top-6 right-6 text-slate-300 dark:text-slate-600 hover:text-red-500 dark:hover:text-red-500 p-2 transition-colors"
                                            title="Remover Membro"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'gallery' && (
                        <div className="space-y-8 animate-fade-in">
                             <div className="flex justify-between items-center">
                                <h3 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">Galeria de Eventos</h3>
                                <label className="cursor-pointer text-[10px] font-black uppercase tracking-widest bg-indigo-600 dark:bg-brand-gold text-white dark:text-slate-950 px-6 py-3 rounded-2xl hover:bg-indigo-700 dark:hover:bg-brand-amber transition-all shadow-lg hover:shadow-indigo-200 dark:hover:shadow-brand-gold/20 flex items-center space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span>Upload Foto</span>
                                    <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleAddGalleryPhoto(e.target.files[0])} />
                                </label>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                {formData.eventPhotos.map((photoUrl, index) => (
                                    <div key={index} className="relative group rounded-3xl overflow-hidden shadow-md border-4 border-white dark:border-slate-800 bg-slate-100 dark:bg-slate-800 aspect-video transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
                                        <img src={photoUrl} alt="Evento" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                                            <button 
                                                type="button"
                                                onClick={() => handleRemoveGalleryPhoto(index)}
                                                className="bg-red-600 text-white p-3 rounded-2xl transition-all transform hover:scale-110 shadow-xl"
                                                title="Remover Foto"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {formData.eventPhotos.length === 0 && (
                                    <div className="col-span-full text-center py-16 text-slate-400 dark:text-slate-600 bg-white dark:bg-slate-900 rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
                                        <div className="bg-slate-50 dark:bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-200 dark:text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                          </svg>
                                        </div>
                                        <p className="font-bold uppercase tracking-widest text-xs">Nenhuma foto na galeria</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </form>
            </div>

            {/* Footer Actions */}
            <div className="bg-white dark:bg-slate-900 p-6 md:p-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 flex-shrink-0">
                <button 
                  type="button" 
                  onClick={() => onClose(false)} 
                  className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                >
                    Cancelar
                </button>
                <button 
                  type="submit" 
                  form="deptForm" 
                  disabled={isLoading} 
                  className="px-10 py-4 text-[10px] font-black uppercase tracking-widest text-white dark:text-slate-950 bg-indigo-600 dark:bg-brand-gold rounded-2xl hover:bg-indigo-700 dark:hover:bg-brand-amber disabled:bg-indigo-300 dark:disabled:bg-slate-800 transition-all shadow-lg hover:shadow-indigo-200 dark:hover:shadow-brand-gold/20 flex items-center justify-center min-w-[180px]"
                >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white dark:border-slate-950"></div>
                    ) : 'Salvar Alterações'}
                </button>
            </div>
        </div>
    );
};

export default DepartmentForm;
