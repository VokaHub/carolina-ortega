import React, { useState, useEffect, useRef } from 'react';
import MindfulBreak from './MindfulBreak';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isBreakOpen, setIsBreakOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0); 
  const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(window.scrollY / totalScroll, 1);
      setScrollProgress(progress);
    };

    const updateEyePosition = (clientX: number, clientY: number) => {
      if (blobRef.current) {
        const rect = blobRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const dx = clientX - centerX;
        const dy = clientY - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        const maxMove = 3.5;
        const moveX = (dx / (distance || 1)) * Math.min(distance / 50, maxMove);
        const moveY = (dy / (distance || 1)) * Math.min(distance / 50, maxMove);
        
        setPupilPos({ x: moveX, y: moveY });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      updateEyePosition(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        updateEyePosition(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const getStage = () => {
    if (scrollProgress < 0.20) return 0; 
    if (scrollProgress < 0.45) return 1; 
    if (scrollProgress < 0.75) return 2; 
    return 3; 
  };

  const stage = getStage();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7F3] selection:bg-[#B2977B]/30 antialiased">
      <header className="sticky top-0 z-50 bg-[#F8F7F3]/90 backdrop-blur-md border-b border-[#353C51]/5 h-20 md:h-24 flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full flex items-center">
          <img 
            src="https://raw.githubusercontent.com/VokaHub/psicologa-Carol-Ortega/main/Branding%20%20Clinica%20Psicologica.png" 
            alt="Logo" 
            className="h-16 md:h-20 w-auto object-contain transform translate-y-2.5"
          />
        </div>
      </header>

      <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[60] flex flex-col items-center group">
        <button 
          onClick={() => setIsBreakOpen(true)}
          className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-95 outline-none touch-none"
        >
          <div className="absolute inset-0 bg-[#FFD24D]/15 rounded-full animate-pulse-slow"></div>
          
          <div 
            ref={blobRef}
            className={`
              relative w-[90%] h-[90%] bg-[#FFD24D] rounded-[45%_55%_70%_30%_/_50%_45%_55%_50%] shadow-xl flex items-center justify-center
              transition-all duration-700 border-[3px] border-white/50 animate-organic-blob
            `}
          >
            <div className="relative w-full h-full flex flex-col items-center justify-start transform translate-y-3">
              <svg className="w-[65%] h-[65%]" viewBox="0 0 100 100">
                <g className="transition-all duration-75" style={{ transform: `translate(${pupilPos.x}px, ${pupilPos.y}px)` }}>
                  {stage < 3 ? (
                    <>
                      <circle cx="35" cy="18" r="4.5" fill="#353C51" />
                      <circle cx="65" cy="18" r="4.5" fill="#353C51" />
                    </>
                  ) : (
                    <>
                      <path d="M28 20 Q35 12 42 20" stroke="#353C51" strokeWidth="6" strokeLinecap="round" fill="none" className="animate-pop-in" />
                      <path d="M58 20 Q65 12 72 20" stroke="#353C51" strokeWidth="6" strokeLinecap="round" fill="none" className="animate-pop-in" />
                    </>
                  )}
                </g>

                <g className="transition-all duration-500">
                   {stage === 0 && (
                     <path d="M44 32 L56 32" stroke="#353C51" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                   )}
                   {stage === 1 && (
                     <path d="M42 32 Q50 35 58 32" stroke="#353C51" strokeWidth="3" strokeLinecap="round" fill="none" />
                   )}
                   {stage === 2 && (
                     <path d="M38 31 Q50 45 62 31" stroke="#353C51" strokeWidth="4.5" strokeLinecap="round" fill="none" className="animate-pop-in" />
                   )}
                   {stage === 3 && (
                     <path d="M30 28 Q50 62 70 28 Z" fill="white" className="animate-pop-in shadow-sm" />
                   )}
                </g>

                <circle cx="18" cy="28" r="5" fill="#FF8A65" className="transition-opacity duration-1000" style={{ opacity: stage >= 1 ? 0.35 : 0 }} />
                <circle cx="82" cy="28" r="5" fill="#FF8A65" className="transition-opacity duration-1000" style={{ opacity: stage >= 1 ? 0.35 : 0 }} />
              </svg>
            </div>
          </div>
        </button>
        
        {/* Texto 'Tócame' con opacidad incrementada de /60 a /90 para mayor fuerza visual */}
        <span className="mt-3 text-[10px] uppercase tracking-[0.4em] font-black text-[#353C51]/90 group-hover:text-[#353C51] transition-all select-none">
          Tócame
        </span>
      </div>

      {isBreakOpen && <MindfulBreak isOpen={true} onClose={() => setIsBreakOpen(false)} />}

      <main className="flex-grow">{children}</main>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes organic-blob {
          0%, 100% { border-radius: 45% 55% 70% 30% / 50% 45% 55% 50%; }
          33% { border-radius: 55% 45% 40% 60% / 45% 55% 50% 50%; }
          66% { border-radius: 50% 50% 60% 40% / 40% 60% 45% 55%; }
        }
        .animate-organic-blob { animation: organic-blob 12s infinite ease-in-out; }

        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.35); opacity: 0.2; }
        }
        .animate-pulse-slow { animation: pulse-slow 6s infinite ease-in-out; }

        @keyframes pop-in {
          0% { opacity: 0; transform: scale(0.6); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-pop-in { animation: pop-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
      `}} />
    </div>
  );
};

export default Layout;
