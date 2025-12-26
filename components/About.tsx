
import React from 'react';

const About: React.FC = () => {
  return (
    <section id="sobre-mi" className="pt-24 pb-12 bg-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="relative">
            <img 
              src="https://raw.githubusercontent.com/VokaHub/psicologa-Carol-Ortega/main/WhatsApp%20Image%202025-12-25%20at%2011.22.06%20PM.jpeg" 
              alt="Carolina Ortega" 
              className="w-full h-auto rounded-sm shadow-xl object-cover aspect-[4/5]"
            />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#B2977B] -z-10 hidden md:block" />
          </div>
          <div className="py-8">
            <span className="text-[#B2977B] font-bold tracking-[0.2em] uppercase text-[11px] mb-4 block">Psicóloga Clínica</span>
            <h2 className="text-4xl md:text-5xl font-semibold mb-8 text-[#353C51]">Carolina Ortega</h2>
            <div className="space-y-6 text-[#353C51]/80 text-lg font-light leading-relaxed">
              <p>
                Con más de 10 años de trayectoria, acompaño a personas en su camino hacia el equilibrio emocional.
              </p>
              <p>
                Especializada en <strong>terapia cognitivo-conductual</strong>: un enfoque práctico, científico y centrado en soluciones para transformar pensamientos y conductas limitantes.
              </p>
              <div className="pt-4">
                <p className="font-semibold text-[#353C51] mb-6 text-sm uppercase tracking-widest">Acompañamiento en:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-base border-b border-[#DDE6ED] pb-8 mb-8">
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B2977B]" /> Ansiedad
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B2977B]" /> Depresión
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B2977B]" /> Duelo
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B2977B]" /> Rupturas de pareja
                  </div>
                </div>

                {/* Información de modalidad integrada aquí para mayor sentido contextual */}
                <div className="flex flex-wrap items-center gap-6 md:gap-8 text-[11px] uppercase tracking-[0.2em] font-bold text-[#353C51]/40">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full border border-[#B2977B]"></div>
                    Atención Presencial
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full border border-[#B2977B]"></div>
                    Atención Online
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
