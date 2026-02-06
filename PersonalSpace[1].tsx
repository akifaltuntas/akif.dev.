
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Clock, CheckCircle2, Map, Zap, MessageSquare, 
  ShieldCheck, X, Trash2, Calendar, Shield, Rocket, 
  Github as GithubIcon, Globe, Terminal as TerminalIcon, 
  ChevronRight, ExternalLink, ListChecks, ArrowUpRight
} from 'lucide-react';

interface NoteEntry {
  id: string;
  text: string;
  date: string;
}

interface PersonalSpaceProps {
  onBack: () => void;
  isFocusMode: boolean;
  setIsFocusMode: (val: boolean) => void;
}

const PersonalSpace: React.FC<PersonalSpaceProps> = ({ onBack, isFocusMode, setIsFocusMode }) => {
  const [timer, setTimer] = useState<number | null>(null);
  const [timerActive, setTimerActive] = useState(false);
  const [checkedSteps, setCheckedSteps] = useState<number[]>([]);
  const [roadmap, setRoadmap] = useState({ learn: '', struggle: '', nextStep: '' });
  const [notesHistory, setNotesHistory] = useState<NoteEntry[]>([]);
  const [currentNote, setCurrentNote] = useState('');

  useEffect(() => {
    const savedRoadmap = localStorage.getItem('akif_dev_roadmap');
    if (savedRoadmap) setRoadmap(JSON.parse(savedRoadmap));
    const savedNotes = localStorage.getItem('akif_dev_personal_notes');
    if (savedNotes) setNotesHistory(JSON.parse(savedNotes));
    const savedSteps = localStorage.getItem('akif_dev_publish_steps');
    if (savedSteps) setCheckedSteps(JSON.parse(savedSteps));
  }, []);

  const toggleStep = (id: number) => {
    const newSteps = checkedSteps.includes(id) 
      ? checkedSteps.filter(s => s !== id) 
      : [...checkedSteps, id];
    setCheckedSteps(newSteps);
    localStorage.setItem('akif_dev_publish_steps', JSON.stringify(newSteps));
  };

  const saveRoadmap = (key: string, value: string) => {
    const newRoadmap = { ...roadmap, [key]: value };
    setRoadmap(newRoadmap);
    localStorage.setItem('akif_dev_roadmap', JSON.stringify(newRoadmap));
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentNote.trim()) return;
    const newNote: NoteEntry = {
      id: Date.now().toString(),
      text: currentNote,
      date: new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    };
    const updatedNotes = [newNote, ...notesHistory];
    setNotesHistory(updatedNotes);
    localStorage.setItem('akif_dev_personal_notes', JSON.stringify(updatedNotes));
    setCurrentNote('');
  };

  const deleteNote = (id: string) => {
    const updatedNotes = notesHistory.filter(n => n.id !== id);
    setNotesHistory(updatedNotes);
    localStorage.setItem('akif_dev_personal_notes', JSON.stringify(updatedNotes));
  };

  useEffect(() => {
    let interval: any;
    if (timerActive && timer !== null && timer > 0) {
      interval = setInterval(() => setTimer(prev => (prev !== null ? prev - 1 : null)), 1000);
    } else if (timer === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timer]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (isFocusMode) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} className="text-white text-2xl font-light tracking-[0.5em] uppercase mb-12">Buradayım.</motion.p>
        <button onClick={() => setIsFocusMode(false)} className="text-slate-600 hover:text-white transition-colors text-sm border border-slate-900 px-6 py-2 rounded-full hover:border-white transition-all duration-300">Odak Modundan Çık</button>
      </motion.div>
    );
  }

  const publishSteps = [
    { id: 1, title: "GitHub Hesabı & Repo", desc: "GitHub'da 'akif-dev' adında yeni bir Public repository oluştur." },
    { id: 2, title: "Dosyaları Yükle", desc: "Bu projedeki tüm kod dosyalarını GitHub reposuna sürükleyip bırak ve kaydet." },
    { id: 3, title: "Vercel Bağlantısı", desc: "Vercel.com'a GitHub ile gir ve oluşturduğun repoyu seç." },
    { id: 4, title: "Deploy Et", desc: "Deploy butonuna bas ve saniyeler içinde siten yayına girsin." },
    { id: 5, title: "Kontrol", desc: "Sitenin mobil ve PC görünümünü test et!" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-32 pb-24 px-6 max-w-5xl mx-auto selection:bg-violet-500/30"
    >
      <button onClick={onBack} className="flex items-center gap-3 text-slate-500 hover:text-violet-400 transition-all mb-12 group">
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Geri Dön</span>
      </button>

      <div className="mb-20 text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 opacity-10"><Shield className="w-24 h-24 text-violet-500" /></div>
        <h1 className="text-5xl font-bold mb-4 text-white">Kişisel <span className="text-violet-400">Alan</span></h1>
        <p className="text-slate-500 text-lg font-light max-w-xl mx-auto italic">“Yayınlama adımlarını buradan takip edebilirsin.”</p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        
        {/* INTERAKTIF YAYINLAMA REHBERİ */}
        <div className="col-span-2 bg-gradient-to-br from-slate-900 to-indigo-950/30 border border-violet-500/40 p-12 rounded-[3.5rem] mb-12 shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-violet-500/20 rounded-2xl"><ListChecks className="text-violet-400 w-8 h-8" /></div>
                <h3 className="text-3xl font-bold text-white">Yayınlama Kontrol Listesi</h3>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">TAMAMLANAN</div>
                <div className="text-3xl font-mono text-violet-400">%{Math.round((checkedSteps.length / publishSteps.length) * 100)}</div>
              </div>
            </div>

            <div className="space-y-4">
              {publishSteps.map((step) => (
                <div 
                  key={step.id} 
                  onClick={() => toggleStep(step.id)}
                  className={`flex items-start gap-6 p-6 rounded-3xl border transition-all cursor-pointer group ${checkedSteps.includes(step.id) ? 'bg-violet-500/10 border-violet-500/30 opacity-60' : 'bg-slate-900/50 border-slate-800 hover:border-violet-500/40'}`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${checkedSteps.includes(step.id) ? 'bg-violet-500 text-white' : 'bg-slate-800 text-slate-500 group-hover:bg-slate-700'}`}>
                    {checkedSteps.includes(step.id) ? <CheckCircle2 className="w-5 h-5" /> : step.id}
                  </div>
                  <div>
                    <h4 className={`font-bold mb-1 transition-all ${checkedSteps.includes(step.id) ? 'text-violet-200 line-through' : 'text-white'}`}>{step.title}</h4>
                    <p className="text-slate-400 text-sm font-light">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 flex gap-4">
               <a href="https://github.com/new" target="_blank" className="flex-1 py-4 bg-slate-900 border border-slate-800 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-3 hover:bg-slate-800 transition-all">
                 <GithubIcon className="w-5 h-5" /> GitHub'a Git
               </a>
               <a href="https://vercel.com/new" target="_blank" className="flex-1 py-4 bg-violet-600 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-3 hover:bg-violet-500 transition-all shadow-xl shadow-violet-500/20">
                 Vercel'e Git <ArrowUpRight className="w-5 h-5" />
               </a>
            </div>
          </div>
        </div>

        {/* DİĞER KİŞİSEL ALAN ÖZELLİKLERİ */}
        <div className="bg-slate-900/20 border border-violet-500/10 p-8 rounded-[2.5rem] hover:border-violet-500/30 transition-all shadow-[0_10px_40px_rgba(0,0,0,0.3)] backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="text-violet-400 w-5 h-5" />
            <h3 className="font-bold text-white">Odak Süresi</h3>
          </div>
          <div className="flex gap-4 justify-center">
            {[5, 10, 20].map(m => (
              <button key={m} onClick={() => { setTimer(m * 60); setTimerActive(true); }} className="bg-slate-900 border border-slate-800 px-6 py-3 rounded-2xl hover:border-violet-500/50 transition-all text-sm btn-purple-glow">{m} Dk</button>
            ))}
          </div>
          {timer !== null && <div className="mt-6 text-center text-2xl font-mono text-violet-300">{formatTime(timer)}</div>}
        </div>

        <div className="bg-slate-900/20 border border-violet-500/10 p-8 rounded-[2.5rem] hover:border-violet-500/30 transition-all shadow-[0_10px_40px_rgba(0,0,0,0.3)] backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle2 className="text-violet-400 w-5 h-5" />
            <h3 className="font-bold text-white">Bugün Kendin İçin</h3>
          </div>
          <div className="space-y-3">
            {['Öğrendim', 'Denemeye Devam Ettim', 'Sabrettim'].map(label => (
              <label key={label} className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="w-5 h-5 rounded-lg bg-slate-950 border-slate-800 text-violet-500 focus:ring-0" />
                <span className="text-slate-400 text-sm">{label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-24 pt-16 border-t border-slate-900 flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 text-slate-600 text-xs uppercase tracking-widest font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>Gizlilik Öncelikli</span>
        </div>
        <p className="text-slate-700 text-[10px] text-center max-w-sm">Veriler tarayıcınızda (Local Storage) saklanır.</p>
      </div>
    </motion.div>
  );
};

export default PersonalSpace;
