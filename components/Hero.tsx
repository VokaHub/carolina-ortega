
import React from 'react';

const Hero: React.FC = () => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden pt-16 pb-16 md:pt-24 md:pb-32 bg-[#F8F7F3]">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          {/* Se han eliminado los badges de modalidad para una entrada más limpia */}
          <h1 className="text-4xl md:text-7xl font-semibold text-[#353C51] leading-tight md:leading-[1.1] mb-6 md:mb-8">
            Entiende lo que te pasa, <span className="text-[#B2977B]">sin juicios.</span>
          </h1>
          <p className="text-lg md:text-2xl text-[#353C51]/80 mb-10 font-light leading-relaxed max-w-2xl">
            Acompañamiento profesional para adolescentes y adultos que buscan herramientas reales para su bienestar.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-20">
            <a 
              href="#recurso"
              onClick={(e) => handleScroll(e, 'recurso')}
              className="px-8 py-4 bg-[#353C51] text-[#F8F7F3] rounded-sm text-center font-medium hover:bg-[#353C51]/90 transition-all shadow-sm cursor-pointer text-sm tracking-wide"
            >
              Descargar guía gratuita
            </a>
            <a 
              href="#final-cta" 
              onClick={(e) => handleScroll(e, 'final-cta')}
              className="px-8 py-4 border border-[#353C51] text-[#353C51] rounded-sm text-center font-medium hover:bg-[#353C51]/5 transition-all cursor-pointer text-sm tracking-wide"
            >
              Agendar sesión
            </a>
          </div>
        </div>

        <div className="flex items-center gap-4 animate-bounce opacity-40">
          <a href="#sobre-mi" onClick={(e) => handleScroll(e, 'sobre-mi')} className="flex items-center gap-3">
            <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#353C51]">Trayectoria</span>
            <svg className="w-4 h-4 text-[#B2977B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </div>
      
      <div className="absolute -right-20 top-20 w-1/2 h-[500px] bg-[#DDE6ED]/20 rounded-full blur-[100px] -z-0 pointer-events-none" />
    </section>
  );
};

export default Hero;
