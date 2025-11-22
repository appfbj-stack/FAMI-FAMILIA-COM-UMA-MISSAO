import React, { useState, useEffect } from 'react';
import { Announcement } from '../types';
import { addAnnouncement, updateAnnouncement, uploadBanner } from '../services/announcementService';
import { CHURCHES } from '../constants';

interface AnnouncementFormProps {
    announcement: Announcement | null;
    onClose: (shouldRefresh: boolean) => void;
}

const AnnouncementForm: React.FC<AnnouncementFormProps> = ({ announcement, onClose }) => {
    const [formData, setFormData] = useState({
        title: announcement?.title || '',
        description: announcement?.description || '',
        imageUrl: announcement?.imageUrl || '',
        imageAlt: announcement?.imageAlt || '',
        church: announcement?.church || CHURCHES[0],
        date: announcement?.date || new Date().toISOString().split('T')[0],
    });
    const [isLoading, setIsLoading] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(announcement?.imageUrl || null);

    const isEditing = !!announcement;

    useEffect(() => {
        // Cleanup function for the object URL to prevent memory leaks
        return () => {
            if (imagePreview && imagePreview.startsWith('blob:')) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
            // Clear the old URL from form data since a new file is being chosen
            setFormData(prev => ({ ...prev, imageUrl: '' }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            let dataToSubmit = { ...formData };
            
            if (imageFile) {
                const newImageUrl = await uploadBanner(imageFile);
                setFormData(prev => ({...prev, imageUrl: newImageUrl})); 
                dataToSubmit.imageUrl = newImageUrl;
            }

            if (!dataToSubmit.imageUrl) {
                alert("Por favor, selecione uma imagem para o anúncio.");
                setIsLoading(false);
                return;
            }

            if (isEditing) {
                await updateAnnouncement({ ...dataToSubmit, id: announcement.id });
            } else {
                await addAnnouncement(dataToSubmit);
            }
            onClose(true);
        } catch (error) {
            console.error("Failed to save announcement", error);
            alert("Ocorreu um erro ao salvar. Tente novamente.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg max-h-[80vh] overflow-y-auto w-full">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800">{isEditing ? 'Editar Anúncio' : 'Novo Anúncio'}</h2>
                <button onClick={() => onClose(false)} className="text-slate-400 hover:text-slate-700 text-3xl leading-none font-bold">&times;</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título</label>
                    <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"/>
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição Completa</label>
                    <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows={8} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"></textarea>
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700">Banner do Anúncio</label>
                    <div className="mt-2 flex flex-col items-center space-y-4 p-4 border-2 border-dashed border-gray-300 rounded-md">
                        {imagePreview ? (
                            <img src={imagePreview} alt="Pré-visualização" className="rounded-lg shadow-md max-h-48 w-auto" />
                        ) : (
                            <div className="text-center text-slate-500 py-4">
                                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                <p className="mt-1">Nenhuma imagem selecionada</p>
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                            id="image-upload"
                        />
                        <label htmlFor="image-upload" className="cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            {imagePreview ? 'Trocar Imagem' : 'Selecionar Imagem'}
                        </label>
                    </div>
                </div>
                
                <div>
                    <label htmlFor="imageAlt" className="block text-sm font-medium text-gray-700">Descrição do Banner (Texto Alternativo)</label>
                    <input 
                        type="text" 
                        name="imageAlt" 
                        id="imageAlt" 
                        value={formData.imageAlt}
                        onChange={handleChange}
                        placeholder="Ex: Pessoas sorrindo durante o culto de domingo" 
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                        Esta descrição é importante para acessibilidade (leitores de tela).
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="church" className="block text-sm font-medium text-gray-700">Igreja Responsável</label>
                        <select name="church" id="church" value={formData.church} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                            {CHURCHES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Data do Evento</label>
                        <input type="date" name="date" id="date" value={formData.date} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"/>
                    </div>
                </div>
                <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                    <button type="button" onClick={() => onClose(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition">Cancelar</button>
                    <button type="submit" disabled={isLoading} className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-indigo-300 transition w-32 text-center">
                        {isLoading ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mx-auto"></div>
                        ) : 'Salvar Anúncio'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AnnouncementForm;
