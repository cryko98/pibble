
import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, ExternalLink, Activity } from 'lucide-react';
import { PIBBLE_CA, DEXSCREENER_LINK } from '../constants';

const Chart: React.FC = () => {
  return (
    <section id="chart" className="py-20 sm:py-32 px-4 bg-white relative">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-pink-100 text-pink-600 rounded-full font-bold text-sm mb-6 uppercase tracking-[0.2em] shadow-sm">
            <Activity size={16} /> Real-time Data
          </div>
          <h2 className="font-bungee text-4xl sm:text-6xl text-pink-500 mb-4 tracking-tighter drop-shadow-sm">LIVE TRACKER</h2>
          <p className="font-cute text-xl sm:text-2xl text-gray-500 max-w-2xl mx-auto px-4">Watch Pibble zoom past the atmosphere in real-time. High volume, huge potential! 🚀</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative group"
        >
          <div className="absolute -inset-4 sm:-inset-6 bg-gradient-to-r from-pink-400 via-purple-400 to-pink-500 rounded-[2.5rem] sm:rounded-[4rem] opacity-20 group-hover:opacity-40 blur-2xl sm:blur-3xl transition-opacity duration-700"></div>
          <div className="relative bg-white rounded-[2rem] sm:rounded-[3.5rem] overflow-hidden shadow-2xl p-2 sm:p-4 border-[8px] sm:border-[16px] border-pink-100 h-[500px] sm:h-[650px] lg:h-[850px]">
            <iframe 
              width="100%" 
              height="100%" 
              src={`https://dexscreener.com/solana/${PIBBLE_CA}?embed=1&theme=light&trades=1&info=1`}
              title="Pibble Chart"
              className="rounded-[1.5rem] sm:rounded-[2.5rem]"
            ></iframe>
          </div>
          
          <div className="mt-8 sm:mt-12 flex justify-center">
            <a 
              href={DEXSCREENER_LINK} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 bg-black text-white font-bungee text-lg sm:text-xl rounded-[1.5rem] sm:rounded-[2rem] shadow-xl hover:bg-pink-500 transition-all flex items-center justify-center gap-3 group"
            >
              <ExternalLink className="group-hover:rotate-12 transition-transform w-5 h-5 sm:w-6 sm:h-6" />
              VIEW ON DEXSCREENER
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Chart;
