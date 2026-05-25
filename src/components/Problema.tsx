import { useEffect, useRef } from "react";
import gsap from "gsap";
import { applyReveal } from "../lib/cinematicScroll";

export function Problema() {
  const containerRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation (cinematic preset)
      applyReveal(
        ".section-title",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
        },
        { start: "top 80%", end: "bottom 35%" }
      );

      // List items animation (cinematic preset)
      itemsRef.current.forEach((item, index) => {
        if (!item) return;
        applyReveal(
          item,
          { opacity: 0, x: index % 2 === 0 ? -48 : 48, y: 54 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.9,
            ease: "power2.out",
          },
          { start: "top 82%", end: "bottom 30%" }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const problems = [
    "Pacientes que não voltam porque ninguém os contactou",
    "Horas perdidas em agendamentos manuais e chamadas",
    "Sem sistema. Sem previsibilidade. Sem crescimento."
  ];

  return (
    <section id="problema" ref={containerRef} className="story-panel story-panel--ink py-32 grain-bg relative">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="neo-kicker section-title mb-8">01 / Fuga invisível</div>
        <h2 className="section-title font-display text-3xl md:text-6xl font-extrabold mb-20 text-center md:text-left text-glow-primary">
          A maioria das clínicas <span className="text-primary text-glow-primary">perde dinheiro</span> sem saber
        </h2>

        <div className="flex flex-col gap-12">
          {problems.map((prob, i) => (
            <div 
              key={i} 
              ref={(el) => {
                itemsRef.current[i] = el;
              }}
              className="neo-story-card flex items-start gap-6 md:gap-10 group"
            >
              <div className="flex flex-col items-center justify-center pt-2">
                <div className="w-0.5 h-16 md:h-24 rounded-full bg-primary shadow-[0_0_16px_2px_rgba(79,110,247,0.4)] mb-2" />
                <div className="w-0.5 h-8 md:h-12 rounded-full bg-accent shadow-[0_0_12px_1px_rgba(123,94,248,0.3)]" />
              </div>
              <div className="font-display text-5xl md:text-7xl font-bold text-white/10 group-hover:text-primary/30 transition-colors duration-500">
                0{i + 1}
              </div>
              <p className="text-xl md:text-3xl font-medium pt-2 md:pt-4 text-foreground/80">
                {prob}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
