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
        <div className="bg-white dark:bg-slate-900 p-6 md:p-10 rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto w-full max-w-2xl border border-slate-100 dark:border-slate-800 transition-colors duration-500">
        <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-8 bg-indigo-600 dark:bg-brand-gold rounded-full"></div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white tracking-tighter">{isEditing ? 'Editar Anúncio' : 'Novo Anúncio'}</h2>
            </div>
            <button onClick={() => onClose(false)} className="text-slate-400 hover:text-slate-700 dark:hover:text-white bg-slate-100 dark:bg-slate-800 p-2 rounded-xl transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-8">
            <div>
                <label htmlFor="title" className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Título do Anúncio</label>
                <input 
                  type="text" 
                  name="title" 
                  id="title" 
                  value={formData.title} 
                  onChange={handleChange} 
                  required 
                  placeholder="Ex: Congresso de Jovens 2024"
                  className="mt-1 block w-full rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm focus:border-indigo-500 dark:focus:border-brand-gold focus:ring-indigo-500 dark:focus:ring-brand-gold py-3 px-4 font-bold text-slate-800 dark:text-white transition-all"
                />
            </div>
            <div>
                <label htmlFor="description" className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Descrição Completa</label>
                <textarea 
                  name="description" 
                  id="description" 
                  value={formData.description} 
                  onChange={handleChange} 
                  rows={6} 
                  required 
                  placeholder="Descreva os detalhes do evento ou anúncio..."
                  className="mt-1 block w-full rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm focus:border-indigo-500 dark:focus:border-brand-gold focus:ring-indigo-500 dark:focus:ring-brand-gold py-3 px-4 font-medium text-slate-700 dark:text-slate-300 transition-all"
                ></textarea>
            </div>
            
            <div>
                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Banner do Anúncio</label>
                <div className="mt-2 flex flex-col items-center space-y-6 p-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl bg-slate-50 dark:bg-slate-950 transition-all hover:border-indigo-300 dark:hover:border-brand-gold">
                    {imagePreview ? (
                        <div className="relative group">
                          <img src={imagePreview} alt="Pré-visualização" className="rounded-2xl shadow-xl max-h-56 w-auto border-4 border-white dark:border-slate-800" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
                            <p className="text-white text-xs font-black uppercase tracking-widest">Trocar Imagem</p>
                          </div>
                        </div>
                    ) : (
                        <div className="text-center text-slate-400 dark:text-slate-600 py-4">
                            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm mb-4 inline-block border border-slate-100 dark:border-slate-800">
                              <svg className="h-10 w-10 text-slate-300 dark:text-slate-700" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </div>
                            <p className="text-xs font-bold uppercase tracking-widest">Nenhuma imagem selecionada</p>
                            <p className="text-[10px] mt-1">Recomendado: 1200x630px</p>
                        </div>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer bg-indigo-600 dark:bg-brand-gold text-white dark:text-slate-950 py-3 px-8 rounded-2xl shadow-lg hover:bg-indigo-700 dark:hover:bg-brand-amber transition-all font-black uppercase tracking-widest text-[10px] transform active:scale-95">
                        {imagePreview ? 'Trocar Imagem' : 'Selecionar Imagem'}
                    </label>
                </div>
            </div>
            
            <div>
                <label htmlFor="imageAlt" className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Descrição do Banner (Acessibilidade)</label>
                <input 
                    type="text" 
                    name="imageAlt" 
                    id="imageAlt" 
                    value={formData.imageAlt}
                    onChange={handleChange}
                    placeholder="Ex: Pessoas sorrindo durante o culto de domingo" 
                    required
                    className="mt-1 block w-full rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm focus:border-indigo-500 dark:focus:border-brand-gold focus:ring-indigo-500 dark:focus:ring-brand-gold py-3 px-4 font-medium text-slate-700 dark:text-slate-300 transition-all"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <label htmlFor="church" className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Igreja Responsável</label>
                    <select 
                      name="church" 
                      id="church" 
                      value={formData.church} 
                      onChange={handleChange} 
                      className="mt-1 block w-full rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm focus:border-indigo-500 dark:focus:border-brand-gold focus:ring-indigo-500 dark:focus:ring-brand-gold py-3 px-4 font-bold text-slate-800 dark:text-white transition-all"
                    >
                        {CHURCHES.map(c => <option key={c} value={c} className="bg-white dark:bg-slate-900">{c}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="date" className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Data do Evento</label>
                    <input 
                      type="date" 
                      name="date" 
                      id="date" 
                      value={formData.date} 
                      onChange={handleChange} 
                      required 
                      className="mt-1 block w-full rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm focus:border-indigo-500 dark:focus:border-brand-gold focus:ring-indigo-500 dark:focus:ring-brand-gold py-3 px-4 font-bold text-slate-800 dark:text-white transition-all"
                    />
                </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-8 border-t border-slate-100 dark:border-slate-800">
                <button 
                  type="button" 
                  onClick={() => onClose(false)} 
                  className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  disabled={isLoading} 
                  className="px-10 py-4 text-[10px] font-black uppercase tracking-widest text-white dark:text-slate-950 bg-indigo-600 dark:bg-brand-gold rounded-2xl hover:bg-indigo-700 dark:hover:bg-brand-amber disabled:bg-indigo-300 dark:disabled:bg-slate-800 transition-all shadow-lg hover:shadow-indigo-200 dark:hover:shadow-brand-gold/20 flex items-center justify-center min-w-[160px]"
                >
                    {isLoading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white dark:border-slate-950"></div>
                    ) : 'Salvar Anúncio'}
                </button>
            </div>
        </form>
    </div>
);
};

export default AnnouncementForm;
