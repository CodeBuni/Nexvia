import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Workflow, LayoutTemplate, Smartphone } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Solucao() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".solucao-title",
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
        { opacity: 0, y: 60, rotate: -6 },
        {
          opacity: 1,
          y: 0,
          rotate: 0,
          duration: 0.7,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".cards-container",
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      title: "Automação de Processos",
      icon: <Workflow className="w-8 h-8 text-primary" />,
      desc: "Agendamento automático, lembretes SMS/email, follow-up pós-consulta, reativação de pacientes inativos, reviews automáticas."
    },
    {
      title: "Sites + Landing Pages",
      icon: <LayoutTemplate className="w-8 h-8 text-primary" />,
      desc: "Sites para clínicas, páginas de captura, SEO local, integração com sistemas de agendamento."
    },
    {
      title: "Apps de Nicho",
      icon: <Smartphone className="w-8 h-8 text-primary" />,
      desc: "Apps específicas por especialidade médica. Produto escalável e revendível."
    }
  ];

  return (
    <section id="servicos" ref={containerRef} className="story-panel py-32 relative">
      {/* Decorative gradient blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="neo-kicker solucao-title mx-auto mb-6">02 / Sistema operacional</div>
        <h2 className="solucao-title font-display text-4xl md:text-6xl font-bold mb-16 text-center">
          O que a Nexvia faz por si
        </h2>

        <div className="cards-container grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((srv, i) => (
              <div 
                key={i}
                ref={(el) => {
                  cardsRef.current[i] = el;
                }}
                className="neo-card p-8 flex flex-col items-start gap-6 transition-transform duration-300 hover:-translate-y-2 group"
            >
              <div className="p-4 rounded-xl bg-primary/10 group-hover:scale-110 transition-transform duration-300">
                {srv.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold font-display mb-3">{srv.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  {srv.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
