
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
    <section className="relative overflow-hidden pt-4 pb-16 md:pt-12 md:pb-32 bg-[#F8F7F3]">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          {/* Badge Restaurado: Diseño original de pastilla con divisor */}
          <div className="inline-flex items-center gap-4 px-4 py-2 bg-white border border-[#DDE6ED] rounded-full mb-8 shadow-sm">
            <div className="flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-[#B2977B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="text-[9px] uppercase tracking-[0.15em] font-bold text-[#353C51]/60 text-nowrap">Presencial</span>
            </div>
            <div className="w-px h-3 bg-[#DDE6ED]"></div>
            <div className="flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-[#B2977B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span className="text-[9px] uppercase tracking-[0.15em] font-bold text-[#353C51]/60 text-nowrap">En línea</span>
            </div>
          </div>
          
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
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#353C51]">Trayectoria</span>
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
