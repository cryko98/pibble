
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircleHeart } from 'lucide-react';
import { PIBBLE_LOGO_URL } from '../constants';

const FloatingPibble: React.FC = () => {
  const [isBooped, setIsBooped] = useState(false);
  const [bubbleText, setBubbleText] = useState("Boop me!");

  const phrases = [
    "Wuf! 🐾", 
    "Solana Moon! 🚀", 
    "Pibble Power! 🔥", 
    "So Pink! 🎀", 
    "Buy $Pibble! 💎", 
    "CTO Lead! 🛡️", 
    "Vibe check! ✨"
  ];

  const handleBoop = () => {
    setIsBooped(true);
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    setBubbleText(randomPhrase);
    setTimeout(() => setIsBooped(false), 500);
  };

  return (
    <div className="fixed bottom-12 right-12 z-[100]">
      <AnimatePresence>
        <motion.div 
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0 }}
          className="absolute -top-24 right-0 bg-white text-pink-600 px-6 py-4 rounded-[2rem] shadow-2xl font-black text-lg border-4 border-pink-100 whitespace-nowrap z-[110] flex items-center gap-2"
        >
          <MessageCircleHeart size={20} className="text-pink-500" />
          {bubbleText}
          <div className="absolute -bottom-3 right-8 w-6 h-6 bg-white border-r-4 border-b-4 border-pink-100 rotate-45"></div>
        </motion.div>
      </AnimatePresence>
      
      <motion.button 
        whileHover={{ scale: 1.15, rotate: 5 }}
        whileTap={{ scale: 0.9, rotate: -10 }}
        onClick={handleBoop}
        className="w-24 h-24 rounded-[2.5rem] border-[6px] border-white shadow-2xl overflow-hidden relative group"
      >
        <div className="absolute inset-0 bg-pink-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
        <img src={PIBBLE_LOGO_URL} alt="Pibble Floating" className="w-full h-full object-cover" />
      </motion.button>
    </div>
  );
};

export default FloatingPibble;
