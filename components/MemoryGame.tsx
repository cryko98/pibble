
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, RefreshCcw, PawPrint, Brain } from 'lucide-react';
import { PIBBLE_LOGO_URL } from '../constants';

const COLORS = [
  '#FF1493',
  '#C71585',
  '#DB7093',
  '#FF69B4',
  '#8A2BE2',
  '#FF4500',
];

interface Card {
  id: number;
  color: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryGame: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const initGame = useCallback(() => {
    const deck: Card[] = [];
    COLORS.forEach((color, idx) => {
      deck.push({ id: idx * 2, color, isFlipped: false, isMatched: false });
      deck.push({ id: idx * 2 + 1, color, isFlipped: false, isMatched: false });
    });
    const shuffledDeck = deck.sort(() => Math.random() - 0.5);
    setCards(shuffledDeck);
    setFlippedIndices([]);
    setMoves(0);
    setMatches(0);
    setIsProcessing(false);
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  useEffect(() => {
    if (flippedIndices.length === 2) {
      setIsProcessing(true);
      const [firstIdx, secondIdx] = flippedIndices;
      const firstCard = cards[firstIdx];
      const secondCard = cards[secondIdx];

      if (firstCard.color === secondCard.color) {
        setCards(prev => prev.map((card, idx) => 
          (idx === firstIdx || idx === secondIdx) 
            ? { ...card, isMatched: true } 
            : card
        ));
        setMatches(prev => prev + 1);
        setFlippedIndices([]);
        setIsProcessing(false);
      } else {
        const timer = setTimeout(() => {
          setCards(prev => prev.map((card, idx) => 
            (idx === firstIdx || idx === secondIdx) 
              ? { ...card, isFlipped: false } 
              : card
          ));
          setFlippedIndices([]);
          setIsProcessing(false);
        }, 800) as unknown as number;
        return () => clearTimeout(timer);
      }
    }
  }, [flippedIndices, cards]);

  const handleCardClick = (index: number) => {
    if (isProcessing || flippedIndices.length >= 2 || cards[index].isFlipped || cards[index].isMatched) {
      return;
    }

    setCards(prev => prev.map((card, idx) => 
      idx === index ? { ...card, isFlipped: true } : card
    ));
    setFlippedIndices(prev => [...prev, index]);
    
    if (flippedIndices.length === 1) {
      setMoves(prev => prev + 1);
    }
  };

  return (
    <section id="game" className="py-20 sm:py-32 px-4 bg-pink-500 text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
         {[...Array(10)].map((_, i) => (
           <div key={i} className="absolute text-white animate-pulse" style={{ 
             top: `${Math.random() * 100}%`, 
             left: `${Math.random() * 100}%`,
             transform: `scale(${Math.random() * 2 + 1})`
           }}><PawPrint size={48} /></div>
         ))}
      </div>

      <div className="container mx-auto max-w-5xl text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-white/20 backdrop-blur-md text-white rounded-full font-bold text-xs sm:text-sm mb-6 uppercase tracking-[0.2em]">
            <Brain size={16} /> Memory Challenge
          </div>
          <h2 className="font-bungee text-4xl sm:text-6xl mb-4 tracking-tighter drop-shadow-xl text-white uppercase">PIBBLE MATCH</h2>
          <p className="mb-8 sm:mb-14 font-cute text-xl sm:text-2xl opacity-90 max-w-xl mx-auto">Match the colored Pibble pairs to test your focus and earn the legendary boop. 🎀</p>
        </motion.div>
        
        <div className="flex justify-center gap-4 sm:gap-8 mb-10 sm:mb-16">
          <div className="bg-white/10 backdrop-blur-lg px-6 py-4 sm:px-10 sm:py-6 rounded-2xl sm:rounded-[2rem] border-2 border-white/20 shadow-2xl min-w-[120px] sm:min-w-[150px]">
            <p className="text-[9px] sm:text-[10px] uppercase font-black tracking-widest text-pink-200 mb-1">Moves</p>
            <p className="text-3xl sm:text-5xl font-bungee">{moves}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg px-6 py-4 sm:px-10 sm:py-6 rounded-2xl sm:rounded-[2rem] border-2 border-white/20 shadow-2xl min-w-[120px] sm:min-w-[150px]">
            <p className="text-[9px] sm:text-[10px] uppercase font-black tracking-widest text-pink-200 mb-1">Pairs</p>
            <p className="text-3xl sm:text-5xl font-bungee">{matches}<span className="text-xl sm:text-2xl opacity-50">/{COLORS.length}</span></p>
          </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-6 max-w-3xl mx-auto mb-12 sm:mb-16">
          {cards.map((card, idx) => (
            <div 
              key={`${card.id}-${idx}`}
              onClick={() => handleCardClick(idx)}
              className="aspect-square cursor-pointer perspective-1000 group h-full w-full"
            >
              <div 
                className={`relative w-full h-full transition-transform duration-500 preserve-3d shadow-xl rounded-xl sm:rounded-[2rem] ${card.isFlipped || card.isMatched ? 'rotate-y-180' : ''}`}
              >
                <div className="absolute inset-0 bg-white rounded-xl sm:rounded-[2rem] flex items-center justify-center border-2 sm:border-4 border-pink-100 backface-hidden overflow-hidden z-20">
                  <div className="absolute inset-0 bg-gradient-to-tr from-pink-50 to-white"></div>
                  <PawPrint size={32} className="sm:w-10 sm:h-10 text-pink-300 relative z-10 group-hover:scale-110 transition-transform" />
                </div>
                <div 
                  className="absolute inset-0 rounded-xl sm:rounded-[2rem] flex items-center justify-center border-2 sm:border-4 border-white rotate-y-180 backface-hidden z-10 overflow-hidden"
                  style={{ backgroundColor: card.color }}
                >
                  <img 
                    src={PIBBLE_LOGO_URL} 
                    alt="Pibble" 
                    className="w-[85%] h-[85%] object-cover rounded-full border-2 border-white/50" 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <AnimatePresence>
          {matches === COLORS.length && (
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white text-pink-500 p-8 sm:p-12 rounded-[2.5rem] sm:rounded-[4rem] shadow-2xl inline-block border-[6px] sm:border-[10px] border-pink-200 relative overflow-hidden mx-4"
            >
              <div className="relative z-10">
                <Trophy size={60} className="sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 text-yellow-400 drop-shadow-lg" />
                <p className="text-4xl sm:text-6xl font-bungee mb-6 sm:mb-8 leading-none uppercase">WAGTASTIC!</p>
                <button 
                  onClick={initGame}
                  className="px-10 py-5 sm:px-14 sm:py-6 bg-pink-500 text-white font-bungee text-xl sm:text-2xl rounded-2xl sm:rounded-3xl shadow-xl hover:bg-black transition-all flex items-center gap-4 mx-auto"
                >
                  <RefreshCcw size={24} /> Play Again
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MemoryGame;
