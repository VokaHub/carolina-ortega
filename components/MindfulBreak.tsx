
import React, { useState, useEffect, useCallback, useRef } from 'react';

type BreakState = 'INTRO' | 'COUNTDOWN' | 'BREATHING' | 'AFFIRMATIONS' | 'COMPLETE';

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  phrase: string;
}

const AFFIRMATIONS = [
  "Me permito sentir lo que siento.",
  "Merezco paz y tranquilidad.",
  "Voy paso a paso, a mi ritmo.",
  "Soy suficiente, tal cual soy.",
  "Confío en mi propia resiliencia.",
  "Elijo ser amable con mi mente.",
  "Este momento difícil pasará.",
  "Inhalo calma, exhalo tensión.",
  "Mi bienestar es una prioridad.",
  "Estoy a salvo en este momento."
];

const MindfulBreak: React.FC<{ isOpen?: boolean; onClose?: () => void }> = ({ isOpen, onClose }) => {
  const [state, setState] = useState<BreakState>('INTRO');
  const [countdown, setCountdown] = useState(3);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [poppedCount, setPoppedCount] = useState(0);
  const [poppedAffirmation, setPoppedAffirmation] = useState<string | null>(null);
  const [breathPhase, setBreathPhase] = useState<'IN' | 'OUT'>('IN');
  const [breathCount, setBreathCount] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (state !== 'COUNTDOWN') return;
    
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setState('BREATHING');
    }
  }, [state, countdown]);

  useEffect(() => {
    if (state !== 'BREATHING') return;
    
    const interval = setInterval(() => {
      setBreathPhase(prev => {
        if (prev === 'IN') {
          return 'OUT';
        } else {
          setBreathCount(c => c + 1);
          return 'IN';
        }
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [state]);

  useEffect(() => {
    if (breathCount >= 3 && state === 'BREATHING') {
      timerRef.current = setTimeout(() => setState('AFFIRMATIONS'), 1000);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [breathCount, state]);

  const createBubble = useCallback(() => {
    return {
      id: Math.random(),
      size: Math.random() * 80 + 75, 
      x: Math.random() * 80 + 10,
      y: 115,
      // Velocidad aumentada aún más
      speed: Math.random() * 0.7 + 0.5,
      phrase: AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)]
    };
  }, []);

  useEffect(() => {
    if (state !== 'AFFIRMATIONS') {
      setBubbles([]);
      return;
    }

    // Creación de burbujas más frecuente (cada 450ms)
    const interval = setInterval(() => {
      setBubbles(prev => prev.length < 12 ? [...prev, createBubble()] : prev);
    }, 450);

    let frameId: number;
    const move = () => {
      setBubbles(prev => 
        prev
          .map(b => ({ ...b, y: b.y - b.speed }))
          .filter(b => b.y > -25)
      );
      frameId = requestAnimationFrame(move);
    };
    frameId = requestAnimationFrame(move);

    return () => {
      clearInterval(interval);
      cancelAnimationFrame(frameId);
    };
  }, [state, createBubble]);

  const popBubble = (bubble: Bubble) => {
    setPoppedAffirmation(bubble.phrase);
    setPoppedCount(prev => prev + 1);
    setBubbles(prev => prev.filter(b => b.id !== bubble.id));
    
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setPoppedAffirmation(null), 3000);
  };

  const handleFinish = () => {
    if (onClose) onClose();
    setTimeout(() => {
      const element = document.getElementById('final-cta');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 500);
  };

  if (isOpen === false) return null;

  return (
    <div className={`${isOpen ? 'fixed inset-0 z-[100] bg-[#F8F7F3]' : 'relative py-32 bg-white border-y border-[#DDE6ED]/50'} overflow-hidden flex flex-col items-center justify-center transition-all duration-700 min-h-[600px]`}>
      
      {isOpen && (
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center text-[#353C51]/20 hover:text-[#353C51] bg-white rounded-full shadow-sm hover:scale-110 active:scale-95 transition-all z-[110] border border-[#DDE6ED]"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth={2.5}/></svg>
        </button>
      )}

      <div className="max-w-3xl mx-auto px-6 text-center relative z-20 pointer-events-none select-none w-full flex flex-col items-center">
        
        {state === 'INTRO' && (
          <div className="animate-fade-in flex flex-col items-center">
            <div className="w-20 h-20 bg-[#B2977B]/10 rounded-full flex items-center justify-center mb-10 animate-pulse border border-[#B2977B]/20">
              <svg className="w-10 h-10 text-[#B2977B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21l-8-8a5 5 0 010-7.071 5 5 0 017.071 0L12 7.071l1.172-1.172a5 5 0 017.071 0 5 5 0 010 7.071l-8 8z" />
              </svg>
            </div>
            <span className="text-[#B2977B] font-black tracking-[0.4em] uppercase text-[10px] mb-6 block">Respiro Guiado</span>
            <h3 className="text-4xl md:text-7xl font-semibold text-[#353C51] mb-12 italic leading-tight text-balance">¿Hacemos una pausa para reencontrarte?</h3>
            <button 
              onClick={() => setState('COUNTDOWN')}
              className="pointer-events-auto px-16 py-6 bg-[#353C51] text-white text-[12px] uppercase tracking-[0.3em] font-black rounded-full shadow-2xl hover:bg-[#B2977B] transition-all transform active:scale-95"
            >
              Sí, lo necesito
            </button>
          </div>
        )}

        {state === 'COUNTDOWN' && (
          <div className="animate-fade-in flex flex-col items-center justify-center">
            <span className="text-[12px] uppercase tracking-[0.4em] font-black text-[#B2977B] mb-12">Suelta el aire y prepárate</span>
            <div className="text-[140px] md:text-[180px] font-semibold text-[#353C51] leading-none animate-countdown-zoom">
              {countdown}
            </div>
          </div>
        )}

        {state === 'BREATHING' && (
          <div className="animate-fade-in flex flex-col items-center justify-center w-full relative">
            <div className="flex items-center justify-center w-[300px] h-[300px] md:w-[450px] md:h-[450px] relative">
                <div className="absolute inset-0 rounded-full border border-[#B2977B]/5 scale-100"></div>
                <div className="absolute inset-0 rounded-full border border-[#B2977B]/10 scale-90"></div>
                <div className="absolute inset-0 rounded-full border border-[#B2977B]/20 scale-75"></div>
                
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`rounded-full border-[8px] border-[#B2977B]/20 flex items-center justify-center transition-all duration-[4000ms] ease-in-out shadow-xl ${breathPhase === 'IN' ? 'w-[85%] h-[85%] bg-[#B2977B]/10' : 'w-[45%] h-[45%] bg-white'}`}>
                        <span className={`text-[#B2977B] font-black uppercase tracking-[0.6em] text-sm md:text-lg transition-all duration-1000 ${breathPhase === 'IN' ? 'opacity-100 scale-110' : 'opacity-40 scale-90'}`}>
                            {breathPhase === 'IN' ? 'Inhala' : 'Exhala'}
                        </span>
                    </div>
                </div>
            </div>
            
            <div className="mt-20 flex flex-col items-center gap-6">
                <p className="text-[#353C51]/30 text-[10px] uppercase tracking-[0.4em] font-black italic">Respiración profunda ({breathCount}/3)</p>
                <div className="flex justify-center gap-4">
                    {[1,2,3].map(i => (
                        <div key={i} className={`w-14 h-1.5 rounded-full transition-all duration-1000 ${breathCount >= i ? 'bg-[#B2977B] shadow-[0_0_15px_rgba(178,151,123,0.5)]' : 'bg-[#DDE6ED]'}`}></div>
                    ))}
                </div>
            </div>
          </div>
        )}

        {state === 'AFFIRMATIONS' && (
          <div className="animate-fade-in min-h-[500px] flex flex-col justify-center items-center w-full">
            <div className="h-[200px] flex items-center justify-center mb-12 px-6 max-w-2xl">
              {poppedAffirmation ? (
                <p className="text-3xl md:text-5xl font-semibold text-[#B2977B] animate-pop-in leading-snug italic">
                  "{poppedAffirmation}"
                </p>
              ) : (
                <div className="space-y-6 animate-fade-in opacity-30 flex flex-col items-center">
                   <div className="w-14 h-14 rounded-full border-2 border-[#353C51] flex items-center justify-center animate-bounce">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>
                   </div>
                   <h3 className="text-2xl font-semibold text-[#353C51]">Libera el ruido mental</h3>
                   <p className="text-[10px] uppercase tracking-[0.4em] font-black max-w-xs leading-relaxed">Toca las burbujas para recibir un mensaje de paz</p>
                </div>
              )}
            </div>
            
            <div className="h-24 flex items-center">
                {poppedCount >= 5 && (
                    <div className="flex flex-col items-center gap-4 animate-fade-in-up">
                      <button 
                        onClick={() => setState('COMPLETE')}
                        className="pointer-events-auto px-16 py-6 bg-[#353C51] text-white text-[12px] uppercase tracking-[0.3em] font-black rounded-full shadow-[0_20px_40px_rgba(53,60,81,0.25)] hover:bg-[#B2977B] hover:-translate-y-1 transition-all active:scale-95"
                      >
                        Me siento listo/a para seguir
                      </button>
                    </div>
                )}
            </div>
            
            <div className="mt-8 flex flex-col items-center">
               <span className="text-[10px] uppercase tracking-widest font-black text-[#353C51]/20 mb-3">Progreso: {Math.min(poppedCount, 5)}/5 burbujas</span>
               <div className="w-56 h-1.5 bg-[#DDE6ED] rounded-full overflow-hidden">
                  <div className="h-full bg-[#B2977B] transition-all duration-700 ease-out" style={{ width: `${(Math.min(poppedCount, 5) / 5) * 100}%` }}></div>
               </div>
            </div>
          </div>
        )}

        {state === 'COMPLETE' && (
          <div className="animate-fade-in-up flex flex-col items-center max-w-xl">
            <div className="w-32 h-32 bg-[#B2977B]/10 rounded-full flex items-center justify-center mb-12 shadow-inner border border-[#B2977B]/10">
              <svg className="w-16 h-16 text-[#B2977B] animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-4xl md:text-7xl font-semibold text-[#353C51] mb-8 leading-[1.1] italic text-balance">Un respiro cambia tu perspectiva.</h3>
            <p className="text-[#353C51]/60 mb-16 text-xl md:text-2xl font-light leading-relaxed">¿Te sientes listo/a para dar el siguiente paso? Estoy aquí para caminar a tu lado.</p>
            <button 
              onClick={handleFinish}
              className="pointer-events-auto px-20 py-6 bg-[#353C51] text-white text-[12px] uppercase tracking-[0.3em] font-black rounded-full shadow-[0_30px_60px_-12px_rgba(53,60,81,0.3)] hover:bg-[#B2977B] transition-all transform active:scale-95"
            >
              Agendar mi sesión ahora
            </button>
          </div>
        )}
      </div>

      {state === 'AFFIRMATIONS' && (
        <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
          {bubbles.map(bubble => (
            <button
              key={bubble.id}
              onClick={() => popBubble(bubble)}
              className="absolute rounded-full border-[2px] border-[#B2977B]/40 bg-[#B2977B]/5 backdrop-blur-[4px] shadow-[0_10px_40px_rgba(178,151,123,0.15)] cursor-pointer flex items-center justify-center transition-transform hover:scale-110 active:scale-75 pointer-events-auto"
              style={{
                left: `${bubble.x}%`,
                top: `${bubble.y}%`,
                width: `${bubble.size}px`,
                height: `${bubble.size}px`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className="w-full h-full rounded-full bg-gradient-to-br from-white/50 via-transparent to-transparent opacity-40"></div>
              <div className="absolute top-[20%] left-[25%] w-[18%] h-[18%] bg-white/70 rounded-full blur-[2px]"></div>
            </button>
          ))}
        </div>
      )}

      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#F8F7F3] to-transparent z-0 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#F8F7F3] to-transparent z-0 pointer-events-none"></div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes countdown-zoom {
          0% { transform: scale(0.4); opacity: 0; filter: blur(10px); }
          50% { transform: scale(1.15); opacity: 1; filter: blur(0); }
          100% { transform: scale(1); opacity: 0.8; }
        }
        .animate-countdown-zoom { animation: countdown-zoom 1s ease-out infinite; }

        @keyframes pop-in {
          0% { opacity: 0; transform: translateY(20px) scale(0.9); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-pop-in { animation: pop-in 0.8s cubic-bezier(0.19, 1, 0.22, 1) forwards; }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(60px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 1.4s cubic-bezier(0.19, 1, 0.22, 1) forwards; }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 1.8s ease-out forwards; }
      `}} />
    </div>
  );
};

export default MindfulBreak;
