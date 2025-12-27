
import React from 'react';
import { Heart, ShieldCheck } from 'lucide-react';
import { PIBBLE_LOGO_URL, PIBBLE_NAME, X_LINK, XIcon } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white pt-20 sm:pt-32 pb-16 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-500 via-white to-pink-500"></div>
      
      <div className="absolute -bottom-20 -right-20 opacity-10 scale-150 rotate-12 pointer-events-none">
        <img src={PIBBLE_LOGO_URL} alt="" className="w-96 h-96 rounded-full" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 sm:mb-24 gap-12 sm:gap-16">
          <div className="max-w-md w-full">
            <div className="flex items-center gap-4 sm:gap-6 mb-6 sm:mb-8 group">
              <img src={PIBBLE_LOGO_URL} alt="Pibble Logo" className="w-20 h-20 sm:w-28 sm:h-28 rounded-full border-4 border-pink-500 shadow-2xl group-hover:scale-110 transition-transform" />
              <div>
                <h3 className="font-bungee text-5xl sm:text-7xl text-pink-500 tracking-tighter leading-none uppercase">{PIBBLE_NAME}</h3>
                <p className="text-pink-100 font-cute text-xl sm:text-2xl font-bold">The legendary $PIBBLE pack 🎀</p>
              </div>
            </div>
            <p className="text-pink-100/60 font-cute text-lg sm:text-xl leading-relaxed mb-6 sm:mb-8">
              Born from internet meme culture, $PIBBLE is more than just a coin. It's a community of cute Frenchie lovers aiming for the stars.
            </p>
            <div className="flex gap-4">
               <div className="flex items-center gap-2 px-4 py-2 bg-pink-500/10 border border-pink-500/30 rounded-xl text-pink-500 font-bold text-xs sm:text-sm">
                 <ShieldCheck size={18} /> CTO VERIFIED
               </div>
            </div>
          </div>
          
          <div className="flex flex-col md:items-end gap-6 sm:gap-8 w-full md:w-auto">
            <h4 className="font-bungee text-2xl sm:text-3xl mb-0 text-white uppercase">JOIN THE PACK</h4>
            <div className="flex flex-wrap gap-4">
              <a href={X_LINK} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto p-5 sm:p-6 bg-pink-500 hover:bg-white hover:text-pink-500 rounded-2xl sm:rounded-[2rem] transition-all shadow-2xl hover:-translate-y-2 flex items-center justify-center gap-3 font-bungee text-lg">
                <XIcon className="w-6 h-6" /> TWITTER
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-12 sm:pt-16">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="space-y-4 text-center md:text-left">
              <p className="text-pink-100/40 text-sm max-w-lg font-cute leading-relaxed mx-auto md:mx-0">
                Disclaimer: $pibble is a memecoin for entertainment purposes only. No financial advice provided. Always DYOR. 🐾
              </p>
              <div className="flex items-center justify-center md:justify-start gap-2 text-pink-500 font-black text-[10px] sm:text-xs uppercase tracking-[0.4em]">
                 Pibble Revolution <Heart size={10} fill="#FF69B4" /> 2025
              </div>
            </div>
            <div className="text-center md:text-right flex flex-col gap-2 sm:gap-3">
              <p className="text-pink-500 font-bungee text-4xl sm:text-6xl opacity-40 leading-none">© 2025 {PIBBLE_NAME}</p>
              <p className="text-pink-100/60 text-xs sm:text-sm font-bold flex items-center justify-center md:justify-end gap-2">
                Crafted with <Heart size={14} fill="#FF69B4" className="text-pink-500" /> by the experienced CTO Team
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
