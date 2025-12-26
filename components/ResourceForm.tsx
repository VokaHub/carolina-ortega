
import React, { useState } from 'react';
import { FeelingOption, FormData as FormDataType } from '../types';
import ThankYou from './ThankYou';

const ResourceForm: React.FC = () => {
  const [formData, setFormData] = useState<FormDataType>({
    email: '',
    feeling: 'Ansiedad'
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  /**
   * CONFIGURACIÓN DEL FORMULARIO DE GOOGLE:
   * IDs validados del enlace proporcionado por el usuario.
   */
  const FORM_ID = "1FAIpQLSdiulvO_ILcYbU3ikZet_U96tnQbvZeuo3RYjbJU3Mv3RsSmQ";
  const ID_EMAIL = "entry.281206423"; 
  const ID_SENTIMIENTO = "entry.266669482"; 
  
  const GOOGLE_FORM_ACTION = `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`;

  const handleSubmit = () => {
    // 1. Iniciamos el estado de carga visual
    setLoading(true);

    /**
     * 2. LÓGICA DE TRANSICIÓN PREDICTIVA:
     * El formulario se envía de forma nativa al iframe oculto (target="hidden_google_frame").
     * En lugar de esperar un evento 'onLoad' que puede fallar por políticas de seguridad,
     * disparamos el cambio de UI tras 1 segundo, tiempo suficiente para que el POST se inicie.
     */
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      
      // 3. Scroll suave para centrar la confirmación
      const element = document.getElementById('recurso');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 1000);
  };

  const options: FeelingOption[] = [
    'Ansiedad',
    'Tristeza o desmotivación',
    'Enojo o irritabilidad',
    'Estrés constante',
    'No estoy segura/o'
  ];

  return (
    <section id="recurso" className="py-20 bg-[#F8F7F3] scroll-mt-24">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* IFRAME SILENCIOSO: Recibe el envío sin interferir con la UI de React */}
        <iframe
          name="hidden_google_frame"
          id="hidden_google_frame"
          style={{ display: 'none' }}
          title="Envío de Formulario"
        ></iframe>

        {submitted ? (
          <div className="bg-white rounded-sm shadow-2xl border border-[#DDE6ED] overflow-hidden animate-fade-in">
            <ThankYou feeling={formData.feeling} />
          </div>
        ) : (
          <div className="bg-[#353C51] rounded-sm overflow-hidden flex flex-col shadow-2xl">
            {/* Cabecera del recurso */}
            <div className="p-10 md:p-12 text-center border-b border-white/5">
              <span className="text-[#B2977B] font-bold tracking-[0.2em] uppercase text-[9px] mb-3 block">Recurso Gratuito</span>
              <h2 className="text-[#F8F7F3] text-3xl md:text-5xl font-semibold mb-5 italic">100 preguntas para reencontrarte.</h2>
              <p className="text-[#F8F7F3]/70 text-base md:text-lg font-light max-w-lg mx-auto leading-relaxed">
                Una guía de autorreflexión diseñada para ayudarte a recuperar tu centro y sanar tras una ruptura.
              </p>
            </div>

            {/* Formulario de captura */}
            <div className="bg-white p-8 md:p-12">
              <form 
                action={GOOGLE_FORM_ACTION}
                method="POST"
                target="hidden_google_frame"
                onSubmit={handleSubmit}
                className="max-w-md mx-auto space-y-6"
              >
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest font-bold text-[#353C51]/40">Tu mejor Email</label>
                  <input 
                    type="email" 
                    name={ID_EMAIL}
                    required
                    placeholder="tu@email.com"
                    className="w-full py-3 border-b border-[#DDE6ED] focus:border-[#B2977B] outline-none text-base bg-transparent rounded-none transition-colors"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest font-bold text-[#353C51]/40">¿Qué has sentido más últimamente?</label>
                  <div className="relative">
                    <select 
                      name={ID_SENTIMIENTO}
                      required
                      className="w-full py-3 border-b border-[#DDE6ED] focus:border-[#B2977B] outline-none bg-transparent appearance-none rounded-none text-base text-[#353C51]"
                      value={formData.feeling}
                      onChange={(e) => setFormData({...formData, feeling: e.target.value as FeelingOption})}
                    >
                      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[#B2977B] pointer-events-none">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth={2}/></svg>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-5 pt-2">
                  <button 
                    type="submit" 
                    disabled={loading} 
                    className="w-full py-5 bg-[#353C51] text-white font-medium rounded-sm hover:bg-[#353C51]/95 transition-all text-xs tracking-widest uppercase disabled:opacity-70 shadow-lg cursor-pointer active:scale-[0.98]"
                  >
                    {loading ? 'Preparando tu guía...' : 'Recibir e-book gratuito'}
                  </button>
                  
                  <div className="text-center space-y-3">
                    <p className="text-[10px] text-[#353C51]/50 leading-relaxed max-w-[340px] mx-auto">
                      Al descargar aceptas recibir contenido terapéutico y novedades.
                    </p>
                    <p className="text-[9px] text-[#B2977B] uppercase tracking-[0.2em] font-black">🔒 Privacidad 100% garantizada</p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
      `}} />
    </section>
  );
};

export default ResourceForm;
