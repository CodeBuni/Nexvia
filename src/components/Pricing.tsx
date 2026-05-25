import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    number: "01",
    title: "Setup",
    subtitle: "Implementação inicial",
    price: "€500",
    suffix: " a €2.000",
    badge: "Pagamento único",
    accent: "primary",
    features: [
      "Auditoria de processos",
      "Criação de fluxos de automação",
      "Configuração de CRM e agendamento",
      "Landing pages e integrações",
    ],
  },
  {
    number: "02",
    title: "Retainer Mensal",
    subtitle: "Manutenção e otimização",
    price: "€300",
    suffix: " a €800/mês",
    badge: "Sem fidelização cega",
    accent: "accent",
    features: [
      "Ajustes em tempo real",
      "Novos fluxos mensais",
      "Acompanhamento de métricas",
      "Suporte prioritário via WhatsApp",
    ],
  },
];

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
        },
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
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="pricing" ref={containerRef} className="story-panel relative px-6 py-28 md:py-40">
      <div className="mx-auto max-w-6xl">
        <div className="pricing-title mb-14 max-w-3xl">
          <p className="neo-kicker mb-6">05 / Investimento</p>
          <h2 className="font-display text-4xl font-black leading-tight md:text-7xl">
            Simples, transparente e pensado para crescer.
          </h2>
        </div>

        <div className="pricing-grid grid gap-6 md:grid-cols-2">
          {plans.map((plan, index) => {
            const isPrimary = plan.accent === "primary";

            return (
              <div
                key={plan.title}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className={`neo-card group relative overflow-hidden p-8 transition-all duration-300 hover:-translate-y-2 md:p-10 ${
                  isPrimary
                    ? "hover:shadow-[14px_14px_0_var(--neo-blue)]"
                    : "hover:shadow-[14px_14px_0_var(--neo-violet)]"
                }`}
              >
                <div
                  className={`absolute right-8 top-6 font-display text-8xl font-bold opacity-5 transition-opacity group-hover:opacity-10 ${
                    isPrimary ? "text-primary" : "text-accent"
                  }`}
                >
                  {plan.number}
                </div>

                <div className="relative">
                  <h3 className="mb-2 text-2xl font-bold">{plan.title}</h3>
                  <p className="mb-8 text-muted-foreground">{plan.subtitle}</p>

                  <div className="mb-8">
                    <span className="font-display text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.suffix}</span>
                    <div
                      className={`mt-2 inline-block rounded border px-2 py-0.5 text-sm ${
                        isPrimary
                          ? "border-primary/20 bg-primary/10 text-primary"
                          : "border-white/10 bg-white/5 text-muted-foreground"
                      }`}
                    >
                      {plan.badge}
                    </div>
                  </div>

                  <ul className="mb-10 space-y-4">
                    {plan.features.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                        <span className="text-white/80">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <a href="#contacto" className="neo-button inline-flex text-base">
                    Escolher
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
