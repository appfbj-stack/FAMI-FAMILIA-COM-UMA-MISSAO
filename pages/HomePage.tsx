
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
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  FileText,
  MapPin,
  Calendar,
  BellRing
} from 'lucide-react';

interface HomePageProps {
  toggleTheme?: () => void;
  isDarkMode?: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ toggleTheme, isDarkMode }) => {
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

  const currentDate = new Intl.DateTimeFormat('pt-BR', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long' 
  }).format(new Date());

  if (selectedAnnouncement) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
        <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        <AnnouncementDetail announcement={selectedAnnouncement} onBack={handleBackToList} />
      </div>
    );
  }

  if (selectedDepartment) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
        <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        <DepartmentDetail department={selectedDepartment} onBack={handleBackToList} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500 pb-24">
      <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      
      <main className="container mx-auto px-4 md:px-6 pt-6 md:pt-8 max-w-7xl">
        
        {/* App Greeting Section */}
        <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-2 text-brand-vibrant mb-2"
            >
              <Calendar className="h-4 w-4" />
              <span className="text-[10px] font-black uppercase tracking-widest capitalize">{currentDate}</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl md:text-4xl font-display font-black text-slate-900 dark:text-white tracking-tight italic uppercase"
            >
              Olá, <span className="text-brand-vibrant">Família!</span>
            </motion.h1>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-900 p-3 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex items-center space-x-3"
          >
            <div className="bg-brand-vibrant/10 p-2 rounded-xl">
              <BellRing className="h-5 w-5 text-brand-vibrant" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Atualizações</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white">{announcements.length} Anúncios Ativos</p>
            </div>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          
          {/* Left Column: Feed (Takes up more space on desktop) */}
          <div className="lg:col-span-8 order-2 lg:order-1 space-y-6">
            
            {/* Filter Bar integrated into the feed header */}
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-2 shadow-sm border border-slate-200 dark:border-slate-800 sticky top-20 z-30 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80">
              <FilterBar selectedChurch={selectedChurch} onChurchChange={setSelectedChurch} />
            </div>

            {/* Announcements Feed */}
            <div>
              <div className="flex items-center space-x-3 mb-6 px-2">
                <div className="w-1.5 h-6 bg-brand-vibrant rounded-full"></div>
                <h2 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-tight font-display italic">Mural de Anúncios</h2>
              </div>

              {isLoading && filteredAnnouncements.length === 0 ? (
                <LoadingSpinner />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <AnimatePresence mode="popLayout">
                    {filteredAnnouncements.length > 0 ? (
                      filteredAnnouncements.map((ann, index) => (
                        <motion.div 
                          key={ann.id} 
                          layout
                          initial={{ opacity: 0, scale: 0.95, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -20 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          <AnnouncementCard announcement={ann} onSelect={handleSelectAnnouncement} />
                        </motion.div>
                      ))
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="col-span-full text-center text-slate-400 dark:text-slate-500 py-20 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm"
                      >
                        <div className="bg-slate-50 dark:bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                          <FileText className="h-8 w-8 text-slate-300 dark:text-slate-600" />
                        </div>
                        <h3 className="text-lg font-black text-slate-800 dark:text-white uppercase tracking-tight">Nenhum anúncio</h3>
                        <p className="mt-1 text-xs font-medium">Tente mudar o filtro de igreja.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Widgets (Departments & Churches) */}
          <div className="lg:col-span-4 order-1 lg:order-2 space-y-8">
            
            {/* Departments Widget */}
            <section>
              <div className="flex items-center justify-between mb-4 px-2">
                <div className="flex items-center space-x-3">
                  <div className="w-1.5 h-6 bg-indigo-500 dark:bg-brand-gold rounded-full"></div>
                  <h2 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-tight font-display italic">Ministérios</h2>
                </div>
              </div>

              {isLoading && departments.length === 0 ? (
                <div className="flex space-x-4 overflow-hidden">
                  {[1,2,3].map(i => <div key={i} className="w-32 h-40 bg-slate-200 dark:bg-slate-800 rounded-3xl animate-pulse flex-shrink-0"></div>)}
                </div>
              ) : (
                <div className="flex flex-col md:flex-row md:overflow-x-auto pb-4 md:snap-x hide-scrollbar gap-3">
                  {departments.map((dept, idx) => (
                    <motion.div 
                      key={dept.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      onClick={() => handleSelectDepartment(dept)}
                      className={`w-full md:w-36 flex-shrink-0 bg-gradient-to-br ${dept.color} rounded-3xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer p-5 flex flex-col items-center justify-center text-white md:snap-start relative overflow-hidden group text-center`}
                    >
                      <div className="absolute -right-4 -top-4 w-16 h-16 bg-white/10 rounded-full blur-xl group-hover:bg-white/20 transition-all"></div>
                      <div className="relative z-10 flex flex-col items-center justify-center w-full">
                        <h3 className={`font-display italic leading-tight mb-2 tracking-tighter w-full ${dept.acronym.length >= 15 ? 'text-[10px] whitespace-nowrap' : dept.acronym.length >= 10 ? 'text-xs whitespace-nowrap' : 'text-sm whitespace-nowrap'}`}>{dept.acronym}</h3>
                        <p className="text-[8px] leading-tight opacity-90 line-clamp-3 font-bold uppercase tracking-widest">{dept.name}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </section>

            {/* Churches Widget */}
            <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 shadow-sm border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-1.5 h-6 bg-blue-500 dark:bg-brand-amber rounded-full"></div>
                  <h2 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-tight font-display italic">Igrejas</h2>
                </div>
                <div className="bg-blue-50 dark:bg-slate-800 px-2 py-1 rounded-lg flex items-center space-x-1">
                  <MapPin className="h-3 w-3 text-blue-500 dark:text-brand-amber" />
                  <span className="text-[9px] font-black text-blue-600 dark:text-brand-amber uppercase tracking-widest">{churches.length} Locais</span>
                </div>
              </div>

              {isLoading && churches.length === 0 ? (
                <div className="space-y-3">
                  {[1,2,3,4].map(i => <div key={i} className="h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl animate-pulse"></div>)}
                </div>
              ) : (
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 hide-scrollbar">
                  {churches.map((church, idx) => (
                    <motion.div 
                      key={church.id} 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      onClick={() => navigate(`/church/${church.id}`)}
                      className="flex items-center space-x-4 p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group border border-transparent hover:border-slate-100 dark:hover:border-slate-700"
                    >
                      <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 relative">
                        <img src={church.coverUrl} alt={church.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-grow min-w-0">
                        <h3 className="text-sm font-black text-slate-800 dark:text-slate-200 truncate group-hover:text-blue-600 dark:group-hover:text-brand-amber transition-colors">{church.name}</h3>
                        <p className="text-[9px] text-slate-400 dark:text-slate-500 truncate font-bold uppercase tracking-widest mt-0.5">{church.address.split(',')[0]}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-300 dark:text-slate-600 group-hover:text-blue-500 dark:group-hover:text-brand-amber transition-colors flex-shrink-0" />
                    </motion.div>
                  ))}
                </div>
              )}
            </section>

          </div>
        </div>
      </main>
      
      <PwaInstallButton />
    </div>
  );
};

export default HomePage;
