
import React, { useEffect } from 'react';
import { FeelingOption } from '../types';

interface ThankYouProps {
  feeling?: FeelingOption;
}

const ThankYou: React.FC<ThankYouProps> = ({ feeling }) => {
  /**
   * ID actualizado con el link del archivo ZIP proporcionado:
   * https://drive.google.com/file/d/1IfXC7ais9y8ty5Vx2p2GZGQT1kK646b2/view?usp=sharing
   */
  const FILE_ID = "1IfXC7ais9y8ty5Vx2p2GZGQT1kK646b2"; 
  const DOWNLOAD_LINK = `https://drive.google.com/uc?export=download&id=${FILE_ID}`;

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

  // Mensaje personalizado para WhatsApp que incluye la mención al descuento del 20%
  const whatsappMessage = encodeURIComponent(
    `Hola Carolina, acabo de descargar tu diario '100 preguntas para reencontrarte'. Me gustaría agendar mi primera sesión con el 20% de descuento. He estado sintiendo ${personalizedText} y busco acompañamiento.`
  );
  const WHATSAPP_URL = `https://wa.me/50232448037?text=${whatsappMessage}`;

  // Iniciar descarga automática al cargar el componente
  useEffect(() => {
    const timer = setTimeout(() => {
      // Al ser un link de export=download, el navegador lo procesa como descarga sin abandonar la página actual
      window.location.href = DOWNLOAD_LINK;
    }, 1500); 
    return () => clearTimeout(timer);
  }, [DOWNLOAD_LINK]);

  return (
    <div className="flex flex-col text-center bg-white">
      <div className="p-8 md:p-12">
        <div className="w-12 h-12 bg-[#DDE6ED] rounded-full flex items-center justify-center mx-auto mb-5">
          <svg className="w-6 h-6 text-[#353C51]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-semibold text-[#353C51] mb-3">
          Tu diario de autorreflexión está listo.
        </h2>
        
        <p className="text-[#353C51]/70 text-base md:text-lg font-light mb-8 max-w-lg mx-auto leading-relaxed">
          La descarga de <strong>"100 preguntas para reencontrarte"</strong> debería iniciar automáticamente.
        </p>

        <div className="max-w-[280px] mx-auto">
          <a 
            href={DOWNLOAD_LINK}
            className="w-full py-4 bg-[#B2977B] text-white font-bold rounded-sm hover:bg-[#B2977B]/90 transition-all shadow-lg flex items-center justify-center gap-3 uppercase tracking-widest text-[10px] active:scale-[0.98] cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Reintentar Descarga (.ZIP)
          </a>
          <p className="mt-4 text-[9px] text-[#353C51]/40 uppercase tracking-widest font-bold">Si no inicia, pulsa el botón de arriba</p>
        </div>
      </div>

      <div className="bg-[#DDE6ED]/40 p-8 md:p-10 border-t border-[#DDE6ED]">
        <div className="max-w-xl mx-auto">
          <p className="text-[#353C51] text-base md:text-lg font-medium mb-6 leading-relaxed italic">
            "Cuando sientas que es momento de profundizar en {personalizedText} con acompañamiento profesional, estoy aquí."
          </p>
          
          <div className="flex flex-col items-center gap-3">
            <a 
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
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
