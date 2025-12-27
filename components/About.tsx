
import React from 'react';
import { motion } from 'framer-motion';
import { Info, ShieldCheck, Users } from 'lucide-react';
import { ABOUT_TEXT, PIBBLE_LOGO_URL, CTO_MESSAGE } from '../constants';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 sm:py-32 px-4 bg-white relative overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-2 md:order-1 text-center md:text-left"
          >
            <div className="inline-flex items-center gap-2 px-6 py-2 bg-pink-100 text-pink-600 rounded-full font-bold text-xs sm:text-sm mb-6 uppercase tracking-[0.2em] shadow-sm">
              <Info size={16} /> The Legend
            </div>
            <h2 className="font-bungee text-4xl sm:text-5xl lg:text-6xl text-pink-500 mb-6 sm:mb-8 leading-tight">What is a <br className="hidden sm:block"/><span className="text-black text-outline tracking-tighter">PIBBLE?</span></h2>
            <div className="font-cute text-lg sm:text-2xl text-gray-700 leading-relaxed space-y-4 sm:space-y-6 font-medium">
              {ABOUT_TEXT.split('\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="mt-10 sm:mt-14 p-6 sm:p-10 bg-gradient-to-br from-pink-50 to-white rounded-[2rem] sm:rounded-[3rem] border-4 border-dashed border-pink-300 relative shadow-xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 hidden sm:block">
                <Users size={120} />
              </div>
              <div className="flex items-center gap-4 mb-3 sm:mb-4 justify-center md:justify-start">
                <div className="bg-pink-500 p-2 sm:p-3 rounded-xl sm:rounded-2xl text-white shadow-lg">
                  <ShieldCheck size={24} />
                </div>
                <p className="font-bungee text-pink-600 text-lg sm:text-2xl italic tracking-tighter">CTO Managed Project</p>
              </div>
              <p className="text-pink-900 font-bold text-lg sm:text-xl leading-relaxed relative z-10">{CTO_MESSAGE}</p>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="order-1 md:order-2 flex justify-center"
          >
            <div className="relative max-w-sm sm:max-w-md w-full">
              <div className="absolute inset-0 bg-pink-400 rounded-[2rem] sm:rounded-[4rem] rotate-6 scale-105 opacity-10 blur-3xl"></div>
              <div className="relative group">
                <img 
                  src={PIBBLE_LOGO_URL} 
                  alt="Cute Pibble" 
                  className="relative z-10 w-full aspect-square object-cover rounded-[2.5rem] sm:rounded-[4rem] shadow-2xl border-[8px] sm:border-[12px] border-white transform transition-all duration-700 group-hover:-rotate-3 group-hover:scale-105"
                />
                <div className="absolute -bottom-6 -left-6 sm:-bottom-10 sm:-left-10 bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-2xl border-2 border-pink-100 animate-bounce">
                  <p className="font-bungee text-pink-500 text-sm sm:text-xl uppercase">WAGMI! 🐾</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
