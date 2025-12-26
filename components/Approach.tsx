
import React from 'react';

const Approach: React.FC = () => {
  const points = [
    {
      title: "Proceso activo",
      description: "La terapia es estructurada. No solo escucho; intervenimos activamente para generar cambios reales."
    },
    {
      title: "Compromiso",
      description: "Tareas semanales para integrar el cambio en tu vida diaria, más allá de la consulta."
    },
    {
      title: "Sin retenciones",
      description: "No busco retenerte innecesariamente. El objetivo es que logres avances en el menor tiempo posible."
    },
    {
      title: "Autonomía final",
      description: "Mi meta es que desarrolles herramientas propias para continuar tu proceso de forma independiente."
    }
  ];

  return (
    <section id="enfoque" className="pt-16 pb-24 bg-[#F8F7F3] scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="max-w-2xl">
          <span className="text-[#B2977B] font-bold tracking-[0.2em] uppercase text-[10px] mb-4 block">Metodología</span>
          <h2 className="text-3xl md:text-5xl font-semibold text-[#353C51] mb-6">Un proceso honesto y estructurado.</h2>
          <p className="text-lg text-[#353C51]/60 font-light leading-relaxed">
            Mi enfoque busca resultados reales basados en el compromiso mutuo y la constancia.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {points.map((point, index) => (
          <div key={index} className="group p-6 bg-white/50 backdrop-blur-sm rounded-sm border border-[#DDE6ED]/50 hover:bg-white transition-all">
            <div className="h-px w-12 bg-[#B2977B] mb-6 group-hover:w-full transition-all duration-500"></div>
            <h3 className="text-lg font-bold text-[#353C51] mb-3">{point.title}</h3>
            <p className="text-[#353C51]/70 text-sm leading-relaxed font-light">{point.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Approach;