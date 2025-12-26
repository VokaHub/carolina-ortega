
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#353C51] text-[#F8F7F3]/60 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-16 mb-16">
          {/* Identidad con Logo más grande */}
          <div className="flex flex-col gap-4">
            <img 
              src="https://raw.githubusercontent.com/VokaHub/psicologa-Carol-Ortega/main/Branding%20%20Clinica%20Psicologica.png" 
              alt="Carolina Ortega Logo" 
              className="h-24 md:h-28 w-auto object-contain self-start brightness-0 invert"
            />
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#B2977B] font-bold block">Psicóloga Clínica</span>
          </div>

          {/* Contacto directo (Sin enlaces) */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-[10px] tracking-widest border-b border-white/10 pb-2 inline-block">Contacto</h4>
            <div className="text-sm space-y-4 font-light">
              <p className="flex items-center gap-3">
                <span className="text-[#B2977B] font-bold">WhatsApp:</span> +1 234 567 890
              </p>
              <p className="flex items-center gap-3">
                <span className="text-[#B2977B] font-bold">Email:</span> contacto@carolinaortega.com
              </p>
            </div>
          </div>

          {/* Privacidad simple */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-[10px] tracking-widest border-b border-white/10 pb-2 inline-block">Confidencialidad</h4>
            <p className="text-sm leading-relaxed font-light mb-4">
              La privacidad está segura. Este es un espacio de absoluta confianza y ética profesional.
            </p>
            <span className="text-[10px] uppercase tracking-widest text-[#B2977B] font-bold">Privacidad garantizada</span>
          </div>
        </div>

        {/* Barra inferior estática */}
        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] uppercase tracking-[0.2em] font-bold opacity-40">
          <p>© {new Date().getFullYear()} Carolina Ortega. Todos los derechos reservados.</p>
          <p>Aviso legal y privacidad</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
