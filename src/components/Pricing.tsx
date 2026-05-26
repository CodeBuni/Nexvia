import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Clock, FileText, MessageCircle, Zap, Shield } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Pricing() {
  const containerRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const decorationRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      
      // Kicker
      gsap.fromTo(
        ".pricing-kicker",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 72%",
          },
        }
      );

      // Título
      gsap.fromTo(
        ".pricing-title",
        { opacity: 0, y: 40, filter: "blur(2px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 72%",
          },
        }
      );

      // Linhas decorativas
      decorationRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 1,
            duration: 0.8,
            delay: 0.3 + i * 0.2,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: container,
              start: "top 72%",
            },
          }
        );
      });

      // Card principal
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 80, scale: 0.92 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            delay: 0.5,
            ease: "back.out(1.6)",
            scrollTrigger: {
              trigger: container,
              start: "top 72%",
            },
          }
        );
      }

      // Sombra sólida
      gsap.fromTo(
        ".neo-shadow-solid",
        { opacity: 0, x: -15, y: -15 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.7,
          delay: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 72%",
          },
        }
      );

      // Badge
      gsap.fromTo(
        ".pricing-badge",
        { opacity: 0, scale: 0.5, rotation: -10 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.6,
          delay: 0.9,
          ease: "elastic.out(1, 0.6)",
          scrollTrigger: {
            trigger: container,
            start: "top 72%",
          },
        }
      );

      // Texto
      gsap.fromTo(
        ".pricing-proposal-text",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 1.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container,
            start: "top 72%",
          },
        }
      );

      // Steps
      stepRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, x: -30, scale: 0.95 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.5,
            delay: 1.3 + i * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: container,
              start: "top 72%",
            },
          }
        );
      });

      // CTA
      gsap.fromTo(
        ".pricing-cta",
        { opacity: 0, y: 20, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: 1.8,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: container,
            start: "top 72%",
          },
        }
      );

      // Elementos geométricos
      gsap.fromTo(
        ".geo-element",
        { opacity: 0, rotation: -45, scale: 0 },
        {
          opacity: 0.06,
          rotation: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 75%",
          },
        }
      );

    }, container); // scope é o container

    return () => {
      ctx.revert(); // limpa todas as animações e ScrollTriggers
    };
  }, []);

  const steps = [
    { 
      number: "01", 
      icon: MessageCircle, 
      title: "Conversa inicial",
      desc: "Percebemos o que precisa. Sem compromisso.",
    },
    { 
      number: "02", 
      icon: FileText, 
      title: "Proposta detalhada",
      desc: "Enviada em 24h. Transparente, sem letras pequenas.",
    },
    { 
      number: "03", 
      icon: Zap, 
      title: "Implementação",
      desc: "Tudo configurado. Começa a ver resultados.",
    },
  ];

  return (
    <section
      id="pricing"
      ref={containerRef}
      className="relative px-6 py-32 md:py-44 bg-[#0A0A0F] overflow-hidden"
    >
      {/* Fundo: elementos geométricos */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="geo-element absolute top-16 left-12 w-20 h-20 border-2 border-primary/20 rotate-12" />
        <div className="geo-element absolute top-32 right-16 w-14 h-14 border-2 border-accent/20 -rotate-6" />
        <div className="geo-element absolute bottom-24 left-20 w-24 h-24 border-2 border-primary/10 rotate-45" />
        <div className="geo-element absolute bottom-12 right-12 w-16 h-16 border-2 border-white/10 -rotate-12" />
        <div className="geo-element absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-white/[0.02] rounded-full" />
        <div className="geo-element absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 border border-white/[0.015] rounded-full" />
        
        <div 
          ref={(el) => { decorationRefs.current[0] = el; }}
          className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent"
        />
        <div 
          ref={(el) => { decorationRefs.current[1] = el; }}
          className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/8 to-transparent"
        />
      </div>

      <div className="mx-auto max-w-5xl relative z-10">
        
        {/* Cabeçalho */}
        <div className="mb-16 md:mb-20">
          <p className="pricing-kicker text-xs font-mono text-primary/60 tracking-[0.2em] uppercase mb-4">
            Investimento
          </p>
          <h2 className="pricing-title font-display text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05]">
            Cada clínica é diferente.
            <br />
            <span className="text-primary">O preço também.</span>
          </h2>
        </div>

        {/* Card principal */}
        <div ref={cardRef} className="relative max-w-3xl">
          
          <div className="neo-shadow-solid absolute inset-0 bg-primary/15 translate-x-4 translate-y-4 pointer-events-none" style={{ zIndex: -1 }} />

          <div className="relative bg-[#0d0d14] border-2 border-white/10 p-8 md:p-12">
            
            <div className="pricing-badge inline-flex items-center gap-2 px-4 py-2 border-2 border-primary/40 bg-primary/5 mb-8">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold text-primary tracking-wider uppercase">
                Transparência total
              </span>
            </div>

            <p className="pricing-proposal-text text-xl md:text-2xl font-bold text-white mb-12 leading-relaxed">
              Fale connosco e receba uma proposta adaptada à sua clínica.
              <span className="block text-white/50 font-normal text-base md:text-lg mt-2">
                Sem valores escondidos. Sem surpresas.
              </span>
            </p>

            <div className="space-y-3 mb-12">
              {steps.map((step, i) => (
                <div
                  key={i}
                  ref={(el) => { stepRefs.current[i] = el; }}
                  className="group flex items-center gap-4 p-4 border border-white/5 hover:border-primary/20 transition-all duration-300"
                >
                  <span className="font-mono text-2xl font-bold text-white/10 group-hover:text-primary/30 transition-colors duration-300 min-w-[2rem]">
                    {step.number}
                  </span>

                  <div className="w-10 h-10 flex items-center justify-center border border-white/10 group-hover:border-primary/30 group-hover:bg-primary/5 transition-all duration-300 shrink-0">
                    <step.icon className="w-5 h-5 text-primary/70 group-hover:text-primary transition-colors duration-300" />
                  </div>

                  <div>
                    <h4 className="font-bold text-white/80 group-hover:text-white transition-colors duration-300 text-sm md:text-base">
                      {step.title}
                    </h4>
                    <p className="text-white/40 text-xs md:text-sm mt-0.5">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <a
                href="#contacto"
                className="pricing-cta inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-bold text-base border-2 border-primary hover:bg-primary/90 transition-colors group"
              >
                Pedir Proposta
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>

              <div className="flex items-center gap-2 text-white/25 text-xs">
                <Clock size={14} />
                <span>Resposta em até 24h úteis</span>
              </div>
            </div>

          </div>
        </div>

        <div className="mt-12 flex items-center gap-3 text-white/15 text-xs">
          <Shield size={14} />
          <span>Zero compromisso. Zero pressão. Apenas uma conversa.</span>
        </div>

      </div>
    </section>
  );
}