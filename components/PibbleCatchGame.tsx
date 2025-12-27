
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, RefreshCcw, Heart, Star, Zap, MousePointer2, Fingerprint } from 'lucide-react';
import { PIBBLE_LOGO_URL } from '../constants';

interface GameItem {
  id: number;
  x: number;
  y: number;
  rotation: number;
  rotationSpeed: number;
  fallSpeed: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  vx: number;
  vy: number;
  life: number;
}

interface PopupScore {
  id: number;
  x: number;
  y: number;
  text: string;
  color: string;
}

const PibbleCatchGame: React.FC = () => {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'ended'>('idle');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [items, setItems] = useState<GameItem[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [popups, setPopups] = useState<PopupScore[]>([]);
  const [pibbleX, setPibbleX] = useState(50);
  const [combo, setCombo] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [isRedFlash, setIsRedFlash] = useState(false);
  
  const gameRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);
  const spawnTimerRef = useRef<number>(0);

  const requestLock = () => {
    // Only lock on desktop
    if (gameRef.current && window.innerWidth > 768 && 'pointerLockElement' in document === false) {
      gameRef.current.requestPointerLock();
    }
  };

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setLives(3);
    setItems([]);
    setParticles([]);
    setPopups([]);
    setCombo(0);
    setIsShaking(false);
    setIsRedFlash(false);
    
    if (window.innerWidth > 768) {
      setTimeout(() => {
          gameRef.current?.requestPointerLock?.();
      }, 100);
    }
  };

  const createParticles = (x: number, y: number, color: string) => {
    const newParticles: Particle[] = Array.from({ length: 6 }).map((_, i) => ({
      id: Date.now() + i + Math.random(),
      x,
      y,
      color,
      vx: (Math.random() - 0.5) * 8,
      vy: (Math.random() - 0.5) * 8,
      life: 1,
    }));
    setParticles(prev => [...prev, ...newParticles]);
  };

  const addPopup = (x: number, y: number, text: string, color: string) => {
    const id = Date.now() + Math.random();
    setPopups(prev => [...prev, { id, x, y, text, color }]);
    setTimeout(() => {
      setPopups(prev => prev.filter(p => p.id !== id));
    }, 1500);
  };

  const spawnItem = useCallback((currentTime: number) => {
    const spawnRate = Math.max(800, 1800 - Math.min(score / 5, 1000)); 

    if (currentTime - spawnTimerRef.current > spawnRate) {
      const newItem: GameItem = {
        id: Date.now() + Math.random(),
        x: Math.random() * 90 + 5,
        y: -10,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 6,
        fallSpeed: 0.3 + (Math.random() * 0.2) + (score > 100 ? 0.1 : 0),
      };
      setItems(prev => [...prev, newItem]);
      spawnTimerRef.current = currentTime;
    }
  }, [score]);

  const updateGame = useCallback((time: number) => {
    if (gameState !== 'playing') return;

    setParticles(prev => prev
      .map(p => ({
        ...p,
        x: p.x + p.vx,
        y: p.y + p.vy,
        vy: p.vy + 0.3,
        life: p.life - 0.03
      }))
      .filter(p => p.life > 0)
    );

    setItems(prev => {
      const updated = prev.map(item => ({
        ...item,
        y: item.y + item.fallSpeed,
        rotation: item.rotation + item.rotationSpeed
      }));

      const remaining: GameItem[] = [];
      updated.forEach(item => {
        const isCaught = 
          item.y > 83 && 
          item.y < 93 && 
          Math.abs(item.x - pibbleX) < 10;

        if (isCaught) {
          const points = 10;
          const comboBonus = Math.floor(combo / 3) * 5;
          const finalPoints = points + comboBonus;
          
          setScore(s => s + finalPoints);
          setCombo(c => c + 1);
          createParticles(item.x, item.y, '#FACC15');
          addPopup(item.x, item.y - 5, `+${finalPoints}`, '#FACC15');
        } else if (item.y >= 100) {
          setCombo(0);
          setIsShaking(true);
          setIsRedFlash(true);
          setLives(l => l - 1);
          setTimeout(() => {
            setIsShaking(false);
            setIsRedFlash(false);
          }, 300);
          addPopup(item.x, 95, "MISSED!", "#EF4444");
        } else {
          remaining.push(item);
        }
      });
      return remaining;
    });

    spawnItem(time);
    lastTimeRef.current = time;
    requestRef.current = requestAnimationFrame(updateGame);
  }, [gameState, pibbleX, spawnItem, combo]);

  useEffect(() => {
    if (lives <= 0 && gameState === 'playing') {
      setGameState('ended');
      if (document.pointerLockElement) document.exitPointerLock();
    }
  }, [lives, gameState]);

  useEffect(() => {
    if (gameState === 'playing') {
      lastTimeRef.current = performance.now();
      requestRef.current = requestAnimationFrame(updateGame);
      
      const handlePointerMove = (e: MouseEvent) => {
        if (document.pointerLockElement === gameRef.current) {
          setPibbleX(prev => {
            const sensitivity = 0.15;
            const nextX = prev + (e.movementX * sensitivity);
            return Math.min(Math.max(nextX, 10), 90);
          });
        }
      };

      document.addEventListener('mousemove', handlePointerMove);
      return () => {
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
        document.removeEventListener('mousemove', handlePointerMove);
      };
    }
  }, [gameState, updateGame]);

  const onMouseMoveFallback = (e: React.MouseEvent) => {
    if (gameState === 'playing' && !document.pointerLockElement) {
        const rect = gameRef.current?.getBoundingClientRect();
        if (rect) {
            const relativeX = ((e.clientX - rect.left) / rect.width) * 100;
            setPibbleX(Math.min(Math.max(relativeX, 10), 90));
        }
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (gameState === 'playing') {
      const rect = gameRef.current?.getBoundingClientRect();
      if (rect) {
        const relativeX = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
        setPibbleX(Math.min(Math.max(relativeX, 10), 90));
      }
    }
  };

  return (
    <section id="snack-game" className="py-20 sm:py-32 px-4 bg-white relative overflow-hidden">
      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-6 py-2 bg-pink-500 text-white rounded-full font-bold text-xs sm:text-sm mb-4 sm:mb-6 uppercase tracking-[0.2em] shadow-lg"
          >
            <Zap size={16} fill="white" /> DON'T MISS A CRUMB
          </motion.div>
          <h2 className="font-bungee text-4xl sm:text-6xl text-pink-500 mb-4 tracking-tighter drop-shadow-sm uppercase">SNACK CATCHER</h2>
          <p className="font-cute text-lg sm:text-2xl text-gray-500 max-w-xl mx-auto">Catch every cookie! Every missed snack costs you 1 life. 🍪</p>
        </div>

        <div 
          ref={gameRef}
          onMouseMove={onMouseMoveFallback}
          onTouchMove={onTouchMove}
          onClick={requestLock}
          className={`relative h-[500px] sm:h-[650px] w-full max-w-4xl mx-auto bg-gradient-to-b from-blue-50 to-pink-50 rounded-[2rem] sm:rounded-[4rem] border-[6px] sm:border-[12px] border-white shadow-2xl overflow-hidden touch-none transition-colors duration-300 ${isShaking ? 'animate-[shake_0.3s_ease-in-out_infinite]' : ''} ${isRedFlash ? 'bg-red-100' : ''} ${gameState === 'playing' ? 'cursor-none' : 'cursor-default'}`}
        >
          {/* HUD */}
          <div className="absolute top-4 sm:top-10 left-4 sm:left-10 z-40 flex flex-col gap-2 sm:gap-4 pointer-events-none">
            <div className="font-bungee text-3xl sm:text-5xl text-pink-500 drop-shadow-sm flex items-center gap-2 sm:gap-4">
               <div className="bg-white p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-md"><Star className="fill-pink-500 w-6 h-6 sm:w-8 sm:h-8" /></div>
               {score}
            </div>
            
            <div className="flex gap-1.5 sm:gap-2 bg-white/50 backdrop-blur-sm p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-sm w-fit">
              {[...Array(3)].map((_, i) => (
                <Heart 
                  key={i} 
                  size={20} 
                  className={`sm:w-7 sm:h-7 ${i < lives ? "text-red-500 fill-red-500" : "text-gray-300"}`} 
                />
              ))}
            </div>
          </div>

          {gameState === 'idle' && (
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/60 backdrop-blur-md p-6 text-center">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="relative mb-8 sm:mb-12"
              >
                <img src={PIBBLE_LOGO_URL} className="w-32 h-32 sm:w-48 sm:h-48 rounded-full border-4 sm:border-8 border-white shadow-2xl" alt="Pibble" />
              </motion.div>
              <button 
                onClick={startGame}
                className="px-10 py-5 sm:px-16 sm:py-8 bg-pink-500 text-white font-bungee text-2xl sm:text-4xl rounded-[1.5rem] sm:rounded-[2.5rem] shadow-xl hover:scale-110 transition-all flex items-center gap-4"
              >
                START GAME
              </button>
              <div className="mt-6 flex flex-col gap-2 font-cute text-sm sm:text-xl text-pink-600 font-bold uppercase tracking-wide">
                <p className="flex items-center justify-center gap-2"><MousePointer2 size={18} /> Desktop: Move mouse to play</p>
                <p className="flex items-center justify-center gap-2"><Fingerprint size={18} /> Mobile: Slide finger to play</p>
              </div>
            </div>
          )}

          {gameState === 'playing' && (
            <>
              {particles.map(p => (
                <div key={p.id} className="absolute rounded-full pointer-events-none" style={{ left: `${p.x}%`, top: `${p.y}%`, width: 8, height: 8, backgroundColor: p.color, opacity: p.life, transform: 'translate(-50%, -50%)' }} />
              ))}
              <AnimatePresence>
                {popups.map(p => (
                  <motion.div key={p.id} initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1, y: -50 }} exit={{ opacity: 0 }} className="absolute font-bungee text-2xl sm:text-3xl z-40 pointer-events-none" style={{ left: `${p.x}%`, top: `${p.y}%`, color: p.color, transform: 'translateX(-50%)' }}>{p.text}</motion.div>
                ))}
              </AnimatePresence>

              {items.map(item => (
                <div 
                  key={item.id} 
                  className="absolute pointer-events-none text-4xl sm:text-6xl" 
                  style={{ 
                    left: `${item.x}%`, 
                    top: `${item.y}%`, 
                    transform: `translate(-50%, -50%) rotate(${item.rotation}deg)` 
                  }}
                >
                  🍪
                </div>
              ))}

              <motion.div 
                className="absolute bottom-8 sm:bottom-12 z-30"
                style={{ left: `${pibbleX}%`, transform: 'translateX(-50%)' }}
              >
                <div className="relative">
                   {combo > 3 && (
                     <motion.div 
                        initial={{ scale: 0 }} 
                        animate={{ scale: 1 }} 
                        className="absolute -top-10 sm:-top-12 left-1/2 -translate-x-1/2 font-bungee text-yellow-500 text-lg sm:text-2xl whitespace-nowrap bg-white/80 px-3 sm:px-4 py-1 rounded-xl shadow-sm"
                     >
                        x{combo} COMBO!
                     </motion.div>
                   )}
                   <img src={PIBBLE_LOGO_URL} alt="Pibble" className="w-20 h-20 sm:w-28 sm:h-28 rounded-full border-4 sm:border-8 border-white shadow-2xl relative z-10" />
                   <div className="absolute -top-4 left-0 w-full h-4 bg-pink-400/20 rounded-full blur-sm -z-10"></div>
                </div>
              </motion.div>
            </>
          )}

          {gameState === 'ended' && (
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-pink-500 text-white text-center p-8">
              <Trophy size={80} className="sm:w-32 sm:h-32 mb-6 sm:mb-8 text-yellow-300 drop-shadow-2xl" />
              <h3 className="font-bungee text-4xl sm:text-7xl mb-4 uppercase">NAP TIME</h3>
              <div className="bg-white/20 px-8 py-4 sm:px-12 sm:py-6 rounded-[1.5rem] sm:rounded-[2.5rem] mb-8 sm:mb-12">
                <p className="font-cute text-xl sm:text-2xl mb-1">Total Cookies Caught</p>
                <p className="font-bungee text-6xl sm:text-8xl">{score}</p>
              </div>
              <button 
                onClick={startGame}
                className="px-10 py-5 sm:px-16 sm:py-7 bg-white text-pink-500 font-bungee text-xl sm:text-3xl rounded-[1.5rem] sm:rounded-[2.5rem] shadow-2xl hover:scale-105 transition-all flex items-center gap-4"
              >
                <RefreshCcw size={24} /> RETRY
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-6px) rotate(-1.5deg); }
          75% { transform: translateX(6px) rotate(1.5deg); }
        }
      `}</style>
    </section>
  );
};

export default PibbleCatchGame;
