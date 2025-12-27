
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Info, ShieldCheck, Users, PawPrint } from 'lucide-react';
import { ABOUT_TEXT, CTO_MESSAGE } from '../constants';

const BANNER_URL = "https://wkkeyyrknmnynlcefugq.supabase.co/storage/v1/object/public/wasd/banner%20-%202025-12-27T023751.802.png";

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax transforms for background elements
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="py-20 sm:py-32 px-4 bg-white relative overflow-hidden"
    >
      {/* Parallax Background Elements */}
      <motion.div 
        style={{ y: y1, rotate }}
        className="absolute top-20 left-[10%] text-pink-100 opacity-50 pointer-events-none hidden lg:block"
      >
        <PawPrint size={180} />
      </motion.div>
      
      <motion.div 
        style={{ y: y2, rotate: -20 }}
        className="absolute bottom-40 right-[5%] text-pink-50 opacity-40 pointer-events-none hidden lg:block"
      >
        <PawPrint size={120} />
      </motion.div>

      <motion.div 
        style={{ y: y1 }}
        className="absolute top-1/2 left-[-5%] w-64 h-64 bg-pink-50 rounded-full blur-[80px] opacity-60 pointer-events-none"
      />

      <div className="container mx-auto max-w-6xl relative z-10 flex flex-col items-center">
        {/* Banner Image at Top */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full mb-12 sm:mb-16"
        >
          <img 
            src={BANNER_URL} 
            alt="Pibble Banner" 
            className="w-full h-auto rounded-[2rem] sm:rounded-[4rem] shadow-2xl border-[6px] sm:border-[10px] border-white object-cover"
          />
        </motion.div>

        {/* Text Content Area */}
        <div className="w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left"
          >
            <div className="inline-flex items-center gap-2 px-6 py-2 bg-pink-100 text-pink-600 rounded-full font-bold text-xs sm:text-sm mb-6 uppercase tracking-[0.2em] shadow-sm">
              <Info size={16} /> The Legend
            </div>
            
            <h2 className="font-bungee text-4xl sm:text-5xl lg:text-7xl text-pink-500 mb-6 sm:mb-10 leading-tight uppercase text-center md:text-left">
              What is a <span className="text-black text-outline tracking-tighter">PIBBLE?</span>
            </h2>
            
            <div className="font-cute text-xl sm:text-3xl text-gray-700 leading-relaxed space-y-6 sm:space-y-8 font-medium">
              {ABOUT_TEXT.split('\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
            
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="mt-12 sm:mt-20 p-8 sm:p-14 bg-gradient-to-br from-pink-50 to-white rounded-[3rem] sm:rounded-[4.5rem] border-4 border-dashed border-pink-300 relative shadow-xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 opacity-10 hidden sm:block">
                <Users size={160} />
              </div>
              <div className="flex items-center gap-4 mb-4 sm:mb-6 justify-center md:justify-start">
                <div className="bg-pink-500 p-3 sm:p-4 rounded-2xl sm:rounded-3xl text-white shadow-lg">
                  <ShieldCheck size={28} />
                </div>
                <p className="font-bungee text-pink-600 text-2xl sm:text-4xl italic tracking-tighter uppercase">CTO Managed Project</p>
              </div>
              <p className="text-pink-900 font-bold text-xl sm:text-2xl leading-relaxed relative z-10 text-center md:text-left">
                {CTO_MESSAGE}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
