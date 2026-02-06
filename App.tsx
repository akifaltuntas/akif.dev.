
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, 
  Terminal, 
  Star, 
  ExternalLink, 
  Info, 
  X,
  Instagram,
  Send,
  MapPin,
  Edit3,
  Heart,
  Archive,
  PenTool,
  Sparkles,
  Loader2,
  BookOpen,
  User,
  Shield,
  EyeOff,
  ChevronRight
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import ProjectsDetail from './ProjectsDetail';
import ContactDetail from './ContactDetail';
import PersonalSpace from './PersonalSpace';

// API Key güvenli kontrolü
const API_KEY = typeof process !== 'undefined' ? process.env.API_KEY : '';
const ai = new GoogleGenAI({ apiKey: API_KEY || '' });

interface TimelineItemProps {
  age: string;
  title: string;
  subtitle: string;
  isLast?: boolean;
}

interface ProjectCardProps {
  title: string;
  description: string;
  status?: string;
  liveUrl?: string;
  onDetailClick?: () => void;
}

const VisitorNotebook = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState<'write' | 'archive'>('write');
  const [note, setNote] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [isLoadingSuggestion, setIsLoadingSuggestion] = useState(false);

  const [notes, setNotes] = useState([
    "React'te state yönetimini derinlemesine öğreniyorum.",
    "Arapça gramerine giriş yaptım.",
    "Figma'da auto-layout mantığını çözmeye çalışıyorum.",
    "Python ile veri analizi yapıyorum.",
    "Üç boyutlu modelleme dünyasına yeni bir adım attım.",
    "Algoritmaların çalışma mantığı üzerine kafa yoruyorum.",
    "Go dilinin eşzamanlılık yapısını inceliyorum."
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (note.trim()) {
      setNotes([note, ...notes]);
      setNote("");
      setIsSent(true);
      setTimeout(() => {
        setIsSent(false);
        setActiveTab('archive');
      }, 2000);
    }
  };

  const fetchLearningSuggestion = async (topic: string) => {
    if (!API_KEY) {
      setSuggestion("Öğrenme rehberi için bir API anahtarı gerekiyor.");
      return;
    }
    setSelectedNote(topic);
    setIsLoadingSuggestion(true);
    setSuggestion(null);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Bir ziyaretçim şu an "${topic}" öğreniyor. Ona bu konuyu daha etkili ve hızlı öğrenmesi için Türkçe, samimi, kısa (maksimum 3-4 cümle) bir tavsiye ver. Yanına 1-2 tane kaliteli YouTube kanalı veya anahtar kelime önerisi ekle. Bir 16 yaşındaki geliştirici (Akif) gibi konuş.`,
      });
      setSuggestion(response.text || "Şu an bağlantı kuramadım ama denemeye devam etmelisin!");
    } catch (error) {
      setSuggestion("Öğrenme rehberine şu an ulaşılamıyor, ama yolundan şaşma!");
    } finally {
      setIsLoadingSuggestion(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] bg-slate-950 flex flex-col items-center justify-center p-6"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px]" />
          </div>

          <button onClick={onClose} className="absolute top-8 right-8 p-3 text-slate-500 hover:text-[#D4AF37] transition-colors bg-slate-900/50 rounded-full border border-slate-800 z-50">
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-3xl w-full relative z-10">
            <div className="flex justify-center mb-12">
              <div className="bg-slate-900/50 p-1.5 rounded-2xl border border-slate-800 flex gap-2">
                <button 
                  onClick={() => setActiveTab('write')}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all text-sm font-bold ${activeTab === 'write' ? 'bg-[#D4AF37] text-slate-950 shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  <PenTool className="w-4 h-4" /> Not Bırak
                </button>
                <button 
                  onClick={() => setActiveTab('archive')}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all text-sm font-bold ${activeTab === 'archive' ? 'bg-[#D4AF37] text-slate-950 shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  <Archive className="w-4 h-4" /> Arşivi Karıştır
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'write' ? (
                <motion.div key="write" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex flex-col items-center">
                  <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">Şu an ne öğreniyorsun?</h2>
                    <p className="text-slate-400 italic font-light max-w-sm mx-auto">“Sessizce öğreniyoruz. Kimseye kanıtlama borcumuz olmadan.”</p>
                  </div>
                  <form onSubmit={handleSubmit} className="w-full max-w-lg relative">
                    <div className="flex items-center gap-4 p-3 bg-slate-900/60 border border-slate-700/50 rounded-3xl focus-within:border-[#D4AF37]/50 transition-all shadow-2xl">
                      <span className="pl-4 text-slate-500 whitespace-nowrap font-medium">Ben şu ara</span>
                      <input type="text" value={note} onChange={(e) => setNote(e.target.value)} placeholder="______" className="bg-transparent border-none focus:ring-0 text-cyan-400 placeholder-slate-700 w-full text-lg" />
                      <button type="submit" className="p-4 bg-[#D4AF37] text-slate-950 rounded-2xl hover:bg-amber-600 transition-all shadow-xl"><Send className="w-5 h-5" /></button>
                    </div>
                    {isSent && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute -bottom-12 left-0 right-0 text-center text-cyan-400 text-xs font-bold uppercase">Arşive eklendi...</motion.div>}
                  </form>
                </motion.div>
              ) : (
                <motion.div key="archive" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-white mb-1">Öğrenme Arşivi</h2>
                    <p className="text-slate-500 text-xs italic font-light">Tavsiye almak için bir nota dokun.</p>
                  </div>
                  <div className="bg-slate-900/30 border border-slate-800/60 rounded-[2.5rem] p-8 h-[400px] overflow-y-auto space-y-4 scrollbar-hide backdrop-blur-md relative">
                    {notes.map((n, i) => (
                      <motion.div 
                        key={i} 
                        onClick={() => fetchLearningSuggestion(n)}
                        className="p-5 bg-slate-950/40 rounded-2xl border border-slate-800/30 text-slate-300 font-light text-sm hover:border-cyan-400/50 hover:bg-slate-900/60 transition-all group cursor-pointer flex items-center justify-between"
                      >
                        <p>Ben şu ara <span className="text-cyan-400/90 font-medium italic group-hover:text-cyan-400">"{n}"</span> öğreniyorum.</p>
                        <Sparkles className="w-4 h-4 text-slate-600 group-hover:text-[#D4AF37] transition-colors" />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {(isLoadingSuggestion || suggestion) && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="fixed bottom-10 left-1/2 -translate-x-1/2 w-[90%] max-w-lg z-[160]"
              >
                <div className="bg-slate-900/95 border border-[#D4AF37]/40 p-8 rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl relative">
                  <button onClick={() => { setSuggestion(null); setIsLoadingSuggestion(false); }} className="absolute top-4 right-4 text-slate-500 hover:text-white"><X className="w-5 h-5" /></button>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/20"><BookOpen className="text-[#D4AF37] w-5 h-5" /></div>
                    <span className="text-xs text-[#D4AF37] font-bold tracking-widest uppercase">Akif'in Önerisi</span>
                  </div>
                  
                  {isLoadingSuggestion ? (
                    <div className="flex flex-col items-center py-6 gap-3">
                      <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
                      <p className="text-slate-400 text-xs animate-pulse italic">Rehber hazırlanıyor, biraz bekle...</p>
                    </div>
                  ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="prose prose-invert">
                      <p className="text-slate-200 text-base leading-relaxed font-light italic">"{suggestion}"</p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const LearningMap = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const options = [
    { id: 'start', label: 'Başlıyorum', color: 'bg-emerald-500', shadow: 'shadow-emerald-500/40', message: 'En zor adım atıldı. İlk kıvılcım her zaman en değerlisidir.' },
    { id: 'try', label: 'Deniyorum', color: 'bg-blue-500', shadow: 'shadow-blue-500/40', message: 'Hata yapmaktan korkmadığın her an, aslında ustalaşıyorsun.' },
    { id: 'stuck', label: 'Takıldım', color: 'bg-rose-500', shadow: 'shadow-rose-500/40', message: 'Durmak geri gitmek değildir; bazen zihin sadece demlenmek ister.' },
    { id: 'continue', label: 'Devam ediyorum', color: 'bg-cyan-500', shadow: 'shadow-cyan-500/40', message: 'Süreklilik en büyük güçtür. Kendi ritminde parlıyorsun.' }
  ];
  const activeOption = options.find(o => o.id === selected);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} className="fixed inset-0 z-[150] bg-slate-950 flex flex-col items-center justify-center p-6 overflow-hidden">
          <button onClick={onClose} className="absolute top-8 right-8 p-3 text-slate-500 hover:text-[#D4AF37] transition-colors bg-slate-900/50 rounded-full border border-slate-800 z-50"><X className="w-6 h-6" /></button>
          <div className="max-w-5xl w-full relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-24">Şu Anda Neredesin?</h2>
            <div className="grid grid-cols-4 gap-8 mb-24">
              {options.map((opt) => (
                <motion.button key={opt.id} onClick={() => setSelected(opt.id)} whileHover={{ scale: 1.05, y: -8 }} className={`relative p-10 rounded-[2.5rem] border transition-all duration-700 group flex flex-col items-center justify-center gap-8 ${selected === opt.id ? 'bg-slate-900 border-white/20 shadow-2xl' : 'bg-slate-900/20 border-white/5 hover:border-white/10'}`}>
                  <div className={`w-5 h-5 rounded-full ${opt.color} ${opt.shadow} shadow-[0_0_30px] transition-all duration-700 ${selected === opt.id ? 'scale-[2] ring-8 ring-white/5' : 'group-hover:scale-150'}`} />
                  <span className={`text-xl font-light tracking-wide ${selected === opt.id ? 'text-white font-medium' : 'text-slate-500 group-hover:text-slate-300'}`}>{opt.label}</span>
                  {selected === opt.id && <motion.div layoutId="activeGlow" className={`absolute inset-0 rounded-[2.5rem] ring-1 ring-white/20 blur-xl opacity-20 ${opt.color}`} />}
                </motion.button>
              ))}
            </div>
            <div className="h-20 flex flex-col items-center justify-center">
              {activeOption && <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-[#D4AF37] text-xl italic font-light text-center max-w-2xl">"{activeOption.message}"</motion.p>}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const BackgroundParticles = ({ isFocusMode }: { isFocusMode: boolean }) => {
  if (isFocusMode) return null;
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {[...Array(30)].map((_, i) => (
        <motion.div key={i} className="absolute rounded-full bg-blue-400/10" style={{ width: Math.random() * 2 + 1 + 'px', height: Math.random() * 2 + 1 + 'px', top: Math.random() * 100 + '%', left: Math.random() * 100 + '%', }} animate={{ opacity: [0.1, 0.4, 0.1], }} transition={{ duration: Math.random() * 5 + 5, repeat: Infinity, ease: "linear" }} />
      ))}
    </div>
  );
};

const Navbar = ({ onAboutClick, onProjectsClick, onContactClick, onPersonalClick, view }: { onAboutClick: () => void, onProjectsClick: () => void, onContactClick: () => void, onPersonalClick: () => void, view: string }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled || view !== 'home' ? 'py-4 bg-slate-950/80 blur-nav shadow-lg border-b border-slate-900/50' : 'py-6 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-2xl font-bold text-[#D4AF37] tracking-tight cursor-pointer" onClick={() => window.location.reload()}>Akif<span className="text-white">.dev</span></motion.div>
        <div className="flex items-center space-x-8">
          <button onClick={onAboutClick} className="text-slate-300 hover:text-[#D4AF37] transition-colors text-sm font-medium">Hakkımda</button>
          <button onClick={onProjectsClick} className="text-slate-300 hover:text-[#D4AF37] transition-colors text-sm font-medium">Projeler</button>
          <button 
            onClick={onPersonalClick} 
            className="flex items-center gap-2 text-white transition-all text-xs font-bold px-6 py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 border border-violet-400/30 group btn-purple-glow"
          >
            <User className="w-4 h-4 group-hover:scale-110 transition-transform" /> Kişisel Alan
          </button>
          <button onClick={onContactClick} className="text-slate-300 hover:text-[#D4AF37] transition-colors text-sm font-medium">İletişim</button>
        </div>
      </div>
    </nav>
  );
};

const LearningModeSphere = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="relative flex flex-col items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 z-10">
        <div className="flex items-center justify-center gap-3 mb-1"><div className="w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_15px_#22d3ee] animate-pulse" /><h3 className="text-3xl font-bold text-cyan-400 tracking-tight" style={{ textShadow: '0 0 20px rgba(34, 211, 238, 0.4)' }}>Learning Mode</h3></div>
        <p className="text-slate-300 text-lg font-light tracking-wide italic">Öğrenmeye odaklıyım</p>
      </motion.div>
      <motion.div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className="relative w-[450px] h-[450px] flex items-center justify-center cursor-pointer group">
        <div className="absolute w-[140%] h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-20 opacity-60" /><div className="absolute w-[120%] h-[2px] bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent z-10 blur-sm" /><motion.div animate={{ opacity: [0.6, 1, 0.6], scale: isHovered ? 1.2 : 1 }} transition={{ duration: 4, repeat: Infinity }} className="absolute w-16 h-16 bg-cyan-400 rounded-full blur-[35px] z-10" /><div className="absolute w-4 h-4 bg-white rounded-full blur-[2px] z-30 shadow-[0_0_20px_#fff]" /><div className="absolute w-[90%] h-[90%] bg-cyan-500/5 rounded-full blur-[100px]" /><motion.svg viewBox="0 0 100 100" className="w-full h-full relative z-10 opacity-80" animate={{ rotate: 360 }} transition={{ duration: isHovered ? 150 : 80, repeat: Infinity, ease: "linear" }}>
          {[...Array(12)].map((_, i) => (<ellipse key={`long-${i}`} cx="50" cy="50" rx={46} ry={Math.abs(46 * Math.cos((i * Math.PI) / 12))} fill="none" stroke="#22d3ee" strokeWidth="0.12" strokeOpacity="0.3" transform={`rotate(${i * 15}, 50, 50)`} />))}
          {[...Array(8)].map((_, i) => (<circle key={`lat-${i}`} cx="50" cy="50" r={46 * Math.sin(((i + 1) * Math.PI) / 9)} fill="none" stroke="#22d3ee" strokeWidth="0.12" strokeOpacity="0.3" />))}
        </motion.svg>
      </motion.div>
    </div>
  );
};

const StoryModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-8 backdrop-blur-xl bg-slate-950/90">
          <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="max-w-3xl w-full bg-slate-900 border border-[#D4AF37]/20 rounded-3xl p-12 relative overflow-y-auto max-h-[90vh] shadow-2xl">
            <button onClick={onClose} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-[#D4AF37] transition-colors"><X className="w-8 h-8" /></button>
            <div className="mb-8"><h2 className="text-5xl font-bold text-white mb-2">Hikayem</h2><div className="w-20 h-1.5 bg-[#D4AF37] rounded-full shadow-[0_0_10px_#D4AF37]" /></div>
            <div className="prose prose-invert max-w-none text-slate-300 space-y-6 text-lg font-light leading-relaxed"><p>Ben disiplinle büyümüş ve vazgeçmemeyi erken yaşta öğrenmiş bir öğrenciyim...</p><p>9. sınıfta web geliştirme yolculuğuma ilk adımı attım...</p></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const TimelineItem: React.FC<TimelineItemProps> = ({ age, title, subtitle, isLast = false }) => {
  return (
    <div className="flex flex-col items-center relative min-w-[240px] flex-1 group py-4">
      {!isLast && <div className="absolute top-12 left-[60%] w-[80%] h-[1px] bg-gradient-to-r from-amber-500/50 to-transparent block" />}
      <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="w-20 h-20 rounded-2xl border border-amber-500/20 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm z-10 mb-6 group-hover:border-[#D4AF37]/60 transition-all duration-300 shadow-xl"><Star className="text-[#D4AF37] w-8 h-8" /></motion.div>
      <div className="text-center px-4"><h4 className="text-[#D4AF37] font-bold text-xl mb-2">{title}</h4><p className="text-slate-400 text-sm max-w-[200px]">{subtitle}</p></div>
    </div>
  );
};

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, status, liveUrl, onDetailClick }) => {
  return (
    <motion.div whileHover={{ y: -8 }} className="bg-slate-900/40 border border-slate-800/60 rounded-3xl p-8 transition-all duration-500 backdrop-blur-md flex flex-col h-full group card-glow">
      <div className="flex justify-between items-start mb-8"><div className="p-4 bg-amber-500/5 rounded-2xl border border-amber-500/10 group-hover:border-[#D4AF37]/30 transition-colors"><Terminal className="text-[#D4AF37] w-7 h-7" /></div>{status && <span className="px-4 py-1.5 bg-amber-500/10 text-[#D4AF37] text-xs font-bold rounded-full border border-amber-500/20">{status}</span>}</div>
      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#D4AF37] transition-colors">{title}</h3>
      <p className="text-slate-400 text-base mb-10 flex-grow leading-relaxed font-light">{description}</p>
      <div className="flex gap-4">
        {liveUrl && <motion.a href={liveUrl} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.02 }} className="flex-1 bg-[#D4AF37] text-slate-950 font-bold py-3.5 px-6 rounded-2xl transition-all text-sm flex items-center justify-center gap-2 btn-gold-glow">Canlı Demo <ExternalLink className="w-4 h-4" /></motion.a>}
        <button onClick={onDetailClick} className="flex-1 border border-slate-700 hover:border-slate-500 text-slate-300 py-3.5 px-6 rounded-2xl transition-all text-sm flex items-center justify-center gap-2">Detaylar <Info className="w-4 h-4" /></button>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [isNotebookOpen, setIsNotebookOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [view, setView] = useState<'home' | 'projects-detail' | 'contact-detail' | 'personal-space'>('home');
  const sentences = useMemo(() => ["Hızdan ziyade doğru yöne gitmeye inanıyorum.", "Bugün sadece tek bir satır kod yazdım ama o satırı anladım.", "Hata yapmak, yolda olduğumun en dürüst kanıtı."], []);
  const [sentenceIndex, setSentenceIndex] = useState(0);

  useEffect(() => { const interval = setInterval(() => setSentenceIndex((prev) => (prev + 1) % sentences.length), 8000); return () => clearInterval(interval); }, [sentences]);
  useEffect(() => { window.scrollTo(0, 0); }, [view]);

  return (
    <div className={`relative min-h-screen ${isFocusMode ? 'bg-black' : 'bg-[#020617]'} text-slate-50 selection:bg-[#D4AF37]/30 selection:text-white transition-colors duration-1000`}>
      <BackgroundParticles isFocusMode={isFocusMode} />
      {!isFocusMode && (
        <Navbar 
          onAboutClick={() => { setView('home'); setIsStoryOpen(true); }} 
          onProjectsClick={() => setView('projects-detail')} 
          onContactClick={() => setView('contact-detail')}
          onPersonalClick={() => setView('personal-space')}
          view={view} 
        />
      )}
      <StoryModal isOpen={isStoryOpen} onClose={() => setIsStoryOpen(false)} />
      <VisitorNotebook isOpen={isNotebookOpen} onClose={() => setIsNotebookOpen(false)} />
      <LearningMap isOpen={isMapOpen} onClose={() => setIsMapOpen(false)} />

      <AnimatePresence mode="wait">
        {view === 'home' && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <main>
              <section className="relative min-h-screen flex items-center pt-24 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto grid grid-cols-2 gap-16 items-center w-full">
                  <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
                    <div className="flex items-center gap-3 mb-6"><div className="flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full"><span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" /><span className="text-[10px] text-[#D4AF37] font-bold tracking-widest uppercase">ÖĞRENİYORUM</span></div></div>
                    <h1 className="text-8xl font-bold mb-8 leading-[1.1] tracking-tight">Merhaba, Ben <br /><span className="text-[#D4AF37] gold-glow inline-block mt-2">Akif</span></h1>
                    <p className="text-2xl text-slate-400 mb-12 max-w-lg leading-relaxed font-light italic border-l-2 border-[#D4AF37]/30 pl-6">"Öğrenerek ve üreterek ilerliyorum."</p>
                    <div className="flex flex-wrap gap-5">
                      <motion.button onClick={() => setIsStoryOpen(true)} whileHover={{ scale: 1.05 }} className="bg-[#D4AF37] text-slate-950 px-10 py-5 rounded-2xl font-extrabold shadow-xl text-lg btn-gold-glow">Hikayemi Oku</motion.button>
                      <motion.button onClick={() => setView('projects-detail')} whileHover={{ scale: 1.05 }} className="border border-slate-700 px-10 py-5 rounded-2xl font-bold text-slate-300 text-lg btn-gold-glow animate-gold-glow transition-all">Projelerim</motion.button>
                    </div>
                    <div className="mt-16 h-12"><AnimatePresence mode="wait"><motion.p key={sentenceIndex} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 15 }} transition={{ duration: 1.2 }} className="text-cyan-300 italic font-light text-sm uppercase tracking-wide">{sentences[sentenceIndex]}</motion.p></AnimatePresence></div>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5 }} className="flex justify-end"><LearningModeSphere /></motion.div>
                </div>
              </section>

              <section className="py-32 px-6 bg-slate-950/20 relative">
                <div className="max-w-7xl mx-auto">
                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="mb-20 text-center"><h2 className="text-4xl font-bold text-white mb-4">Yolculuğum</h2><div className="w-24 h-1.5 bg-[#D4AF37] mx-auto rounded-full" /></motion.div>
                  <div className="flex flex-row justify-between gap-12 pb-12 px-4">
                    <TimelineItem age="10" title="10 Yaş" subtitle="Kur'an-ı Kerim ezberine başladım." />
                    <TimelineItem age="14" title="14 Yaş" subtitle="Hafızlık eğitimimi başarıyla tamamladım." />
                    <TimelineItem age="9" title="9. Sınıf" subtitle="İlk web geliştirme adımları." />
                    <TimelineItem age="10" title="10. Sınıf" subtitle="Kendi projelerimi hayata geçirdim." isLast />
                  </div>
                </div>
              </section>

              <section className="py-24 px-6 relative overflow-hidden">
                <div className="max-w-7xl mx-auto">
                  <motion.div 
                    onClick={() => setView('personal-space')}
                    whileHover={{ scale: 1.02 }}
                    className="relative p-20 bg-gradient-to-br from-violet-950/40 via-slate-900/60 to-indigo-950/40 border border-violet-500/40 rounded-[3.5rem] cursor-pointer group overflow-hidden personal-portal-pulse"
                  >
                    <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                       <Shield className="w-96 h-96 text-violet-400" />
                    </div>
                    <div className="relative z-10 grid grid-cols-2 gap-12 items-center">
                      <div>
                        <div className="flex items-center gap-3 mb-8">
                           <div className="px-5 py-2 bg-violet-500/20 border border-violet-500/50 rounded-full text-[10px] text-violet-300 font-bold tracking-[0.4em] uppercase">
                              ÖZEL BÖLGE GİRİŞİ
                           </div>
                           <motion.div 
                             animate={{ rotate: 360 }} 
                             transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                           >
                             <EyeOff className="text-violet-400 w-5 h-5" />
                           </motion.div>
                        </div>
                        <h2 className="text-7xl font-bold text-white mb-8">Burası Sadece <span className="text-violet-400 underline decoration-violet-500/30 underline-offset-8">Senin.</span></h2>
                        <p className="text-2xl text-slate-300 font-light leading-relaxed mb-12 max-w-xl italic">
                          "Dış dünyanın gürültüsünü arkanda bırak. İz bırakmadan düşün, planla ve sadece kendinle kal."
                        </p>
                        <button className="flex items-center gap-5 text-violet-300 font-bold text-xl group-hover:text-white transition-all">
                           Kapıyı Arala <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                        </button>
                      </div>
                      <div className="flex justify-end relative">
                         <div className="w-80 h-80 rounded-full border-2 border-violet-500/20 flex items-center justify-center relative">
                            <motion.div 
                              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                              transition={{ duration: 4, repeat: Infinity }}
                              className="absolute inset-0 bg-violet-500/10 rounded-full blur-3xl"
                            />
                            <div className="w-56 h-56 rounded-full border border-violet-500/40 flex items-center justify-center bg-slate-900/40 backdrop-blur-xl">
                               <User className="text-violet-400 w-24 h-24 group-hover:scale-110 transition-transform duration-500" />
                            </div>
                         </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </section>

              <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                  <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, y: 0 }} className="mb-20 flex flex-row items-end justify-between gap-6">
                    <div><h2 className="text-4xl font-bold text-white mb-4">Projelerim</h2><div className="w-24 h-1.5 bg-[#D4AF37] rounded-full" /></div>
                    <button onClick={() => setView('projects-detail')} className="text-slate-500 hover:text-[#D4AF37] italic underline underline-offset-8">Tüm Detayları Gör</button>
                  </motion.div>
                  <div className="grid grid-cols-2 gap-10">
                    <ProjectCard title="AI Prompt Studio" description="Yapay zeka komut şablonlarını paylaştığım ilk büyük projem." liveUrl="https://mehmetakifaltuntas61-arch.github.io/ai-image-prompts/" status="Tamamlandı" onDetailClick={() => setView('projects-detail')} />
                    <ProjectCard title="Kişisel Web Sitem" description="Öğrenme yolculuğumu belgelediğim yaşayan dijital portfolyom." status="Geliştiriliyor" onDetailClick={() => setView('projects-detail')} />
                  </div>
                </div>
              </section>

              <section className="py-32 px-6 bg-slate-950/40">
                <div className="max-w-7xl mx-auto grid grid-cols-2 gap-12">
                  <motion.div onClick={() => setIsNotebookOpen(true)} className="p-10 bg-slate-900/30 border border-slate-800 rounded-[2.5rem] flex flex-col items-center text-center group hover:border-cyan-500/20 transition-all cursor-pointer card-glow">
                    <div className="w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-8 border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-all"><Edit3 className="text-cyan-400 w-8 h-8" /></div>
                    <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors">Ziyaretçi Notları</h3>
                    <p className="text-slate-400 font-light mb-10 max-w-xs italic leading-relaxed">Başkalarının ne öğrendiğini gör ve rehberlik al.</p>
                    <button className="flex items-center gap-2 text-[#D4AF37] font-bold group-hover:gap-4 transition-all">Notlara Git →</button>
                  </motion.div>
                  <motion.div onClick={() => setIsMapOpen(true)} className="p-10 bg-slate-900/30 border border-slate-800 rounded-[2.5rem] flex flex-col items-center text-center group hover:border-amber-500/20 transition-all cursor-pointer card-glow">
                    <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-8 border border-amber-500/20 group-hover:bg-amber-500/20 transition-all"><MapPin className="text-[#D4AF37] w-8 h-8" /></div>
                    <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-[#D4AF37] transition-colors">Öğrenme Haritası</h3>
                    <p className="text-slate-400 font-light mb-10 max-w-xs italic leading-relaxed">Herkes aynı yerde olmak zorunda değil.</p>
                    <button className="flex items-center gap-2 text-[#D4AF37] font-bold group-hover:gap-4 transition-all">Kendini Konumlandır →</button>
                  </motion.div>
                </div>
              </section>

              <section id="contact" className="py-32 px-6 border-t border-slate-900/50">
                <div className="max-w-3xl mx-auto text-center">
                  <h2 className="text-4xl font-bold mb-6 text-white">Bağlantıda Kalalım</h2>
                  <p className="text-slate-400 mb-16 text-lg font-light italic">"Yavaşça büyüyen bu dijital alanda bana katılın."</p>
                  <button onClick={() => setView('contact-detail')} className="inline-flex items-center gap-4 bg-[#D4AF37] text-slate-950 font-bold px-12 py-6 rounded-3xl hover:bg-amber-600 transition-all shadow-2xl btn-gold-glow">
                    İletişime Geç <ExternalLink className="w-5 h-5" />
                  </button>
                </div>
              </section>
            </main>
          </motion.div>
        )}
        {view === 'projects-detail' && <ProjectsDetail onBack={() => setView('home')} />}
        {view === 'contact-detail' && <ContactDetail onBack={() => setView('home')} />}
        {view === 'personal-space' && (
          <PersonalSpace 
            onBack={() => setView('home')} 
            isFocusMode={isFocusMode} 
            setIsFocusMode={setIsFocusMode} 
          />
        )}
      </AnimatePresence>

      {!isFocusMode && (
        <footer className="py-16 border-t border-slate-900 px-6 text-center text-slate-500 text-sm relative">
          <p className="font-medium text-slate-400 mb-2">Akif.dev - Kişisel Gelişim Arşivi</p>
          <div className="flex items-center justify-center gap-2 text-[10px] text-slate-600 uppercase tracking-widest font-bold"><Heart className="w-3 h-3 text-[#D4AF37]/40" /><span>Özenle Hazırlandı</span></div>
        </footer>
      )}
    </div>
  );
}
