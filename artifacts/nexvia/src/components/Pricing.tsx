import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Pricing() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".pricing-title",
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
        cardsRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".pricing-grid",
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="pricing-title font-display text-4xl md:text-5xl font-bold mb-4">
            Simples. Sem surpresas.
          </h2>
          <p className="pricing-title text-xl text-muted-foreground">
            Começamos com um projeto. Ficamos com os resultados.
          </p>
        </div>

        <div className="pricing-grid grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Setup Card */}
          <div 
            ref={(el) => (cardsRef.current[0] = el)}
            className="p-8 md:p-10 border border-white/10 bg-card rounded-3xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="font-display text-8xl font-bold">01</span>
            </div>
            
            <h3 className="text-2xl font-bold mb-2">Setup</h3>
            <p className="text-muted-foreground mb-6">Implementação inicial</p>
            
            <div className="mb-8">
              <span className="text-4xl font-display font-bold">€500</span>
              <span className="text-muted-foreground"> a €2.000</span>
              <div className="text-sm text-primary mt-1 border border-primary/20 bg-primary/10 inline-block px-2 py-0.5 rounded">Pagamento único</div>
            </div>

            <ul className="space-y-4">
              {["Auditoria de processos", "Criação de fluxos de automação", "Configuração de CRM/Agendamento", "Landing pages e integrações"].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-white/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Retainer Card */}
          <div 
            ref={(el) => (cardsRef.current[1] = el)}
            className="p-8 md:p-10 border border-primary/30 bg-card rounded-3xl relative overflow-hidden group shadow-[0_0_30px_rgba(0,194,255,0.05)]"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity text-primary">
              <span className="font-display text-8xl font-bold">02</span>
            </div>
            
            <h3 className="text-2xl font-bold mb-2">Retainer Mensal</h3>
            <p className="text-muted-foreground mb-6">Manutenção e otimização</p>
            
            <div className="mb-8">
              <span className="text-4xl font-display font-bold">€300</span>
              <span className="text-muted-foreground"> a €800<span className="text-sm">/mês</span></span>
              <div className="text-sm border border-white/10 bg-white/5 inline-block px-2 py-0.5 rounded mt-1">Sem fidelização cega</div>
            </div>

            <ul className="space-y-4">
              {["Ajustes em tempo real", "Novos fluxos mensais", "Acompanhamento de métricas", "Suporte prioritário via WhatsApp"].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-white/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
