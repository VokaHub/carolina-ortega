
import React from 'react';

const FinalCTA: React.FC = () => {
  return (
    <section id="final-cta" className="py-24 border-t border-[#DDE6ED] scroll-mt-24 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <span className="inline-block bg-[#DDE6ED] text-[#353C51] text-[9px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-8">
          ¿Hablamos?
        </span>
        <h3 className="text-3xl md:text-5xl font-semibold text-[#353C51] mb-6 leading-tight">
          Sientes que es momento de dar el paso.
        </h3>
        <p className="text-lg md:text-xl text-[#353C51]/70 font-light mb-12 leading-relaxed max-w-2xl mx-auto text-balance">
          Si buscas un espacio seguro para procesar tu situación actual, estoy aquí para acompañarte.
        </p>
        
        <div className="flex flex-col items-center gap-6">
          <a 
            href="https://wa.me/1234567890" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-4 px-10 py-5 bg-[#353C51] text-white rounded-sm font-semibold hover:bg-[#353C51]/95 transition-all shadow-xl active:scale-[0.98]"
          >
            <span className="text-xs uppercase tracking-widest">Agendar vía WhatsApp</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <div className="text-[#B2977B] text-[10px] font-bold uppercase tracking-[0.2em]">
            20% de descuento en tu primera sesión
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
