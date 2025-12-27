
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
    <section id="buy" className="py-32 px-4 bg-pink-50 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-bungee text-7xl text-pink-500 mb-6 tracking-tighter drop-shadow-md">HOW TO FETCH</h2>
          <p className="font-cute text-3xl text-pink-400 font-bold">Follow these 4 simple steps to join the pack! 🎀</p>
        </motion.div>
        
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -15 }}
              className="bg-white p-12 rounded-[3.5rem] shadow-2xl border-b-[12px] border-pink-200 hover:border-pink-500 transition-all duration-500 group relative"
            >
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-pink-500 text-white font-bungee rounded-[1.5rem] flex items-center justify-center text-2xl z-20 group-hover:rotate-12 transition-transform shadow-xl">{idx + 1}</div>
              <div className="text-pink-500 mb-8 bg-pink-50 w-20 h-20 rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all">
                {step.icon}
              </div>
              <h3 className="font-bungee text-2xl text-black mb-4 tracking-tight group-hover:text-pink-500 transition-colors">{step.title}</h3>
              <p className="text-gray-500 font-cute text-xl leading-relaxed font-medium">{step.description}</p>
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
          className="mt-24 text-center"
        >
          <div className="inline-block p-2 bg-gradient-to-r from-pink-400 via-yellow-300 to-pink-400 rounded-[3rem] shadow-2xl animate-pulse">
             <div className="bg-white px-12 py-6 rounded-[2.8rem] font-mono text-pink-600 text-lg sm:text-2xl border-4 border-white select-all font-black tracking-tight">
               {PIBBLE_CA}
             </div>
          </div>
          <p className="text-pink-500 mt-8 font-bungee text-xl tracking-wider flex items-center justify-center gap-3">
            <Sparkles size={20} /> THE ONLY LEGIT PIBBLE CA <Sparkles size={20} />
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HowToBuy;
