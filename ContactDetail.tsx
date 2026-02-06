
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Instagram, Github, Mail, MessageSquare, ExternalLink, Globe } from 'lucide-react';

const ContactDetail = ({ onBack }: { onBack: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-32 pb-24 px-6 max-w-7xl mx-auto"
    >
      <button 
        onClick={onBack}
        className="flex items-center gap-3 text-slate-400 hover:text-[#D4AF37] transition-all mb-12 group"
      >
        <div className="p-2 bg-slate-900/50 rounded-xl border border-slate-800 group-hover:border-[#D4AF37]/30 transition-all">
          <ArrowLeft className="w-5 h-5" />
        </div>
        <span className="font-medium tracking-wide">Ana Sayfaya Dön</span>
      </button>

      <div className="mb-24">
        <h1 className="text-6xl font-bold mb-6">Bağlantıda <span className="text-[#D4AF37]">Kallalım</span></h1>
        <p className="text-slate-400 max-w-xl text-lg font-light leading-relaxed border-l-2 border-[#D4AF37]/30 pl-8 italic">
          "Bir fikir, bir proje veya sadece bir selam... İletişime geçmekten çekinme. Öğrenme yolculuğumu birlikte büyütebiliriz."
        </p>
      </div>

      <div className="grid grid-cols-2 gap-10">
        {/* Instagram Card */}
        <motion.a 
          href="https://www.instagram.com/akif_altuntas.61/" 
          target="_blank" 
          rel="noopener noreferrer"
          whileHover={{ y: -10 }}
          className="relative group overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2.5rem]" />
          <div className="bg-slate-900/40 border border-slate-800 p-10 rounded-[2.5rem] backdrop-blur-md h-full relative z-10 transition-all group-hover:border-pink-500/30">
            <div className="flex justify-between items-start mb-12">
              <div className="p-5 bg-pink-500/10 rounded-2xl border border-pink-500/20 group-hover:scale-110 transition-transform">
                <Instagram className="text-pink-400 w-10 h-10" />
              </div>
              <ExternalLink className="text-slate-700 group-hover:text-pink-400 transition-colors" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">Instagram</h3>
            <p className="text-slate-400 text-lg mb-8 font-light italic">Günlük gelişim notlarımı ve anlık paylaşımlarımı buradan takip edebilirsin.</p>
            <div className="text-[#D4AF37] font-bold tracking-widest uppercase text-sm">@akif_altuntas.61</div>
          </div>
        </motion.a>

        {/* GitHub Card */}
        <motion.a 
          href="https://github.com/mehmetakifaltuntas61-arch" 
          target="_blank" 
          rel="noopener noreferrer"
          whileHover={{ y: -10 }}
          className="relative group overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-slate-400/10 to-slate-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2.5rem]" />
          <div className="bg-slate-900/40 border border-slate-800 p-10 rounded-[2.5rem] backdrop-blur-md h-full relative z-10 transition-all group-hover:border-slate-500/30">
            <div className="flex justify-between items-start mb-12">
              <div className="p-5 bg-slate-500/10 rounded-2xl border border-slate-500/20 group-hover:scale-110 transition-transform">
                <Github className="text-white w-10 h-10" />
              </div>
              <ExternalLink className="text-slate-700 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">GitHub</h3>
            <p className="text-slate-400 text-lg mb-8 font-light italic">Kodladığım projelerin açık kaynak hallerine ve arşivime buradan ulaşabilirsin.</p>
            <div className="text-[#D4AF37] font-bold tracking-widest uppercase text-sm">mehmetakifaltuntas61-arch</div>
          </div>
        </motion.a>
      </div>

      <div className="mt-24 pt-16 border-t border-slate-900 grid grid-cols-3 gap-12">
        <div className="flex items-center gap-6 group">
          <div className="p-4 bg-blue-500/5 rounded-2xl border border-blue-500/10 group-hover:border-blue-400/40 transition-all">
            <Mail className="text-blue-400 w-6 h-6" />
          </div>
          <div>
            <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-widest">E-Posta</span>
            <span className="text-slate-300 group-hover:text-white transition-colors">akif@dev.com (Yakında)</span>
          </div>
        </div>
        
        <div className="flex items-center gap-6 group">
          <div className="p-4 bg-cyan-500/5 rounded-2xl border border-cyan-500/10 group-hover:border-cyan-400/40 transition-all">
            <MessageSquare className="text-cyan-400 w-6 h-6" />
          </div>
          <div>
            <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-widest">DM</span>
            <span className="text-slate-300 group-hover:text-white transition-colors">Instagram Üzerinden</span>
          </div>
        </div>

        <div className="flex items-center gap-6 group">
          <div className="p-4 bg-amber-500/5 rounded-2xl border border-amber-500/10 group-hover:border-[#D4AF37]/40 transition-all">
            <Globe className="text-[#D4AF37] w-6 h-6" />
          </div>
          <div>
            <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-widest">Konum</span>
            <span className="text-slate-300 group-hover:text-white transition-colors">Türkiye / Dijital Evren</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactDetail;
