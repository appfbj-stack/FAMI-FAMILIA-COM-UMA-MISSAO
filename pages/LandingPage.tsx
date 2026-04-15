import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  Heart, 
  Users, 
  Building2, 
  Zap, 
  ChevronDown,
  Globe,
  MessageCircle,
  Calendar,
  ShieldCheck
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef} className="bg-slate-950 text-white selection:bg-brand-vibrant selection:text-white overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-[100] px-6 py-8 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-3"
        >
          <div className="w-10 h-10 bg-brand-vibrant rounded-xl flex items-center justify-center shadow-lg shadow-brand-vibrant/20">
            <Sparkles className="text-white h-6 w-6" />
          </div>
          <span className="font-display text-2xl tracking-tighter uppercase italic">OBPC Regional</span>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-8"
        >
          <button 
            onClick={() => navigate('/mural')}
            className="hidden md:block text-[10px] font-black uppercase tracking-[0.3em] hover:text-brand-gold transition-colors"
          >
            Mural de Anúncios
          </button>
          <button 
            onClick={() => navigate('/mural')}
            className="bg-white text-slate-950 px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-brand-gold transition-all transform hover:-translate-y-1 active:scale-95"
          >
            Entrar no App
          </button>
        </motion.div>
      </nav>

      {/* Hero Section - Split Layout / High Impact */}
      <section className="relative min-h-screen flex flex-col lg:flex-row items-stretch">
        {/* Left Side: Content */}
        <div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-24 py-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <span className="inline-block bg-brand-vibrant/10 border border-brand-vibrant/20 text-brand-vibrant px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.4em]">
              Regional Sorocaba
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[18vw] lg:text-[10vw] font-display leading-[0.8] tracking-tighter uppercase italic mb-8"
          >
            Igreja <br />
            <span className="text-brand-gold">O Brasil</span> <br />
            Para Cristo
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="max-w-xl text-slate-400 text-lg md:text-xl font-medium leading-relaxed mb-12"
          >
            Não somos apenas uma igreja, somos uma família com uma missão global. 
            Conectando corações, transformando vidas e espalhando a luz de Cristo em Sorocaba e região.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <button 
              onClick={() => navigate('/mural')}
              className="w-full sm:w-auto bg-brand-vibrant hover:bg-orange-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center space-x-3 shadow-2xl shadow-brand-vibrant/20 transform hover:-translate-y-1"
            >
              <span>Explorar o Mural</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button 
              onClick={() => document.getElementById('history')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-white/10 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center space-x-3"
            >
              <span>Nossa História</span>
            </button>
          </motion.div>
        </div>

        {/* Right Side: Immersive Visuals */}
        <div className="flex-1 relative min-h-[50vh] lg:min-h-screen overflow-hidden">
          <motion.div 
            style={{ 
              scale: useTransform(smoothProgress, [0, 0.5], [1.2, 1]),
              y: useTransform(smoothProgress, [0, 0.5], [0, 50])
            }}
            className="absolute inset-0"
          >
            <img 
              src="https://picsum.photos/seed/obpc-landing/1200/1600" 
              alt="Church Experience" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/20 to-transparent lg:block hidden"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent lg:hidden block"></div>
          </motion.div>
          
          {/* Floating Elements */}
          <motion.div 
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 right-1/4 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-2xl z-20 hidden md:block"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-brand-gold rounded-2xl flex items-center justify-center">
                <Users className="text-slate-950 h-6 w-6" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-brand-gold">Comunidade</p>
                <p className="text-sm font-bold">+5.000 Membros</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 cursor-pointer"
          onClick={() => document.getElementById('history')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <ChevronDown className="text-white/30 h-8 w-8" />
        </motion.div>
      </section>

      {/* History / Mission Section - Brutalist Style */}
      <section id="history" className="py-32 bg-white text-slate-950 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-[12vw] lg:text-[8vw] font-display leading-[0.8] tracking-tighter uppercase italic mb-12">
                Nossa <br />
                <span className="text-brand-vibrant">Missão</span>
              </h2>
              <div className="space-y-8">
                <div className="flex items-start space-x-6">
                  <div className="text-4xl font-display text-slate-200 italic">01</div>
                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">Evangelismo Global</h3>
                    <p className="text-slate-500 font-medium leading-relaxed">Levar a mensagem de salvação a todos os cantos da nossa região e além.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="text-4xl font-display text-slate-200 italic">02</div>
                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">Cuidado Pastoral</h3>
                    <p className="text-slate-500 font-medium leading-relaxed">Acolher cada pessoa como um membro precioso da nossa família espiritual.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="text-4xl font-display text-slate-200 italic">03</div>
                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">Impacto Social</h3>
                    <p className="text-slate-500 font-medium leading-relaxed">Transformar a realidade social através de projetos de amor e serviço ao próximo.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-[4rem] overflow-hidden shadow-2xl rotate-3">
                <img 
                  src="https://picsum.photos/seed/obpc-mission/800/800" 
                  alt="Mission" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-brand-gold p-12 rounded-[3rem] shadow-2xl -rotate-6 hidden md:block">
                <Zap className="text-slate-950 h-12 w-12 mb-4" />
                <p className="text-3xl font-display italic text-slate-950">Energia <br /> Espiritual</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dynamic Grid Section - Events & Photos */}
      <section className="py-32 bg-slate-950 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-[10px] font-black text-brand-gold uppercase tracking-[0.5em] mb-4 block"
            >
              Momentos Inesquecíveis
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-display text-white tracking-tighter uppercase italic"
            >
              Vida em <span className="text-brand-vibrant">Comunidade</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Congressos', img: 'https://picsum.photos/seed/event1/600/800', size: 'lg:col-span-2 lg:row-span-2' },
              { title: 'Cruzadas', img: 'https://picsum.photos/seed/event2/600/400', size: '' },
              { title: 'Jovens', img: 'https://picsum.photos/seed/event3/600/400', size: '' },
              { title: 'Ação Social', img: 'https://picsum.photos/seed/event4/600/400', size: 'lg:col-span-2' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative group overflow-hidden rounded-[2.5rem] cursor-pointer ${item.size}`}
              >
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent p-10 flex flex-col justify-end">
                  <h3 className="text-3xl font-display italic text-white uppercase tracking-tighter">{item.title}</h3>
                  <div className="h-1 w-0 bg-brand-vibrant group-hover:w-full transition-all duration-500 mt-2"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features / Why Us - Hardware Style */}
      <section className="py-32 bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Globe, title: 'Presença Regional', desc: 'Mais de 17 igrejas conectadas em Sorocaba e região.' },
              { icon: MessageCircle, title: 'Comunicação Ativa', desc: 'Mural de anúncios em tempo real para todos os membros.' },
              { icon: ShieldCheck, title: 'Liderança Sólida', desc: 'Pastores e líderes comprometidos com a palavra de Deus.' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-950 border border-white/5 p-12 rounded-[3.5rem] hover:border-brand-gold/30 transition-all group"
              >
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-gold group-hover:text-slate-950 transition-all">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">{feature.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Immersive */}
      <section className="py-48 relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-brand-vibrant rounded-full blur-[200px]"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-[15vw] md:text-[10vw] font-display leading-none tracking-tighter uppercase italic mb-12"
          >
            Faça Parte <br />
            <span className="text-brand-gold">Dessa Família</span>
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8"
          >
            <button 
              onClick={() => navigate('/mural')}
              className="group bg-white text-slate-950 px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-sm transition-all hover:bg-brand-gold transform hover:-translate-y-2 flex items-center space-x-4"
            >
              <span>Acessar o Aplicativo</span>
              <Zap className="h-5 w-5 text-brand-vibrant group-hover:text-slate-950" />
            </button>
            <div className="flex -space-x-4">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="w-14 h-14 rounded-full border-4 border-slate-950 overflow-hidden shadow-2xl">
                  <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="User" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              ))}
              <div className="w-14 h-14 rounded-full bg-brand-gold border-4 border-slate-950 flex items-center justify-center text-slate-950 font-black text-xs">
                +5k
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-12 border-t border-white/5 bg-slate-950">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-brand-vibrant rounded-lg flex items-center justify-center">
              <Sparkles className="text-white h-5 w-5" />
            </div>
            <span className="font-display text-xl tracking-tighter uppercase italic">OBPC Regional</span>
          </div>
          <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">© 2024 Igreja O Brasil Para Cristo - Regional Sorocaba</p>
          <div className="flex space-x-8">
            <Globe className="h-5 w-5 text-slate-600 hover:text-white cursor-pointer transition-colors" />
            <MessageCircle className="h-5 w-5 text-slate-600 hover:text-white cursor-pointer transition-colors" />
            <Calendar className="h-5 w-5 text-slate-600 hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;
