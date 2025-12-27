
import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, Coins, Search, Sparkles, ArrowRight } from 'lucide-react';
import { PIBBLE_CA } from '../constants';

const steps = [
  {
    title: "Grab a Wallet",
    description: "Download Phantom or Solflare. It's the secure home for your Solana treasures.",
    icon: <Wallet size={40} />
  },
  {
    title: "Load up on SOL",
    description: "Buy SOL on any major exchange and send it to your phantom wallet address.",
    icon: <Coins size={40} />
  },
  {
    title: "Sniff out Pibble",
    description: "Go to Pump.fun or Jupiter, paste our CA, and prepare for the ultimate puppy boop.",
    icon: <Search size={40} />
  },
  {
    title: "Happy Boops",
    description: "Welcome to the Pibble Pack! HODL tight and watch the chart reach for the stars.",
    icon: <Sparkles size={40} />
  }
];

const HowToBuy: React.FC = () => {
  return (
    <section id="buy" className="py-20 sm:py-32 px-4 bg-pink-50 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-20"
        >
          <h2 className="font-bungee text-4xl sm:text-7xl text-pink-500 mb-4 sm:mb-6 tracking-tighter drop-shadow-md uppercase">HOW TO FETCH</h2>
          <p className="font-cute text-xl sm:text-3xl text-pink-400 font-bold">Follow these 4 simple steps to join the pack! 🎀</p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white p-8 sm:p-12 rounded-[2.5rem] sm:rounded-[3.5rem] shadow-2xl border-b-[8px] sm:border-b-[12px] border-pink-200 hover:border-pink-500 transition-all duration-500 group relative"
            >
              <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 w-12 h-12 sm:w-16 sm:h-16 bg-pink-500 text-white font-bungee rounded-xl sm:rounded-[1.5rem] flex items-center justify-center text-xl sm:text-2xl z-20 group-hover:rotate-12 transition-transform shadow-xl">{idx + 1}</div>
              <div className="text-pink-500 mb-6 sm:mb-8 bg-pink-50 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all">
                {step.icon}
              </div>
              <h3 className="font-bungee text-xl sm:text-2xl text-black mb-3 sm:mb-4 tracking-tight group-hover:text-pink-500 transition-colors">{step.title}</h3>
              <p className="text-gray-500 font-cute text-lg sm:text-xl leading-relaxed font-medium">{step.description}</p>
              {idx < 3 && (
                <div className="hidden lg:block absolute -right-6 top-1/2 -translate-y-1/2 z-30 opacity-20 group-hover:opacity-100 transition-opacity">
                  <ArrowRight size={32} className="text-pink-500" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16 sm:mt-24 text-center px-2"
        >
          <div className="inline-block p-1 sm:p-2 bg-gradient-to-r from-pink-400 via-yellow-300 to-pink-400 rounded-[2rem] sm:rounded-[3rem] shadow-2xl animate-pulse max-w-full">
             <div className="bg-white px-4 sm:px-12 py-4 sm:py-6 rounded-[1.8rem] sm:rounded-[2.8rem] font-mono text-pink-600 text-[10px] xs:text-xs sm:text-2xl border-2 sm:border-4 border-white select-all font-black tracking-tight break-all sm:break-normal">
               {PIBBLE_CA}
             </div>
          </div>
          <p className="text-pink-500 mt-6 sm:mt-8 font-bungee text-sm sm:text-xl tracking-wider flex items-center justify-center gap-2 sm:gap-3">
            <Sparkles size={16} className="sm:w-5 sm:h-5" /> THE ONLY LEGIT PIBBLE CA <Sparkles size={16} className="sm:w-5 sm:h-5" />
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HowToBuy;
