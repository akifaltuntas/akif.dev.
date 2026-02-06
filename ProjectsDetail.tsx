
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Terminal, Code, Cpu, Layers, Info, CheckCircle2 } from 'lucide-react';

const ProjectsDetail = ({ onBack }: { onBack: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
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

      {/* Intro Section */}
      <div className="mb-32">
          <h1 className="text-6xl font-bold mb-8">Projelerim ve <span className="text-[#D4AF37]">Çıkarımlarım</span></h1>
          <p className="text-slate-500 text-xs uppercase tracking-[0.3em] mb-6 italic">Düşüncelerimi toparladıkça buraya eklemeler yapacağım.</p>
          <p className="text-slate-400 max-w-2xl text-lg font-light leading-relaxed border-l border-slate-800 pl-8">
              Her proje benim için sadece birer kod yığını değil, aynı zamanda düşünce yapımı şekillendiren birer öğretmendir.
          </p>
      </div>

      <div className="space-y-32">
        {/* Project 1: AI Prompt Studio */}
        <section className="grid grid-cols-2 gap-16 items-start">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 bg-amber-500/10 rounded-2xl border border-amber-500/20">
                <Terminal className="text-[#D4AF37] w-8 h-8" />
              </div>
              <div>
                <span className="text-xs text-[#D4AF37] font-bold tracking-[0.2em] uppercase">Proje I</span>
                <h2 className="text-4xl font-bold text-white">AI Prompt Studio</h2>
              </div>
            </div>
            
            <div className="space-y-6 text-lg text-slate-300 font-light leading-relaxed">
              <p>
                10. sınıf ara tatil döneminde tasarlayıp tamamladığım ilk büyük projem.
              </p>
              <p>
                Geliştirme sürecinde sadece bir araç değil, aynı zamanda görsel üretim teknolojilerinin nasıl daha verimli kullanılabileceğine dair bir rehber oluşturmaya odaklandım.
              </p>
              <div className="flex flex-wrap gap-3 pt-6">
                {['HTML5', 'Tailwind CSS', 'JavaScript', 'AI Research'].map(tag => (
                  <span key={tag} className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm font-medium text-slate-400">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="pt-8">
                <a 
                  href="https://mehmetakifaltuntas61-arch.github.io/ai-image-prompts/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#D4AF37] hover:bg-amber-600 text-slate-950 font-bold py-4 px-8 rounded-2xl transition-all shadow-xl shadow-amber-500/10"
                >
                  Canlı Projeyi Görüntüle <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-8 aspect-square flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent" />
            <Cpu className="w-32 h-32 text-slate-800 group-hover:text-[#D4AF37]/20 transition-all duration-700" />
            <div className="absolute bottom-8 left-8 right-8 p-6 bg-slate-950/80 backdrop-blur-md rounded-2xl border border-slate-800">
               <p className="text-sm text-slate-400 font-medium tracking-wide italic">"Yapay zeka ile yaratıcılığın buluşma noktası."</p>
            </div>
          </div>
        </section>

        {/* Lessons Learned Section */}
        <section className="py-24 bg-slate-950/40 rounded-[3rem] border border-slate-900 px-16">
            <div className="mb-12">
                <h2 className="text-3xl font-bold mb-4">Bu Süreçte <span className="text-[#D4AF37]">Öğrendiklerim</span></h2>
                <p className="text-[10px] text-slate-600 uppercase tracking-[0.2em] mb-4 italic">Öğrendiğim her yeni şeyle burayı biraz daha büyüteceğim.</p>
                <div className="w-20 h-1 bg-[#D4AF37] rounded-full" />
            </div>
            <div className="grid grid-cols-3 gap-8">
                {[
                    "En karmaşık projelerin aslında sabırla bir araya getirilmiş çok küçük parçalardan oluştuğunu keşfettim.",
                    "Teknolojinin sadece bir araç olduğunu, asıl meselenin o aracı kullanarak bir değer üretme isteği olduğunu anladım.",
                    "Bir işi bitirip yayına almanın, onu kusursuz yapmaya çalışmaktan çok daha fazla tecrübe kazandırdığını gördüm.",
                    "\"Bilmiyorum\" demenin ve yardım aramanın, öğrenme sürecinin en hızlı yolu olduğunu fark ettim.",
                    "Disiplinli çalışmanın zihni karmaşadan kurtardığını ve belirsizliğin içinde bir yol açtığını deneyimledim."
                ].map((lesson, i) => (
                    <div key={i} className="flex gap-4 p-6 bg-slate-900/50 rounded-2xl border border-slate-800/50 hover:border-[#D4AF37]/20 transition-all">
                        <CheckCircle2 className="text-[#D4AF37] w-6 h-6 flex-shrink-0" />
                        <p className="text-slate-300 font-light leading-relaxed">{lesson}</p>
                    </div>
                ))}
            </div>
        </section>

        {/* Project 2: Personal Website */}
        <section className="grid grid-cols-2 gap-16 items-start">
           <div className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-8 aspect-square flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-transparent" />
            <Layers className="w-32 h-32 text-slate-800 group-hover:text-blue-500/20 transition-all duration-700" />
            <div className="absolute bottom-8 left-8 right-8 p-6 bg-slate-950/80 backdrop-blur-md rounded-2xl border border-slate-800">
               <p className="text-sm text-slate-400 font-medium tracking-wide italic">"Sürekli büyüyen bir dijital arşiv."</p>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20">
                <Code className="text-blue-400 w-8 h-8" />
              </div>
              <div>
                <span className="text-xs text-blue-400 font-bold tracking-[0.2em] uppercase">Proje II</span>
                <h2 className="text-4xl font-bold text-white">Kişisel Web Sitem</h2>
              </div>
            </div>
            
            <div className="space-y-6 text-lg text-slate-300 font-light leading-relaxed">
              <p>
                Şu an içinde bulunduğunuz bu platform, sadece bir portfolyo değil; öğrenme sürecimin yaşayan bir belgesidir. 
              </p>
              <p>
                Bu projenin arkasındaki temel felsefe "Iterative Growth" yani aşamalı büyümedir. 
              </p>
              <div className="flex flex-wrap gap-3 pt-6">
                {['React', 'TypeScript', 'Framer Motion', 'UI/UX Design'].map(tag => (
                  <span key={tag} className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm font-medium text-slate-400">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="pt-8 flex items-center gap-3 text-slate-500 italic text-sm">
                <Info className="w-4 h-4" />
                <span>Burası zamanla dolacak, şimdilik sadece bir boşluk.</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default ProjectsDetail;
