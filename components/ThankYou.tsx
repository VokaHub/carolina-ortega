
import React from 'react';
import { FeelingOption } from '../types';

interface ThankYouProps {
  feeling?: FeelingOption;
}

const ThankYou: React.FC<ThankYouProps> = ({ feeling }) => {
  const DOWNLOAD_LINK = "#"; 

  const getPersonalizedFeeling = (f?: FeelingOption) => {
    switch (f) {
      case 'Ansiedad': return 'esa ansiedad';
      case 'Tristeza o desmotivación': return 'esa tristeza';
      case 'Enojo o irritabilidad': return 'ese enojo';
      case 'Estrés constante': return 'ese estrés';
      default: return 'lo que has estado sintiendo últimamente';
    }
  };

  const personalizedText = getPersonalizedFeeling(feeling);

  return (
    <div className="flex flex-col text-center bg-white">
      <div className="p-8 md:p-12">
        <div className="w-12 h-12 bg-[#DDE6ED] rounded-full flex items-center justify-center mx-auto mb-5">
          <svg className="w-6 h-6 text-[#353C51]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-semibold text-[#353C51] mb-3">
          Tu guía está lista.
        </h2>
        
        <p className="text-[#353C51]/70 text-base md:text-lg font-light mb-8 max-w-lg mx-auto leading-relaxed">
          Ya puedes descargar <strong>"100 preguntas para reencontrarte"</strong>. Espero que te ayude a girar la mirada hacia ti.
        </p>

        <div className="max-w-[220px] mx-auto">
          <a 
            href={DOWNLOAD_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 bg-[#B2977B] text-white font-bold rounded-sm hover:bg-[#B2977B]/90 transition-all shadow-lg flex items-center justify-center gap-3 uppercase tracking-widest text-[10px] active:scale-[0.98] cursor-pointer"
          >
            Descargar E-book
          </a>
        </div>
      </div>

      <div className="bg-[#DDE6ED]/40 p-8 md:p-10 border-t border-[#DDE6ED]">
        <div className="max-w-xl mx-auto">
          <p className="text-[#353C51] text-base md:text-lg font-medium mb-6 leading-relaxed italic">
            "Cuando sientas que es momento de profundizar en {personalizedText} con acompañamiento profesional, estoy aquí."
          </p>
          
          <div className="flex flex-col items-center gap-3">
            <a 
              href="https://wa.me/50232448037" 
              className="w-full max-w-[260px] py-4 px-6 bg-[#353C51] text-white font-semibold rounded-sm hover:bg-[#353C51]/90 transition-all shadow-lg flex items-center justify-center gap-3 text-[11px] uppercase tracking-widest cursor-pointer"
            >
              Agendar con 20% DTO
            </a>
            <span className="text-[#B2977B] text-[10px] font-black uppercase tracking-[0.2em] animate-pulse">
              Descuento aplicado automáticamente
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
