
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
    <div className="animate-fade-in min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className={`relative h-64 md:h-80 w-full bg-gradient-to-r ${department.color}`}>
        <img 
          src={department.bannerUrl} 
          alt={department.name} 
          className="w-full h-full object-cover mix-blend-overlay opacity-40"
        />
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 text-white bg-gradient-to-t from-black/80 to-transparent">
          <div className="container mx-auto relative">
            <button 
                onClick={onBack}
                className="mb-4 flex items-center space-x-2 text-white/80 hover:text-white transition font-medium"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                <span>Voltar</span>
            </button>
            
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{department.acronym}</h1>
                    <h2 className="text-xl md:text-2xl font-light mt-2">{department.name}</h2>
                </div>
                {isAdmin && (
                    <Link 
                        to={`/admin?tab=departments&editId=${department.id}`}
                        className="bg-white/20 hover:bg-white/40 text-white p-2 md:p-3 rounded-full backdrop-blur-md transition-all shadow-lg mb-1"
                        title="Editar Departamento"
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
        <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 mb-8">
            
            {/* Liderança e Equipe (Novo Layout de Cards) */}
            <div className="mb-10 border-b border-slate-100 pb-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Nossa Liderança e Equipe
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {department.team.map((member, idx) => (
                        <div 
                          key={idx} 
                          className="flex flex-col items-center bg-slate-50 p-4 rounded-xl hover:shadow-md transition-all border border-slate-100 cursor-pointer group"
                          onClick={() => setSelectedMember(member)}
                        >
                            <div className={`w-24 h-24 md:w-32 md:h-32 rounded-full p-1 bg-gradient-to-br ${department.color} mb-3 shadow-sm group-hover:scale-105 transition-transform`}>
                                <img 
                                    src={member.photoUrl} 
                                    alt={member.name} 
                                    className="w-full h-full object-cover rounded-full border-2 border-white"
                                />
                            </div>
                            <h4 className="font-bold text-slate-800 text-center leading-tight">{member.name}</h4>
                            <p className="text-sm text-indigo-600 font-medium mt-1 text-center">{member.role}</p>
                            <div className="mt-3 text-xs bg-white text-slate-500 px-3 py-1 rounded-full shadow-sm border group-hover:bg-indigo-50 group-hover:text-indigo-700 transition-colors">
                                Ver Biografia
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Trabalhos Realizados */}
            <div className="mb-10">
                <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Trabalhos Realizados
                </h3>
                <p className="text-slate-600 leading-relaxed text-lg bg-slate-50 p-6 rounded-lg border-l-4 border-indigo-200">
                    {department.works}
                </p>
            </div>

            {/* Galeria de Eventos */}
            <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Galeria de Eventos
                </h3>
                {department.eventPhotos.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {department.eventPhotos.map((photo, index) => (
                            <div 
                                key={index} 
                                className="group relative aspect-video overflow-hidden rounded-lg cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
                                onClick={() => setSelectedImage(photo)}
                            >
                                <img 
                                    src={photo} 
                                    alt={`Evento ${department.acronym} ${index + 1}`} 
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-slate-500 italic">Nenhuma foto de evento disponível no momento.</p>
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
            className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center p-4 animate-fade-in"
            onClick={() => setSelectedMember(null)}
          >
              <div 
                className="bg-white rounded-lg max-w-lg w-full overflow-hidden shadow-2xl transform scale-100 transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                  <div className={`h-32 bg-gradient-to-r ${department.color}`}></div>
                  <div className="px-6 -mt-16 flex justify-center">
                      <img 
                        src={selectedMember.photoUrl} 
                        alt={selectedMember.name} 
                        className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover bg-white"
                      />
                  </div>
                  <div className="p-6 text-center">
                      <h2 className="text-2xl font-bold text-slate-800">{selectedMember.name}</h2>
                      <p className="text-indigo-600 font-semibold mb-4">{selectedMember.role}</p>
                      
                      <div className="text-left bg-slate-50 p-4 rounded-lg border border-slate-100 max-h-60 overflow-y-auto">
                          <h4 className="text-sm font-bold text-slate-400 uppercase mb-2 tracking-wider">Biografia & Família</h4>
                          <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                              {selectedMember.familyBiography || "Biografia ainda não disponível."}
                          </p>
                      </div>
                  </div>
                  <div className="bg-slate-50 px-6 py-4 flex justify-end">
                      <button 
                        onClick={() => setSelectedMember(null)}
                        className="px-4 py-2 bg-slate-200 text-slate-700 rounded hover:bg-slate-300 font-medium transition"
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
