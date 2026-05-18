import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Verticais() {
  const containerRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".vert-title",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        itemsRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".vert-grid",
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const verticals = [
    {
      emoji: "🦷",
      title: "Dentistas",
      desc: "Agendamento, lembretes e retenção. Prioridade máxima."
    },
    {
      emoji: "💉",
      title: "Estética Médica",
      desc: "Margens altas. Upsell e retenção com automação."
    },
    {
      emoji: "🧠",
      title: "Fisio + Psicólogos",
      desc: "Volume de sessões repetidas. Follow-up com ROI imediato."
    }
  ];

  return (
    <section ref={containerRef} className="py-24 border-t border-white/5 bg-[#0d0d14]">
      <div className="container mx-auto px-6">
        <h2 className="vert-title font-display text-3xl md:text-4xl font-bold mb-16 text-center">
          Especialistas no setor da saúde privada
        </h2>

        <div className="vert-grid grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 max-w-5xl mx-auto">
          {verticals.map((v, i) => (
            <div 
              key={i}
              ref={(el) => (itemsRef.current[i] = el)}
              className="p-8 border border-white/10 rounded-2xl bg-card/50 hover:bg-card hover:border-primary/20 transition-all text-center group"
            >
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform inline-block">
                {v.emoji}
              </div>
              <h3 className="font-display text-2xl font-bold mb-3">{v.title}</h3>
              <p className="text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
