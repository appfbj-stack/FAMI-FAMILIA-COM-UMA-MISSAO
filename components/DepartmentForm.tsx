
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
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center flex-shrink-0">
                <h2 className="text-xl font-bold text-slate-800">Editar: {formData.acronym}</h2>
                <button onClick={() => onClose(false)} className="text-slate-400 hover:text-slate-700 text-3xl leading-none">&times;</button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-200 bg-white flex-shrink-0">
                <button 
                    onClick={() => setActiveTab('info')}
                    className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'info' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                >
                    Informações Gerais
                </button>
                <button 
                    onClick={() => setActiveTab('team')}
                    className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'team' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                >
                    Equipe e Liderança
                </button>
                <button 
                    onClick={() => setActiveTab('gallery')}
                    className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'gallery' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                >
                    Galeria de Fotos
                </button>
            </div>

            {/* Content Scrollable Area */}
            <div className="p-6 overflow-y-auto flex-grow">
                <form id="deptForm" onSubmit={handleSubmit} className="space-y-6">
                    
                    {activeTab === 'info' && (
                        <div className="space-y-4 animate-fade-in">
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Nome do Departamento</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border" />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-slate-700">Sigla</label>
                                <input type="text" name="acronym" value={formData.acronym} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Descrição Curta</label>
                                <textarea name="description" rows={2} value={formData.description} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Trabalhos Realizados (Texto Longo)</label>
                                <textarea name="works" rows={5} value={formData.works} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700">URL do Banner Principal</label>
                                <input type="text" name="bannerUrl" value={formData.bannerUrl} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border text-xs text-slate-500" />
                                <img src={formData.bannerUrl} alt="Banner" className="mt-2 h-24 w-full object-cover rounded" />
                            </div>
                        </div>
                    )}

                    {activeTab === 'team' && (
                        <div className="space-y-6 animate-fade-in">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-medium text-slate-800">Membros da Equipe</h3>
                                <button type="button" onClick={handleAddTeamMember} className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                                    + Adicionar Membro
                                </button>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-4">
                                {formData.team.map((member, index) => (
                                    <div key={index} className="flex flex-col md:flex-row gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200 items-start">
                                        <div className="flex-shrink-0 flex flex-col items-center space-y-2">
                                            <img src={member.photoUrl} alt={member.name} className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm" />
                                            <label className="cursor-pointer text-xs text-indigo-600 font-medium hover:underline">
                                                Alterar Foto
                                                <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleTeamPhotoUpload(index, e.target.files[0])} />
                                            </label>
                                        </div>
                                        <div className="flex-grow w-full space-y-3">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                <div>
                                                    <label className="text-xs text-slate-500">Nome</label>
                                                    <input 
                                                        type="text" 
                                                        value={member.name} 
                                                        onChange={(e) => handleTeamChange(index, 'name', e.target.value)}
                                                        className="w-full rounded border-gray-300 p-1.5 text-sm border focus:ring-indigo-500 focus:border-indigo-500"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-xs text-slate-500">Cargo/Função</label>
                                                    <input 
                                                        type="text" 
                                                        value={member.role} 
                                                        onChange={(e) => handleTeamChange(index, 'role', e.target.value)}
                                                        className="w-full rounded border-gray-300 p-1.5 text-sm border focus:ring-indigo-500 focus:border-indigo-500"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-xs text-slate-500">Biografia e Família</label>
                                                <textarea 
                                                    value={member.familyBiography || ''} 
                                                    onChange={(e) => handleTeamChange(index, 'familyBiography', e.target.value)}
                                                    placeholder="Descreva a biografia, família e trajetória ministerial..."
                                                    rows={3}
                                                    className="w-full rounded border-gray-300 p-1.5 text-sm border focus:ring-indigo-500 focus:border-indigo-500"
                                                />
                                            </div>
                                        </div>
                                        <button 
                                            type="button" 
                                            onClick={() => handleRemoveTeamMember(index)}
                                            className="text-red-500 hover:text-red-700 p-2 self-start md:self-center"
                                            title="Remover Membro"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'gallery' && (
                        <div className="space-y-6 animate-fade-in">
                             <div className="flex justify-between items-center">
                                <h3 className="text-lg font-medium text-slate-800">Fotos de Eventos</h3>
                                <label className="cursor-pointer text-sm bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 flex items-center space-x-1">
                                    <span>+ Upload Foto</span>
                                    <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleAddGalleryPhoto(e.target.files[0])} />
                                </label>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {formData.eventPhotos.map((photoUrl, index) => (
                                    <div key={index} className="relative group rounded-lg overflow-hidden shadow-sm border border-slate-200 bg-slate-50 aspect-video">
                                        <img src={photoUrl} alt="Evento" className="w-full h-full object-cover" />
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
                                {formData.eventPhotos.length === 0 && (
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
                <button type="submit" form="deptForm" disabled={isLoading} className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 disabled:bg-indigo-300 min-w-[120px]">
                    {isLoading ? 'Salvando...' : 'Salvar Alterações'}
                </button>
            </div>
        </div>
    );
};

export default DepartmentForm;
