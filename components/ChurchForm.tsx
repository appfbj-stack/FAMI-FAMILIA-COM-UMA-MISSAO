
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
    const [activeTab, setActiveTab] = useState<'geral' | 'pastoral' | 'lideranca' | 'galeria'>('geral');
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
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center flex-shrink-0">
                <h2 className="text-xl font-bold text-slate-800">Editar Igreja: {formData.name}</h2>
                <button onClick={() => onClose(false)} className="text-slate-400 hover:text-slate-700 text-3xl leading-none">&times;</button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-200 bg-white flex-shrink-0 overflow-x-auto">
                <button 
                    onClick={() => setActiveTab('geral')}
                    className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === 'geral' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                >
                    Dados Gerais
                </button>
                <button 
                    onClick={() => setActiveTab('pastoral')}
                    className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === 'pastoral' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                >
                    Família Pastoral
                </button>
                <button 
                    onClick={() => setActiveTab('lideranca')}
                    className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === 'lideranca' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                >
                    Liderança Local
                </button>
                <button 
                    onClick={() => setActiveTab('galeria')}
                    className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === 'galeria' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                >
                    Galeria
                </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto flex-grow">
                <form id="churchForm" onSubmit={handleSubmit} className="space-y-6">
                    
                    {activeTab === 'geral' && (
                        <div className="space-y-4 animate-fade-in">
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Nome da Igreja</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Endereço Completo</label>
                                <input type="text" name="address" value={formData.address} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Descrição / Lema</label>
                                <textarea name="description" rows={3} value={formData.description} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border" />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-slate-700">Foto da Fachada (Capa)</label>
                                <div className="mt-2 flex items-center space-x-4">
                                    <img src={formData.coverUrl} alt="Capa" className="h-24 w-40 object-cover rounded-md border" />
                                    <label className="cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                                        Alterar Capa
                                        <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleCoverUpload(e.target.files[0])} />
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'pastoral' && (
                        <div className="space-y-4 animate-fade-in">
                            <div className="flex items-start space-x-6">
                                <div className="flex-shrink-0 text-center">
                                    <img src={formData.pastoralFamily.photoUrl} alt="Família" className="w-32 h-32 rounded-full object-cover border-4 border-indigo-100 mb-2 mx-auto" />
                                    <label className="cursor-pointer text-xs text-indigo-600 font-bold hover:underline">
                                        Trocar Foto
                                        <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handlePastoralPhotoUpload(e.target.files[0])} />
                                    </label>
                                </div>
                                <div className="flex-grow space-y-4">
                                    <div>
                                        <label className="block text-xs font-medium text-slate-500">Nome do Pastor</label>
                                        <input 
                                            type="text" 
                                            value={formData.pastoralFamily.pastorName} 
                                            onChange={(e) => handlePastoralChange('pastorName', e.target.value)} 
                                            className="w-full rounded border-gray-300 p-2 border text-sm" 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-500">Nome da Esposa</label>
                                        <input 
                                            type="text" 
                                            value={formData.pastoralFamily.wifeName} 
                                            onChange={(e) => handlePastoralChange('wifeName', e.target.value)} 
                                            className="w-full rounded border-gray-300 p-2 border text-sm" 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-500">Filhos (separados por vírgula)</label>
                                        <input 
                                            type="text" 
                                            value={childrenInput} 
                                            onChange={handleChildrenChange} 
                                            placeholder="Ex: João, Maria, Pedro"
                                            className="w-full rounded border-gray-300 p-2 border text-sm" 
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Biografia da Família e Ministério</label>
                                <textarea 
                                    value={formData.pastoralFamily.biography || ''} 
                                    onChange={(e) => handlePastoralChange('biography', e.target.value)} 
                                    rows={6} 
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border" 
                                    placeholder="Escreva a história da família pastoral..."
                                />
                            </div>
                        </div>
                    )}

                    {activeTab === 'lideranca' && (
                        <div className="space-y-6 animate-fade-in">
                             <div className="flex justify-between items-center">
                                <h3 className="text-lg font-medium text-slate-800">Líderes de Departamentos</h3>
                                <button type="button" onClick={handleAddLeader} className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                                    + Adicionar Líder
                                </button>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                {formData.leadership.map((leader, index) => (
                                    <div key={index} className="flex flex-col md:flex-row gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200 items-center">
                                         <div className="flex-shrink-0 flex flex-col items-center space-y-2">
                                            <img src={leader.photoUrl} alt={leader.names} className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm" />
                                            <label className="cursor-pointer text-xs text-indigo-600 font-medium hover:underline">
                                                Alterar Foto
                                                <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleLeaderPhotoUpload(index, e.target.files[0])} />
                                            </label>
                                        </div>
                                        <div className="flex-grow w-full grid grid-cols-1 md:grid-cols-2 gap-3">
                                             <div>
                                                <label className="text-xs text-slate-500">Cargo / Função</label>
                                                <input 
                                                    type="text" 
                                                    value={leader.role} 
                                                    onChange={(e) => handleLeaderChange(index, 'role', e.target.value)}
                                                    className="w-full rounded border-gray-300 p-1.5 text-sm border"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs text-slate-500">Nomes (Casal ou Líder)</label>
                                                <input 
                                                    type="text" 
                                                    value={leader.names} 
                                                    onChange={(e) => handleLeaderChange(index, 'names', e.target.value)}
                                                    className="w-full rounded border-gray-300 p-1.5 text-sm border"
                                                />
                                            </div>
                                        </div>
                                        <button 
                                            type="button" 
                                            onClick={() => handleRemoveLeader(index)}
                                            className="text-red-500 hover:text-red-700 p-2"
                                            title="Remover Líder"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                                {formData.leadership.length === 0 && (
                                    <p className="text-center text-slate-400 py-4">Nenhum líder adicionado ainda.</p>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'galeria' && (
                         <div className="space-y-6 animate-fade-in">
                             <div className="flex justify-between items-center">
                                <h3 className="text-lg font-medium text-slate-800">Fotos da Igreja</h3>
                                <label className="cursor-pointer text-sm bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 flex items-center space-x-1">
                                    <span>+ Adicionar Foto</span>
                                    <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleAddGalleryPhoto(e.target.files[0])} />
                                </label>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {formData.gallery.map((photoUrl, index) => (
                                    <div key={index} className="relative group rounded-lg overflow-hidden shadow-sm border border-slate-200 bg-slate-50 aspect-video">
                                        <img src={photoUrl} alt="Galeria" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
                                            <button 
                                                type="button"
                                                onClick={() => handleRemoveGalleryPhoto(index)}
                                                className="bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform hover:scale-110"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                 {formData.gallery.length === 0 && (
                                    <div className="col-span-full text-center py-8 text-slate-400 bg-slate-50 rounded border border-dashed border-slate-300">
                                        Nenhuma foto na galeria.
                                    </div>
                                )}
                            </div>
                         </div>
                    )}

                </form>
            </div>

             {/* Footer Actions */}
            <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-end space-x-3 flex-shrink-0">
                <button type="button" onClick={() => onClose(false)} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50">
                    Cancelar
                </button>
                <button type="submit" form="churchForm" disabled={isLoading} className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 disabled:bg-indigo-300 min-w-[120px]">
                    {isLoading ? 'Salvando...' : 'Salvar Alterações'}
                </button>
            </div>
        </div>
    );
};

export default ChurchForm;
