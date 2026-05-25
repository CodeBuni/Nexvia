import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export function Verticais() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -(track.scrollWidth - container.offsetWidth),
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${track.scrollWidth - container.offsetWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
    }, container);

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
    <section id="verticais" className="story-panel story-panel--violet py-28">
      <div className="container mx-auto px-6">
        <div className="neo-kicker vert-title mx-auto mb-6">03 / Nichos com margem</div>
        <h2 className="vert-title font-display text-3xl md:text-5xl font-bold mb-16 text-center">
          Especialistas no setor da saúde privada
        </h2>

        {/* Carrossel horizontal sóbrio */}
        <div
          ref={containerRef}
          className="relative w-full overflow-x-hidden"
          style={{ height: 320 }}
        >
          <div
            ref={trackRef}
            className="flex gap-8 will-change-transform"
            style={{ height: 300 }}
          >
            {verticals.map((v, i) => (
              <div
                key={i}
                className="neo-card p-8 min-w-[320px] max-w-xs text-center group hover:-translate-y-2 transition-transform duration-300"
              >
                <h3 className="font-display text-2xl font-bold mb-3 text-glow-primary">{v.title}</h3>
                <p className="text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
