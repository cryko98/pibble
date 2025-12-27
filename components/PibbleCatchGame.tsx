
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, RefreshCcw, Heart, Star, Zap, MousePointer2, Fingerprint, MoveHorizontal } from 'lucide-react';
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
  const startTimeRef = useRef<number>(0);
  
  const lastPointerX = useRef<number | null>(null);

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
    setPibbleX(50);
    lastPointerX.current = null;
    startTimeRef.current = performance.now();
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
    const elapsedSeconds = (currentTime - startTimeRef.current) / 1000;
    
    // Difficulty logic: spawn rate decreases as score and time increase
    // Base rate 1800ms, drops faster as time goes on
    const difficultyFactor = (elapsedSeconds * 20) + (score / 2);
    const spawnRate = Math.max(250, 1800 - difficultyFactor); 

    if (currentTime - spawnTimerRef.current > spawnRate) {
      // Progressive spawning: spawn more items at once as difficulty increases
      // 1 item initially, up to 4 items simultaneously at very high difficulty
      const spawnCount = Math.min(4, 1 + Math.floor(elapsedSeconds / 45) + Math.floor(score / 2000));
      
      const newItems: GameItem[] = [];
      for (let i = 0; i < spawnCount; i++) {
        newItems.push({
          id: Date.now() + Math.random() + i,
          x: Math.random() * 80 + 10,
          y: -10 - (i * 15), // Stagger multi-spawned items vertically
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 8,
          // Gravity also increases slightly over time
          fallSpeed: 0.35 + (Math.random() * 0.2) + Math.min(score / 1500, 0.5) + Math.min(elapsedSeconds / 300, 0.3),
        });
      }
      
      setItems(prev => [...prev, ...newItems]);
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
          item.y > 80 && 
          item.y < 95 && 
          Math.abs(item.x - pibbleX) < 12;

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
    }
  }, [lives, gameState]);

  useEffect(() => {
    if (gameState === 'playing') {
      lastTimeRef.current = performance.now();
      requestRef.current = requestAnimationFrame(updateGame);
      return () => {
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
      };
    }
  }, [gameState, updateGame]);

  // Instant Desktop Movement
  const handleMouseMove = (e: React.MouseEvent) => {
    if (gameState === 'playing') {
      const rect = gameRef.current?.getBoundingClientRect();
      if (rect) {
        const relativeX = ((e.clientX - rect.left) / rect.width) * 100;
        setPibbleX(Math.min(Math.max(relativeX, 10), 90));
      }
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    lastPointerX.current = e.touches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (gameState === 'playing') {
      const rect = gameRef.current?.getBoundingClientRect();
      if (rect) {
        const currentTouchX = e.touches[0].clientX;
        if (lastPointerX.current !== null) {
          const deltaX = currentTouchX - lastPointerX.current;
          const percentDelta = (deltaX / rect.width) * 100;
          const sensitivity = 1.2; 
          
          setPibbleX(prev => {
            const nextX = prev + (percentDelta * sensitivity);
            return Math.min(Math.max(nextX, 10), 90);
          });
        }
        lastPointerX.current = currentTouchX;
      }
    }
  };

  const onPointerEnd = () => {
    lastPointerX.current = null;
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
          <p className="font-cute text-lg sm:text-2xl text-gray-500 max-w-xl mx-auto">Instant response! Catch the cookies as they fall faster and faster. 🍪</p>
        </div>

        <div 
          ref={gameRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={onPointerEnd}
          onMouseUp={onPointerEnd}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onPointerEnd}
          className={`relative h-[500px] sm:h-[650px] w-full max-w-4xl mx-auto bg-gradient-to-b from-blue-50 to-pink-50 rounded-[2rem] sm:rounded-[4rem] border-[6px] sm:border-[12px] border-white shadow-2xl overflow-hidden touch-none transition-colors duration-300 ${isShaking ? 'animate-[shake_0.3s_ease-in-out_infinite]' : ''} ${isRedFlash ? 'bg-red-100' : ''} cursor-none`}
        >
          {/* HUD Overlay */}
          <div className="absolute top-4 sm:top-10 left-4 sm:left-10 z-40 flex flex-col gap-2 sm:gap-4 pointer-events-none">
            <div className="font-bungee text-3xl sm:text-5xl text-pink-500 drop-shadow-sm flex items-center gap-2 sm:gap-4">
               <div className="bg-white p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-md border border-pink-100"><Star className="fill-pink-500 w-6 h-6 sm:w-8 sm:h-8" /></div>
               {score}
            </div>
            
            <div className="flex gap-1.5 sm:gap-2 bg-white/70 backdrop-blur-md p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-sm w-fit border border-pink-50">
              {[...Array(3)].map((_, i) => (
                <Heart 
                  key={i} 
                  size={20} 
                  className={`sm:w-7 sm:h-7 transition-all duration-300 ${i < lives ? "text-red-500 fill-red-500 scale-110" : "text-gray-300 scale-90 opacity-40"}`} 
                />
              ))}
            </div>
          </div>

          {gameState === 'idle' && (
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/70 backdrop-blur-md p-6 text-center">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="relative mb-8 sm:mb-12"
              >
                <img src={PIBBLE_LOGO_URL} className="w-32 h-32 sm:w-48 sm:h-48 rounded-full border-4 sm:border-8 border-white shadow-2xl" alt="Pibble" />
              </motion.div>
              <button 
                onClick={startGame}
                className="px-10 py-5 sm:px-16 sm:py-8 bg-pink-500 text-white font-bungee text-2xl sm:text-4xl rounded-[1.5rem] sm:rounded-[2.5rem] shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-4"
              >
                START GAME
              </button>
              <div className="mt-8 grid grid-cols-2 gap-6 font-cute text-sm sm:text-xl text-pink-600 font-bold uppercase tracking-wide bg-white/40 p-4 rounded-3xl">
                <div className="flex flex-col items-center gap-2">
                  <MousePointer2 size={24} />
                  <span>Desktop: Move mouse (Instant)</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Fingerprint size={24} />
                  <span>Mobile: Swipe left/right</span>
                </div>
              </div>
            </div>
          )}

          {gameState === 'playing' && (
            <>
              {/* Particle Effects */}
              {particles.map(p => (
                <div key={p.id} className="absolute rounded-full pointer-events-none" style={{ left: `${p.x}%`, top: `${p.y}%`, width: 8, height: 8, backgroundColor: p.color, opacity: p.life, transform: 'translate(-50%, -50%)' }} />
              ))}
              
              {/* Floating Score Popups */}
              <AnimatePresence>
                {popups.map(p => (
                  <motion.div 
                    key={p.id} 
                    initial={{ opacity: 0, y: 0, scale: 0.5 }} 
                    animate={{ opacity: 1, y: -80, scale: 1.2 }} 
                    exit={{ opacity: 0 }} 
                    className="absolute font-bungee text-2xl sm:text-4xl z-40 pointer-events-none drop-shadow-lg" 
                    style={{ left: `${p.x}%`, top: `${p.y}%`, color: p.color, transform: 'translateX(-50%)' }}
                  >
                    {p.text}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Falling Snacks */}
              {items.map(item => (
                <div 
                  key={item.id} 
                  className="absolute pointer-events-none text-5xl sm:text-7xl drop-shadow-md" 
                  style={{ 
                    left: `${item.x}%`, 
                    top: `${item.y}%`, 
                    transform: `translate(-50%, -50%) rotate(${item.rotation}deg)` 
                  }}
                >
                  🍪
                </div>
              ))}

              {/* Instant Catcher - Direct style update for zero lag */}
              <div 
                className="absolute bottom-8 sm:bottom-12 z-30 pointer-events-none"
                style={{ 
                    left: `${pibbleX}%`, 
                    transform: 'translateX(-50%)',
                    transition: 'none'
                }}
              >
                <div className="relative">
                   {combo > 3 && (
                     <motion.div 
                        initial={{ scale: 0, y: 20 }} 
                        animate={{ scale: 1, y: 0 }} 
                        className="absolute -top-12 sm:-top-16 left-1/2 -translate-x-1/2 font-bungee text-yellow-500 text-lg sm:text-3xl whitespace-nowrap bg-white/90 px-4 sm:px-6 py-1 sm:py-2 rounded-2xl shadow-xl border-2 border-yellow-100 flex items-center gap-2"
                     >
                        <Zap size={20} className="fill-yellow-500" /> {combo} COMBO!
                     </motion.div>
                   )}
                   <img src={PIBBLE_LOGO_URL} alt="Pibble" className="w-20 h-20 sm:w-32 sm:h-32 rounded-full border-4 sm:border-[10px] border-white shadow-2xl relative z-10" />
                   <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-black/10 rounded-full blur-md -z-10"></div>
                </div>
              </div>
              
              {/* Target Guide line */}
              <div 
                className="hidden lg:block absolute bottom-0 pointer-events-none opacity-10"
                style={{ 
                    left: `${pibbleX}%`, 
                    width: '2px', 
                    height: '100%', 
                    transform: 'translateX(-50%)', 
                    backgroundColor: '#FF69B4'
                }}
              />
            </>
          )}

          {gameState === 'ended' && (
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-pink-500 text-white text-center p-8">
              <Trophy size={80} className="sm:w-40 sm:h-40 mb-6 sm:mb-8 text-yellow-300 drop-shadow-2xl" />
              <h3 className="font-bungee text-4xl sm:text-8xl mb-4 uppercase leading-none">NAP TIME!</h3>
              <div className="bg-white/10 backdrop-blur-lg px-8 py-4 sm:px-16 sm:py-8 rounded-[1.5rem] sm:rounded-[3rem] mb-8 sm:mb-12 border border-white/20 shadow-2xl">
                <p className="font-cute text-xl sm:text-3xl mb-1 opacity-80 uppercase tracking-widest">Score</p>
                <p className="font-bungee text-7xl sm:text-9xl tracking-tighter">{score}</p>
              </div>
              <button 
                onClick={startGame}
                className="px-12 py-6 sm:px-20 sm:py-8 bg-white text-pink-500 font-bungee text-2xl sm:text-4xl rounded-[1.5rem] sm:rounded-[3rem] shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-6"
              >
                <RefreshCcw size={32} /> RETRY
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px) rotate(-2deg); }
          75% { transform: translateX(8px) rotate(2deg); }
        }
      `}</style>
    </section>
  );
};

export default PibbleCatchGame;
