
import React, { useState, useEffect } from 'react';

const FinalCTA: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mensaje predeterminado para el botón de agendar sesión
  const whatsappMessage = encodeURIComponent(
    "Hola Carolina, me gustaría agendar una sesión. Vi tu página y me interesa iniciar mi proceso terapéutico contigo para trabajar en mi bienestar. ¿Podrías darme información sobre los horarios disponibles y el descuento de la primera sesión?"
  );
  const WHATSAPP_URL = `https://wa.me/50232448037?text=${whatsappMessage}`;

  // Bloquear scroll cuando el modal está abierto
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  return (
    <section id="final-cta" className="py-24 border-t border-[#DDE6ED] scroll-mt-24 bg-white relative">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <span className="inline-block bg-[#DDE6ED] text-[#353C51] text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-8">
          ¿Hablamos?
        </span>
        <h3 className="text-3xl md:text-5xl font-semibold text-[#353C51] mb-6 leading-tight">
          Sientes que es momento de dar el paso.
        </h3>
        <p className="text-lg md:text-xl text-[#353C51]/70 font-light mb-12 leading-relaxed max-w-2xl mx-auto text-balance">
          Si buscas un espacio seguro para procesar tu situación actual, estoy aquí para acompañarte.
        </p>
        
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <a 
              href={WHATSAPP_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-4 px-8 py-5 bg-[#353C51] text-white rounded-sm font-semibold hover:bg-[#353C51]/95 transition-all shadow-xl active:scale-[0.98] w-full sm:w-auto min-w-[280px]"
            >
              <span className="text-xs uppercase tracking-widest">Agendar Cita Presencial</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>

            <button 
              onClick={() => setIsModalOpen(true)}
              className="group inline-flex items-center justify-center gap-4 px-8 py-5 border border-[#353C51] text-[#353C51] bg-white rounded-sm font-semibold hover:bg-[#353C51]/5 transition-all shadow-md active:scale-[0.98] w-full sm:w-auto min-w-[280px] cursor-pointer"
            >
              <span className="text-xs uppercase tracking-widest">Agendar Cita Virtual</span>
            </button>
          </div>

          <div className="text-[#B2977B] text-[11px] font-bold uppercase tracking-[0.2em]">
            20% de descuento en tu primera sesión
          </div>
        </div>
      </div>

      {/* Modal para Cita Virtual */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-[#353C51]/80 backdrop-blur-sm animate-fade-in"
            onClick={() => setIsModalOpen(false)}
          ></div>
          
          <div className="bg-white w-full max-w-5xl rounded-sm shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh] animate-pop-in">
            <div className="flex items-center justify-between p-4 border-b border-[#DDE6ED] bg-[#F8F7F3]">
               <span className="text-[#353C51] font-bold text-xs uppercase tracking-widest">Agendar Cita Virtual</span>
               <button 
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 flex items-center justify-center text-[#353C51] hover:bg-[#DDE6ED] rounded-full transition-colors cursor-pointer"
               >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth={2}/></svg>
               </button>
            </div>
            <div className="flex-1 overflow-y-auto bg-white">
                <iframe 
                  src="https://spaces.vokahub.com/citasonline?is_widget=1&view=compact&specific-meeting-type=1" 
                  style={{ width: '100%', height: '650px', border: 'none', display: 'block' }}
                  title="Calendario de Citas"
                />
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        @keyframes pop-in { from { opacity: 0; transform: scale(0.95) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        .animate-pop-in { animation: pop-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}} />
    </section>
  );
};

export default FinalCTA;
