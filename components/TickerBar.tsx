
import React from 'react';
import { motion } from 'framer-motion';
import { PIBBLE_TICKER, PIBBLE_NAME } from '../constants';
import { PawPrint, Heart } from 'lucide-react';

const TickerBar: React.FC = () => {
  const tickerText = `${PIBBLE_TICKER} • ${PIBBLE_NAME.toUpperCase()} IS A FRENCH BULLDOG PUPPY • BELLY UP • HANDLEHELD PUPPER • GEEBLE • ${PIBBLE_TICKER} • BORN ON SOLANA • ${PIBBLE_TICKER} • COMMUNITY DRIVEN • `;
  
  // We repeat the text to ensure it covers the screen and loops seamlessly
  const repeatedText = new Array(10).fill(tickerText).join("");

  return (
    <div className="bg-pink-500 py-4 sm:py-6 overflow-hidden whitespace-nowrap border-y-4 border-black relative z-20 shadow-2xl">
      <motion.div 
        initial={{ x: 0 }}
        animate={{ x: "-50%" }}
        transition={{ 
          duration: 30, // Faster duration (from 40 to 30)
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="flex items-center gap-8 inline-block"
      >
        <span className="font-bungee text-2xl sm:text-4xl text-white tracking-widest flex items-center gap-8">
          {repeatedText.split("•").map((text, i) => (
            <React.Fragment key={i}>
              <span className="flex items-center gap-4">
                {i % 2 === 0 ? <PawPrint size={24} fill="white" /> : <Heart size={24} fill="white" />}
                {text.trim()}
              </span>
            </React.Fragment>
          ))}
        </span>
      </motion.div>
    </div>
  );
};

export default TickerBar;
