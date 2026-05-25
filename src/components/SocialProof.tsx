import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function SocialProof() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".proof-el",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="story-panel story-panel--violet py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="neo-kicker proof-el mx-auto mb-6">06 / Prova</div>
          <h2 className="proof-el font-display text-4xl md:text-5xl font-bold mb-4">
            Resultados reais. Clínicas reais.
          </h2>
          <p className="proof-el text-muted-foreground text-sm">
            [Em breve — casos de sucesso reais]
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {[1, 2].map((i) => (
            <div key={i} className="proof-el neo-card p-8 flex flex-col gap-6">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-lg text-white/90 italic leading-relaxed">
                "A Nexvia transformou completamente a forma como gerimos os agendamentos. Reduzimos as faltas em 40% só com a automação de lembretes e o sistema de follow-up."
              </p>
              <div className="flex items-center gap-4 mt-auto pt-4 border-t border-white/10">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center font-display font-bold">
                  {i === 1 ? "D" : "E"}
                </div>
                <div>
                  <h4 className="font-bold">Clínica Confidencial</h4>
                  <p className="text-sm text-muted-foreground">
                    {i === 1 ? "Clínica Dentária" : "Clínica de Estética Médica"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
