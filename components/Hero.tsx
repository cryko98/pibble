
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Heart, Rocket, ShieldCheck, Sparkles } from 'lucide-react';
import { PIBBLE_NAME, PIBBLE_CA, PIBBLE_LOGO_URL, PUMPFUN_LINK } from '../constants';

interface Petal {
  id: number;
  left: string;
  duration: number;
  delay: number;
  size: number;
  opacity: number;
}

const Hero: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [petals, setPetals] = useState<Petal[]>([]);

  const copyCA = () => {
    navigator.clipboard.writeText(PIBBLE_CA);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const triggerBlossoms = useCallback(() => {
    const newPetals: Petal[] = [];
    for (let i = 0; i < 30; i++) {
      newPetals.push({
        id: Date.now() + i,
        left: `${Math.random() * 100}%`,
        duration: 3 + Math.random() * 4,
        delay: Math.random() * 0.5,
        size: 10 + Math.random() * 20,
        opacity: 0.6 + Math.random() * 0.4,
      });
    }
    setPetals(prev => [...prev, ...newPetals]);
    setTimeout(() => {
      setPetals(prev => prev.filter(p => !newPetals.some(np => np.id === p.id)));
    }, 8000);
  }, []);

  return (
    <section className="relative min-h-screen pt-24 pb-12 sm:pt-40 sm:pb-20 px-4 flex items-center justify-center overflow-hidden bg-[#fffcfd]">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[80%] h-[50%] bg-pink-100/40 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[40%] bg-blue-50/50 rounded-full blur-[100px]"></div>
      </div>

      <AnimatePresence>
        {petals.map(petal => (
          <motion.div
            key={petal.id}
            className="petal"
            initial={{ y: -50, opacity: 1 }}
            animate={{ 
              y: '110vh', 
              x: (Math.random() - 0.5) * 200, 
              rotate: 720,
              opacity: 0
            }}
            transition={{ duration: petal.duration, ease: "linear", delay: petal.delay }}
            style={{
              left: petal.left,
              width: petal.size,
              height: petal.size,
              backgroundColor: '#ffb7c5',
            }}
          />
        ))}
      </AnimatePresence>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left flex flex-col items-center lg:items-start overflow-hidden"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2 bg-pink-50 text-pink-500 rounded-full font-bold text-[10px] sm:text-sm mb-4 sm:mb-6 shadow-sm border border-pink-100">
              <ShieldCheck size={14} /> CTO VERIFIED PROJECT
            </div>
            
            <h1 className="font-bungee text-4xl sm:text-7xl md:text-8xl lg:text-9xl text-black leading-[0.9] sm:leading-[0.85] mb-4 sm:mb-6 tracking-tight break-words max-w-full">
              MEET <br className="sm:block" /> <span className="text-pink-500">PIBBLE</span>
            </h1>
            
            <p className="font-cute text-lg sm:text-2xl lg:text-3xl text-gray-500 mb-8 sm:mb-10 max-w-xl mx-auto lg:mx-0 leading-tight sm:leading-snug">
              The world's most handheld pupper. <span className="text-pink-400 font-bold">$PIBBLE</span> is here to boop the Solana blockchain! 🎀
            </p>

            <div className="flex flex-col gap-4 sm:gap-6 mb-8 sm:mb-12 items-center lg:items-start w-full max-w-md lg:max-w-lg">
              <div className="glass-card p-1 sm:p-2 rounded-[1.5rem] sm:rounded-[2.5rem] border-2 border-pink-100 flex items-center gap-1.5 sm:gap-3 group hover:border-pink-300 transition-all shadow-xl w-full overflow-hidden">
                <div className="flex-1 px-3 sm:px-6 py-2 overflow-hidden text-left">
                  <p className="text-[8px] sm:text-[10px] text-gray-400 font-black uppercase mb-0.5 tracking-widest">Token Address</p>
                  <p className="text-[10px] sm:text-sm font-mono font-bold text-black truncate">{PIBBLE_CA}</p>
                </div>
                <button 
                  onClick={copyCA}
                  className={`p-2.5 sm:p-5 rounded-xl sm:rounded-3xl transition-all flex-shrink-0 ${copied ? 'bg-green-500 text-white' : 'bg-pink-500 text-white hover:bg-black'}`}
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start w-full">
                <a 
                  href={PUMPFUN_LINK} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 sm:px-10 py-3.5 sm:py-5 bg-black text-white font-bungee text-base sm:text-xl rounded-[1.2rem] sm:rounded-[2rem] shadow-xl hover:bg-pink-500 hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
                >
                  <Rocket size={18} /> BUY NOW
                </a>
                <a 
                  href="#snack-game" 
                  className="px-6 sm:px-10 py-3.5 sm:py-5 bg-white border-[3px] sm:border-4 border-pink-500 text-pink-500 font-bungee text-base sm:text-xl rounded-[1.2rem] sm:rounded-[2rem] shadow-lg hover:bg-pink-500 hover:text-white hover:-translate-y-1 transition-all flex items-center justify-center"
                >
                  PLAY GAME
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: "spring" }}
            className="relative flex justify-center lg:justify-end mt-8 lg:mt-0"
          >
            <div className="relative group cursor-pointer" onClick={triggerBlossoms}>
              <div className="absolute inset-0 bg-pink-400 rounded-full blur-[80px] sm:blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-10px] sm:inset-[-40px] border-2 border-dashed border-pink-200 rounded-full opacity-50"
              />
              
              <div className="relative">
                <motion.img 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  src={PIBBLE_LOGO_URL} 
                  alt="Giant Pibble" 
                  className="w-56 h-56 sm:w-80 sm:h-80 md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px] rounded-full border-[6px] sm:border-[16px] border-white shadow-[0_24px_48px_rgba(255,105,180,0.3)] z-10 relative object-cover"
                />
                
                <motion.div 
                  animate={{ x: [0, 5, 0], y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-1 -right-1 sm:-top-4 sm:-right-4 bg-white px-3 py-1.5 sm:px-6 sm:py-3 rounded-lg sm:rounded-2xl shadow-2xl border-2 border-pink-50 z-20 flex items-center gap-1.5 sm:gap-2"
                >
                  <Sparkles className="text-yellow-400 w-3 h-3 sm:w-5 sm:h-5" />
                  <span className="font-bungee text-pink-500 text-[10px] sm:text-xl">GEM!</span>
                </motion.div>
                
                <motion.div 
                  animate={{ x: [0, -5, 0], y: [0, 8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  className="absolute bottom-4 -left-2 sm:bottom-10 sm:-left-10 bg-white px-3 py-1.5 sm:px-6 sm:py-3 rounded-lg sm:rounded-2xl shadow-2xl border-2 border-pink-50 z-20 flex items-center gap-1.5 sm:gap-2"
                >
                  <Heart fill="#FF69B4" className="text-pink-500 w-3 h-3 sm:w-5 sm:h-5" />
                  <span className="font-bungee text-pink-500 text-[10px] sm:text-xl">LEGEND</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
