
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Header from '../components/Header';
import FilterBar from '../components/FilterBar';
import AnnouncementCard from '../components/AnnouncementCard';
import AnnouncementDetail from '../components/AnnouncementDetail';
import DepartmentDetail from '../components/DepartmentDetail';
import LoadingSpinner from '../components/LoadingSpinner';
import PwaInstallButton from '../components/PwaInstallButton';
import { getAnnouncements, getDepartments, getChurches } from '../services/announcementService';
import { Announcement, Department, Church } from '../types';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [churches, setChurches] = useState<Church[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedChurch, setSelectedChurch] = useState('all');
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  
  const navigate = useNavigate();

  const fetchData = useCallback(() => {
    setIsLoading(true);
    Promise.all([getAnnouncements(), getDepartments(), getChurches()])
      .then(([annData, deptData, churchData]) => {
        setAnnouncements(annData);
        setDepartments(deptData);
        setChurches(churchData);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredAnnouncements = useMemo(() => {
    if (selectedChurch === 'all') {
      return announcements;
    }
    return announcements.filter(ann => ann.church === selectedChurch);
  }, [announcements, selectedChurch]);

  const handleSelectAnnouncement = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    window.scrollTo(0, 0);
  };

  const handleSelectDepartment = (department: Department) => {
    setSelectedDepartment(department);
    window.scrollTo(0, 0);
  };

  const handleBackToList = () => {
    setSelectedAnnouncement(null);
    setSelectedDepartment(null);
  };

  if (selectedAnnouncement) {
    return (
      <>
        <Header />
        <AnnouncementDetail announcement={selectedAnnouncement} onBack={handleBackToList} />
      </>
    );
  }

  if (selectedDepartment) {
    return (
      <>
        <Header />
        <DepartmentDetail department={selectedDepartment} onBack={handleBackToList} />
      </>
    );
  }

  return (
    <>
      <Header />
      
      {/* Regional Departments Section */}
      <section className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-lg font-semibold text-slate-700 mb-4 px-2 border-l-4 border-indigo-600">Departamentos Regionais</h2>
            {isLoading && departments.length === 0 ? (
                 <div className="flex space-x-4 overflow-hidden pb-4">
                     {[1,2,3,4].map(i => <div key={i} className="w-40 h-32 bg-slate-200 rounded-xl animate-pulse"></div>)}
                 </div>
            ) : (
                <div className="flex space-x-4 overflow-x-auto pb-4 snap-x hide-scrollbar">
                    {departments.map(dept => (
                        <div 
                            key={dept.id}
                            onClick={() => handleSelectDepartment(dept)}
                            className={`flex-shrink-0 w-40 md:w-48 bg-gradient-to-br ${dept.color} rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all cursor-pointer p-4 flex flex-col justify-between text-white snap-start`}
                        >
                            <div className="text-xs font-medium opacity-90 mb-2">Regional Sorocaba</div>
                            <div>
                                <h3 className="font-bold text-lg leading-tight mb-1">{dept.acronym}</h3>
                                <p className="text-[10px] leading-snug opacity-90 line-clamp-2">{dept.name}</p>
                            </div>
                            <div className="mt-3 flex justify-end">
                            <div className="bg-white/20 p-1.5 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                            </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
      </section>

      {/* Churches Grid Section */}
      <section className="bg-slate-50 border-b border-slate-200 py-6">
         <div className="container mx-auto px-4">
             <h2 className="text-lg font-semibold text-slate-700 mb-4 px-2 border-l-4 border-blue-500">Nossas Igrejas</h2>
             {isLoading && churches.length === 0 ? (
                 <LoadingSpinner />
             ) : (
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                     {churches.map(church => (
                         <div 
                             key={church.id} 
                             onClick={() => navigate(`/church/${church.id}`)}
                             className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden group border border-slate-100"
                         >
                             <div className="h-24 overflow-hidden relative">
                                <img src={church.coverUrl} alt={church.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                             </div>
                             <div className="p-3 text-center">
                                 <h3 className="text-xs md:text-sm font-bold text-slate-800 truncate">{church.name}</h3>
                                 <p className="text-[10px] text-slate-500 truncate mt-1">{church.address}</p>
                             </div>
                         </div>
                     ))}
                 </div>
             )}
         </div>
      </section>

      <FilterBar selectedChurch={selectedChurch} onChurchChange={setSelectedChurch} />
      
      <main className="container mx-auto p-4 md:p-8">
        {isLoading && filteredAnnouncements.length === 0 ? (
          <LoadingSpinner />
        ) : (
          <>
            <h2 className="text-lg font-semibold text-slate-700 mb-6 px-2 border-l-4 border-indigo-600">Mural de Anúncios Geral</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAnnouncements.length > 0 ? (
                filteredAnnouncements.map((ann, index) => (
                  <div key={ann.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                    <AnnouncementCard announcement={ann} onSelect={handleSelectAnnouncement} />
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center text-slate-500 py-16">
                  <p>Nenhum anúncio encontrado para esta seleção.</p>
                </div>
              )}
            </div>
          </>
        )}
      </main>
      <PwaInstallButton />
    </>
  );
};

export default HomePage;
