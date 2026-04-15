
import React, { useState } from 'react';
import { Church, ChurchLeader } from '../types';
import { updateChurch, uploadBanner } from '../services/announcementService';

interface ChurchFormProps {
    church: Church;
    onClose: (shouldRefresh: boolean) => void;
}

const ChurchForm: React.FC<ChurchFormProps> = ({ church, onClose }) => {
    const [formData, setFormData] = useState<Church>({ ...church });
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<'geral' | 'pastoral' | 'lideranca' | 'galeria' | 'social'>('geral');
    const [childrenInput, setChildrenInput] = useState(church.pastoralFamily.children.join(', '));

    // Generic Input Handler
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // --- PASTORAL FAMILY HANDLERS ---
    const handlePastoralChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            pastoralFamily: {
                ...prev.pastoralFamily,
                [field]: value
            }
        }));
    };

    const handleChildrenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChildrenInput(e.target.value);
        const childrenArray = e.target.value.split(',').map(c => c.trim()).filter(c => c !== '');
        setFormData(prev => ({
            ...prev,
            pastoralFamily: {
                ...prev.pastoralFamily,
                children: childrenArray
            }
        }));
    };

    const handlePastoralPhotoUpload = async (file: File) => {
        try {
            setIsLoading(true);
            const url = await uploadBanner(file);
            handlePastoralChange('photoUrl', url);
        } catch (e) {
            alert('Erro ao fazer upload da foto.');
        } finally {
            setIsLoading(false);
        }
    };

    // --- LEADERSHIP HANDLERS ---
    const handleLeaderChange = (index: number, field: keyof ChurchLeader, value: string) => {
        const newLeadership = [...formData.leadership];
        newLeadership[index] = { ...newLeadership[index], [field]: value };
        setFormData(prev => ({ ...prev, leadership: newLeadership }));
    };

    const handleAddLeader = () => {
        const newLeader: ChurchLeader = {
            role: 'Cargo',
            names: 'Nome do Casal/Líder',
            photoUrl: 'https://picsum.photos/200/200'
        };
        setFormData(prev => ({ ...prev, leadership: [...prev.leadership, newLeader] }));
    };

    const handleRemoveLeader = (index: number) => {
        if (window.confirm('Remover este líder?')) {
            const newLeadership = formData.leadership.filter((_, i) => i !== index);
            setFormData(prev => ({ ...prev, leadership: newLeadership }));
        }
    };

    const handleLeaderPhotoUpload = async (index: number, file: File) => {
         try {
            setIsLoading(true);
            const url = await uploadBanner(file);
            handleLeaderChange(index, 'photoUrl', url);
        } catch (e) {
            alert('Erro ao fazer upload da foto.');
        } finally {
            setIsLoading(false);
        }
    };

    // --- GALLERY & COVER ---
    const handleCoverUpload = async (file: File) => {
        try {
            setIsLoading(true);
            const url = await uploadBanner(file);
            setFormData(prev => ({ ...prev, coverUrl: url }));
        } catch (e) {
             alert('Erro ao fazer upload da capa.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddGalleryPhoto = async (file: File) => {
        try {
            setIsLoading(true);
            const url = await uploadBanner(file);
            setFormData(prev => ({ ...prev, gallery: [...prev.gallery, url] }));
        } catch (e) {
            alert('Erro ao enviar foto para galeria.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleRemoveGalleryPhoto = (index: number) => {
         if (window.confirm('Remover esta foto da galeria?')) {
            const newGallery = formData.gallery.filter((_, i) => i !== index);
            setFormData(prev => ({ ...prev, gallery: newGallery }));
         }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await updateChurch(formData);
            onClose(true);
        } catch (error) {
            console.error("Failed to update church", error);
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
                  <div className="w-2 h-8 bg-blue-500 dark:bg-brand-gold rounded-full"></div>
                  <h2 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white tracking-tighter">Editar Igreja: {formData.name}</h2>
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
                    onClick={() => setActiveTab('geral')}
                    className={`whitespace-nowrap px-6 py-4 text-[10px] font-black uppercase tracking-widest border-b-4 transition-all ${activeTab === 'geral' ? 'border-blue-500 dark:border-brand-gold text-blue-600 dark:text-brand-gold' : 'border-transparent text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300'}`}
                >
                    Dados Gerais
                </button>
                <button 
                    onClick={() => setActiveTab('pastoral')}
                    className={`whitespace-nowrap px-6 py-4 text-[10px] font-black uppercase tracking-widest border-b-4 transition-all ${activeTab === 'pastoral' ? 'border-blue-500 dark:border-brand-gold text-blue-600 dark:text-brand-gold' : 'border-transparent text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300'}`}
                >
                    Família Pastoral
                </button>
                <button 
                    onClick={() => setActiveTab('lideranca')}
                    className={`whitespace-nowrap px-6 py-4 text-[10px] font-black uppercase tracking-widest border-b-4 transition-all ${activeTab === 'lideranca' ? 'border-blue-500 dark:border-brand-gold text-blue-600 dark:text-brand-gold' : 'border-transparent text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300'}`}
                >
                    Liderança Local
                </button>
                <button 
                    onClick={() => setActiveTab('galeria')}
                    className={`whitespace-nowrap px-6 py-4 text-[10px] font-black uppercase tracking-widest border-b-4 transition-all ${activeTab === 'galeria' ? 'border-blue-500 dark:border-brand-gold text-blue-600 dark:text-brand-gold' : 'border-transparent text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300'}`}
                >
                    Galeria
                </button>
                <button 
                    onClick={() => setActiveTab('social')}
                    className={`whitespace-nowrap px-6 py-4 text-[10px] font-black uppercase tracking-widest border-b-4 transition-all ${activeTab === 'social' ? 'border-blue-500 dark:border-brand-gold text-blue-600 dark:text-brand-gold' : 'border-transparent text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300'}`}
                >
                    Redes Sociais
                </button>
            </div>

            {/* Content */}
            <div className="p-6 md:p-10 overflow-y-auto flex-grow bg-slate-50/30 dark:bg-slate-950/30">
                <form id="churchForm" onSubmit={handleSubmit} className="space-y-10">
                    
                    {activeTab === 'geral' && (
                        <div className="space-y-8 animate-fade-in">
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Nome da Igreja</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm focus:border-blue-500 dark:focus:border-brand-gold focus:ring-blue-500 dark:focus:ring-brand-gold py-3 px-4 font-bold text-slate-800 dark:text-white transition-all" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Endereço Completo</label>
                                <input type="text" name="address" value={formData.address} onChange={handleChange} className="mt-1 block w-full rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm focus:border-blue-500 dark:focus:border-brand-gold focus:ring-blue-500 dark:focus:ring-brand-gold py-3 px-4 font-medium text-slate-700 dark:text-slate-300 transition-all" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Descrição / Lema</label>
                                <textarea name="description" rows={3} value={formData.description} onChange={handleChange} className="mt-1 block w-full rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm focus:border-blue-500 dark:focus:border-brand-gold focus:ring-blue-500 dark:focus:ring-brand-gold py-3 px-4 font-medium text-slate-700 dark:text-slate-300 transition-all" />
                            </div>
                             <div>
                                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Foto da Fachada (Capa)</label>
                                <div className="mt-2 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                                    <div className="relative h-32 w-full sm:w-56 overflow-hidden rounded-2xl shadow-lg border-4 border-white dark:border-slate-800">
                                      <img src={formData.coverUrl} alt="Capa Preview" className="w-full h-full object-cover" />
                                    </div>
                                    <label className="cursor-pointer bg-blue-600 dark:bg-brand-gold text-white dark:text-slate-950 py-3 px-6 rounded-2xl shadow-lg hover:bg-blue-700 dark:hover:bg-brand-amber transition-all font-black uppercase tracking-widest text-[10px] transform active:scale-95">
                                        Alterar Capa
                                        <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleCoverUpload(e.target.files[0])} />
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'pastoral' && (
                        <div className="space-y-8 animate-fade-in">
                            <div className="flex flex-col md:flex-row items-start gap-8 bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800">
                                <div className="flex-shrink-0 text-center w-full md:w-auto">
                                    <div className="w-40 h-40 mx-auto rounded-full p-1.5 bg-gradient-to-br from-blue-500 to-indigo-500 dark:from-brand-gold dark:to-brand-amber shadow-xl mb-4">
                                      <img src={formData.pastoralFamily.photoUrl} alt="Família" className="w-full h-full rounded-full object-cover border-4 border-white dark:border-slate-800" />
                                    </div>
                                    <label className="cursor-pointer text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-brand-gold hover:text-blue-800 dark:hover:text-brand-amber transition-colors bg-blue-50 dark:bg-slate-800 px-4 py-2 rounded-xl inline-block">
                                        Trocar Foto
                                        <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handlePastoralPhotoUpload(e.target.files[0])} />
                                    </label>
                                </div>
                                <div className="flex-grow w-full space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                      <div>
                                          <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Nome do Pastor Responsável</label>
                                          <input 
                                              type="text" 
                                              value={formData.pastoralFamily.pastorName} 
                                              onChange={(e) => handlePastoralChange('pastorName', e.target.value)} 
                                              className="w-full rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 font-bold text-slate-800 dark:text-white border focus:ring-blue-500 dark:focus:ring-brand-gold focus:border-blue-500 dark:focus:border-brand-gold transition-all" 
                                          />
                                      </div>
                                      <div>
                                          <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Nome da Esposa / Cônjuge</label>
                                          <input 
                                              type="text" 
                                              value={formData.pastoralFamily.wifeName} 
                                              onChange={(e) => handlePastoralChange('wifeName', e.target.value)} 
                                              className="w-full rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 font-bold text-slate-800 dark:text-white border focus:ring-blue-500 dark:focus:ring-brand-gold focus:border-blue-500 dark:focus:border-brand-gold transition-all" 
                                          />
                                      </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Filhos (separados por vírgula)</label>
                                        <input 
                                            type="text" 
                                            value={childrenInput} 
                                            onChange={handleChildrenChange} 
                                            placeholder="Ex: João, Maria, Pedro"
                                            className="w-full rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 font-medium text-slate-700 dark:text-slate-300 border focus:ring-blue-500 dark:focus:ring-brand-gold focus:border-blue-500 dark:focus:border-brand-gold transition-all" 
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Biografia da Família e Ministério</label>
                                <textarea 
                                    value={formData.pastoralFamily.biography || ''} 
                                    onChange={(e) => handlePastoralChange('biography', e.target.value)} 
                                    rows={6} 
                                    className="mt-1 block w-full rounded-[2rem] border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm focus:border-blue-500 dark:focus:border-brand-gold focus:ring-blue-500 dark:focus:ring-brand-gold p-6 font-medium text-slate-600 dark:text-slate-400 border transition-all" 
                                    placeholder="Escreva a história da família pastoral..."
                                />
                            </div>
                        </div>
                    )}

                    {activeTab === 'lideranca' && (
                        <div className="space-y-8 animate-fade-in">
                             <div className="flex justify-between items-center">
                                <h3 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">Líderes de Ministérios</h3>
                                <button 
                                  type="button" 
                                  onClick={handleAddLeader} 
                                  className="text-[10px] font-black uppercase tracking-widest bg-blue-600 dark:bg-brand-gold text-white dark:text-slate-950 px-6 py-3 rounded-2xl hover:bg-blue-700 dark:hover:bg-brand-amber transition-all shadow-lg hover:shadow-blue-200 dark:hover:shadow-brand-gold/20"
                                >
                                    + Adicionar Líder
                                </button>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                {formData.leadership.map((leader, index) => (
                                    <div key={index} className="flex flex-col md:flex-row gap-8 bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 items-start relative group hover:shadow-xl transition-all duration-500">
                                         <div className="flex-shrink-0 flex flex-col items-center space-y-4">
                                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full p-1.5 bg-gradient-to-br from-blue-500 to-indigo-500 dark:from-brand-gold dark:to-brand-amber shadow-lg">
                                              <img src={leader.photoUrl} alt={leader.names} className="w-full h-full rounded-full object-cover border-4 border-white dark:border-slate-800" />
                                            </div>
                                            <label className="cursor-pointer text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-brand-gold hover:text-blue-800 dark:hover:text-brand-amber transition-colors bg-blue-50 dark:bg-slate-800 px-4 py-2 rounded-xl">
                                                Alterar Foto
                                                <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleLeaderPhotoUpload(index, e.target.files[0])} />
                                            </label>
                                        </div>
                                        <div className="flex-grow w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                                             <div>
                                                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Cargo / Função</label>
                                                <input 
                                                    type="text" 
                                                    value={leader.role} 
                                                    onChange={(e) => handleLeaderChange(index, 'role', e.target.value)}
                                                    className="w-full rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 font-black text-blue-600 dark:text-brand-gold border focus:ring-blue-500 dark:focus:ring-brand-gold focus:border-blue-500 dark:focus:border-brand-gold transition-all uppercase text-xs tracking-widest"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Nomes (Casal ou Líder)</label>
                                                <input 
                                                    type="text" 
                                                    value={leader.names} 
                                                    onChange={(e) => handleLeaderChange(index, 'names', e.target.value)}
                                                    className="w-full rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 font-bold text-slate-800 dark:text-white border focus:ring-blue-500 dark:focus:ring-brand-gold focus:border-blue-500 dark:focus:border-brand-gold transition-all"
                                                />
                                            </div>
                                        </div>
                                        <button 
                                            type="button" 
                                            onClick={() => handleRemoveLeader(index)}
                                            className="absolute top-6 right-6 text-slate-300 dark:text-slate-600 hover:text-red-500 dark:hover:text-red-500 p-2 transition-colors"
                                            title="Remover Líder"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                                {formData.leadership.length === 0 && (
                                    <div className="col-span-full text-center py-16 text-slate-400 dark:text-slate-600 bg-white dark:bg-slate-900 rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
                                        <div className="bg-slate-50 dark:bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-200 dark:text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                          </svg>
                                        </div>
                                        <p className="font-bold uppercase tracking-widest text-xs">Nenhum líder adicionado ainda</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'galeria' && (
                         <div className="space-y-8 animate-fade-in">
                             <div className="flex justify-between items-center">
                                <h3 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">Fotos da Igreja</h3>
                                <label className="cursor-pointer text-[10px] font-black uppercase tracking-widest bg-blue-600 dark:bg-brand-gold text-white dark:text-slate-950 px-6 py-3 rounded-2xl hover:bg-blue-700 dark:hover:bg-brand-amber transition-all shadow-lg hover:shadow-blue-200 dark:hover:shadow-brand-gold/20 flex items-center space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span>Adicionar Foto</span>
                                    <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleAddGalleryPhoto(e.target.files[0])} />
                                </label>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                {formData.gallery.map((photoUrl, index) => (
                                    <div key={index} className="relative group rounded-3xl overflow-hidden shadow-md border-4 border-white dark:border-slate-800 bg-slate-100 dark:bg-slate-800 aspect-video transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
                                        <img src={photoUrl} alt="Galeria" className="w-full h-full object-cover" />
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
                                 {formData.gallery.length === 0 && (
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

                    {activeTab === 'social' && (
                        <div className="space-y-8 animate-fade-in">
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Instagram (URL completa)</label>
                                <input 
                                    type="url" 
                                    name="socialInstagram" 
                                    value={formData.socialInstagram || ''} 
                                    onChange={handleChange} 
                                    placeholder="https://instagram.com/sua-igreja"
                                    className="mt-1 block w-full rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm focus:border-blue-500 dark:focus:border-brand-gold focus:ring-blue-500 dark:focus:ring-brand-gold py-3 px-4 font-medium text-slate-700 dark:text-slate-300 transition-all" 
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Facebook (URL completa)</label>
                                <input 
                                    type="url" 
                                    name="socialFacebook" 
                                    value={formData.socialFacebook || ''} 
                                    onChange={handleChange} 
                                    placeholder="https://facebook.com/sua-igreja"
                                    className="mt-1 block w-full rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm focus:border-blue-500 dark:focus:border-brand-gold focus:ring-blue-500 dark:focus:ring-brand-gold py-3 px-4 font-medium text-slate-700 dark:text-slate-300 transition-all" 
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Google Maps (URL para "Como Chegar")</label>
                                <input 
                                    type="url" 
                                    name="mapUrl" 
                                    value={formData.mapUrl || ''} 
                                    onChange={handleChange} 
                                    placeholder="https://goo.gl/maps/..."
                                    className="mt-1 block w-full rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm focus:border-blue-500 dark:focus:border-brand-gold focus:ring-blue-500 dark:focus:ring-brand-gold py-3 px-4 font-medium text-slate-700 dark:text-slate-300 transition-all" 
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Site Oficial (URL completa)</label>
                                <input 
                                    type="url" 
                                    name="websiteUrl" 
                                    value={(formData as any).websiteUrl || ''} 
                                    onChange={handleChange} 
                                    placeholder="https://www.igreja.com.br"
                                    className="mt-1 block w-full rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm focus:border-blue-500 dark:focus:border-brand-gold focus:ring-blue-500 dark:focus:ring-brand-gold py-3 px-4 font-medium text-slate-700 dark:text-slate-300 transition-all" 
                                />
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
                  form="churchForm" 
                  disabled={isLoading} 
                  className="px-10 py-4 text-[10px] font-black uppercase tracking-widest text-white dark:text-slate-950 bg-blue-600 dark:bg-brand-gold rounded-2xl hover:bg-blue-700 dark:hover:bg-brand-amber disabled:bg-blue-300 dark:disabled:bg-slate-800 transition-all shadow-lg hover:shadow-blue-200 dark:hover:shadow-brand-gold/20 flex items-center justify-center min-w-[180px]"
                >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white dark:border-slate-950"></div>
                    ) : 'Salvar Alterações'}
                </button>
            </div>
        </div>
    );
};

export default ChurchForm;
