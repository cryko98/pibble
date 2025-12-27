
import React, { useState, useEffect } from 'react';
import { PIBBLE_LOGO_URL, PIBBLE_NAME, X_LINK, XIcon, PIBBLE_CA } from '../constants';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mcap, setMcap] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchMcap = async () => {
      try {
        const response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${PIBBLE_CA}`);
        const data = await response.json();
        if (data.pairs && data.pairs.length > 0) {
          const marketCap = data.pairs[0].fdv || data.pairs[0].marketCap;
          if (marketCap) {
            if (marketCap >= 1000000) {
              setMcap(`$${(marketCap / 1000000).toFixed(2)}M`);
            } else if (marketCap >= 1000) {
              setMcap(`$${(marketCap / 1000).toFixed(1)}K`);
            } else {
              setMcap(`$${marketCap}`);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching market cap:", error);
      }
    };

    fetchMcap();
    const interval = setInterval(fetchMcap, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-1 sm:py-2' : 'bg-transparent py-3 sm:py-8'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2 sm:gap-4 group cursor-pointer">
          <div className="relative">
             <div className="absolute inset-0 bg-pink-400 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
             <img 
               src={PIBBLE_LOGO_URL} 
               alt="Pibble" 
               className="w-10 h-10 sm:w-16 sm:h-16 rounded-full border-2 border-pink-400 relative z-10 transition-transform group-hover:rotate-12 group-hover:scale-110" 
             />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-bungee text-xl sm:text-4xl text-pink-500 tracking-wider group-hover:text-pink-600 transition-colors uppercase">{PIBBLE_NAME}</span>
            {mcap && (
              <div className="flex items-center gap-1 mt-0.5 sm:mt-1 bg-green-50 px-1.5 sm:px-2 py-0.5 rounded-full border border-green-100 w-fit">
                <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-green-500"></span>
                </span>
                <span className="text-[9px] sm:text-[12px] font-black text-green-600 uppercase tracking-tighter">MCAP: {mcap}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-3 sm:gap-6">
          <div className="hidden lg:flex items-center gap-6 font-cute text-xl font-bold">
            <a href="#about" className="hover:text-pink-500 transition-all">About</a>
            <a href="#game" className="hover:text-pink-500 transition-all">Memory</a>
            <a href="#snack-game" className="hover:text-pink-500 transition-all">Game</a>
            <a href="#buy" className="hover:text-pink-500 transition-all">Buy</a>
          </div>
          <a 
            href={X_LINK} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-black text-white p-2.5 sm:p-3 rounded-xl sm:rounded-2xl hover:bg-pink-500 hover:scale-110 transition-all shadow-xl"
          >
            <XIcon className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
