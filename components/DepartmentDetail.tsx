
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Department, TeamMember } from '../types';
import Lightbox from './Lightbox';
import { useAdmin } from '../hooks/useAdmin';

interface DepartmentDetailProps {
  department: Department;
  onBack: () => void;
}

const DepartmentDetail: React.FC<DepartmentDetailProps> = ({ department, onBack }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const isAdmin = useAdmin();

  return (
    <div className="animate-fade-in min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      {/* Hero Section */}
      <div className={`relative h-72 md:h-[400px] w-full bg-gradient-to-br ${department.color} overflow-hidden`}>
        <img 
          src={department.bannerUrl} 
          alt={department.name} 
          className="w-full h-full object-cover mix-blend-overlay opacity-30 transition-transform duration-1000 hover:scale-105"
        />
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-16 text-white bg-gradient-to-t from-slate-900/80 via-transparent to-transparent">
          <div className="container mx-auto relative">
            <button 
                onClick={onBack}
                className="mb-6 flex items-center space-x-2 text-white/70 hover:text-white transition font-black uppercase tracking-widest text-[10px] group/back"
            >
                <div className="bg-white/10 p-1.5 rounded-lg group-hover/back:bg-white/20 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>Voltar</span>
            </button>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none break-words">{department.acronym}</h1>
                    <h2 className="text-xl md:text-3xl font-bold mt-2 opacity-90 tracking-tight">{department.name}</h2>
                </div>
                {isAdmin && (
                    <Link 
                        to={`/admin?tab=departments&editId=${department.id}`}
                        className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-2xl backdrop-blur-md transition-all shadow-xl border border-white/20 font-black uppercase tracking-widest text-[10px] flex items-center gap-2 self-start md:self-auto"
                        title="Editar Ministério"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                        Editar Depto
                    </Link>
                )}
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto p-4 md:p-8 lg:p-12 -mt-12 md:-mt-20 relative z-10">
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 md:p-16 mb-12 border border-slate-100 dark:border-slate-800 transition-colors duration-500">
            
            {/* Liderança e Equipe */}
            <div className="mb-16 border-b border-slate-50 dark:border-slate-800 pb-16">
                <div className="flex items-center space-x-4 mb-10">
                  <h3 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white tracking-tighter">
                      Nossa Liderança e Equipe
                  </h3>
                  <div className="h-px flex-grow bg-slate-100 dark:bg-slate-800"></div>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
                    {department.team.map((member, idx) => (
                        <div 
                          key={idx} 
                          className="flex flex-col items-center bg-slate-50 dark:bg-slate-950 p-6 rounded-3xl hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-800 cursor-pointer group"
                          onClick={() => setSelectedMember(member)}
                        >
                            <div className={`w-24 h-24 md:w-32 md:h-32 rounded-full p-1.5 bg-gradient-to-br ${department.color} mb-4 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                                <img 
                                    src={member.photoUrl} 
                                    alt={member.name} 
                                    className="w-full h-full object-cover rounded-full border-4 border-white dark:border-slate-800"
                                />
                            </div>
                            <h4 className="font-black text-slate-800 dark:text-white text-center leading-tight tracking-tight group-hover:text-indigo-600 dark:group-hover:text-brand-gold transition-colors">{member.name}</h4>
                            <p className="text-[10px] text-indigo-600 dark:text-brand-gold font-black uppercase tracking-widest mt-2 text-center">{member.role}</p>
                            <div className="mt-4 text-[10px] font-black uppercase tracking-widest bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 px-4 py-2 rounded-full shadow-sm border border-slate-100 dark:border-slate-800 group-hover:bg-indigo-600 dark:group-hover:bg-brand-gold group-hover:text-white dark:group-hover:text-slate-950 group-hover:border-indigo-600 dark:group-hover:border-brand-gold transition-all">
                                Ver Bio
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Trabalhos Realizados */}
            <div className="mb-16">
                <div className="flex items-center space-x-4 mb-8">
                  <h3 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white tracking-tighter">
                      Trabalhos Realizados
                  </h3>
                  <div className="h-px flex-grow bg-slate-100 dark:bg-slate-800"></div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-950 p-8 md:p-12 rounded-3xl border-l-8 border-indigo-500 dark:border-brand-gold shadow-inner">
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg md:text-xl font-medium italic">
                      "{department.works}"
                  </p>
                </div>
            </div>

            {/* Galeria de Eventos */}
            <div>
                <div className="flex items-center space-x-4 mb-10">
                  <h3 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white tracking-tighter">
                      Galeria de Eventos
                  </h3>
                  <div className="h-px flex-grow bg-slate-100 dark:bg-slate-800"></div>
                </div>
                {department.eventPhotos.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {department.eventPhotos.map((photo, index) => (
                            <div 
                                key={index} 
                                className="group relative aspect-video overflow-hidden rounded-2xl cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 border-4 border-white dark:border-slate-800"
                                onClick={() => setSelectedImage(photo)}
                            >
                                <img 
                                    src={photo} 
                                    alt={`Evento ${department.acronym} ${index + 1}`} 
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <div className="bg-white/20 backdrop-blur-md p-4 rounded-full text-white">
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                      </svg>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-slate-50 dark:bg-slate-950 rounded-3xl p-12 text-center border-2 border-dashed border-slate-200 dark:border-slate-800">
                      <p className="text-slate-400 dark:text-slate-600 font-bold italic">Nenhuma foto de evento disponível no momento.</p>
                    </div>
                )}
            </div>
        </div>
      </main>

      {/* Lightbox para Galeria */}
      {selectedImage && (
        <Lightbox 
            imageUrl={selectedImage} 
            altText={`Foto evento ${department.acronym}`} 
            onClose={() => setSelectedImage(null)} 
        />
      )}

      {/* Modal para Detalhes do Membro (Bio e Foto) */}
      {selectedMember && (
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex justify-center items-center p-4 animate-fade-in"
            onClick={() => setSelectedMember(null)}
          >
              <div 
                className="bg-white dark:bg-slate-900 rounded-[2rem] max-w-lg w-full overflow-hidden shadow-2xl transform scale-100 transition-all border border-slate-100 dark:border-slate-800"
                onClick={(e) => e.stopPropagation()}
              >
                  <div className={`h-32 bg-gradient-to-r ${department.color}`}></div>
                  <div className="px-6 -mt-16 flex justify-center">
                      <img 
                        src={selectedMember.photoUrl} 
                        alt={selectedMember.name} 
                        className="w-32 h-32 rounded-full border-4 border-white dark:border-slate-800 shadow-lg object-cover bg-white dark:bg-slate-900"
                      />
                  </div>
                  <div className="p-8 text-center">
                      <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">{selectedMember.name}</h2>
                      <p className="text-indigo-600 dark:text-brand-gold font-black uppercase tracking-widest text-xs mb-6">{selectedMember.role}</p>
                      
                      <div className="text-left bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 max-h-60 overflow-y-auto">
                          <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase mb-3 tracking-widest">Biografia & Família</h4>
                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line font-medium">
                              {selectedMember.familyBiography || "Biografia ainda não disponível."}
                          </p>
                      </div>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-950 px-8 py-6 flex justify-end border-t border-slate-100 dark:border-slate-800">
                      <button 
                        onClick={() => setSelectedMember(null)}
                        className="px-6 py-3 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-300 dark:hover:bg-slate-700 font-black uppercase tracking-widest text-[10px] transition-all"
                      >
                          Fechar
                      </button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default DepartmentDetail;
