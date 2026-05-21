import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function VetScribe() {
  const containerRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".vet-title-group",
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
        cardRef.current,
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="vetscribe" ref={containerRef} className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="vet-title-group max-w-2xl mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Já construímos o nosso próprio produto.
          </h2>
          <p className="text-xl text-muted-foreground">
            A Nexvia não vende só serviços. Desenvolve produtos reais para o setor da saúde.
          </p>
        </div>

        <div 
          ref={cardRef}
          className="relative bg-card border border-[#4DFFB4]/20 rounded-3xl p-8 md:p-12 overflow-hidden shadow-[0_0_50px_rgba(77,255,180,0.05)] hover:shadow-[0_0_80px_rgba(77,255,180,0.1)] transition-shadow duration-500"
        >
          {/* Abstract Waveform Background */}
          <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none overflow-hidden flex items-center justify-end">
            <svg viewBox="0 0 800 400" className="w-full h-full object-cover origin-right scale-150 text-[#4DFFB4]" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M0,200 C100,100 200,300 300,200 C400,100 500,300 600,200 C700,100 800,300 800,200" strokeDasharray="10 10">
                <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" repeatCount="indefinite" />
              </path>
              <path d="M0,250 C150,150 250,350 400,250 C550,150 650,350 800,250" strokeDasharray="15 15" opacity="0.5">
                <animate attributeName="stroke-dashoffset" from="0" to="100" dur="3s" repeatCount="indefinite" />
              </path>
              <path d="M0,150 C120,50 220,250 350,150 C480,50 580,250 800,150" strokeDasharray="5 5" opacity="0.3">
                <animate attributeName="stroke-dashoffset" from="50" to="0" dur="4s" repeatCount="indefinite" />
              </path>
            </svg>
          </div>

          <div className="relative z-10 max-w-3xl">
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#4DFFB4]/10 text-[#4DFFB4] border border-[#4DFFB4]/20 text-sm font-semibold mb-6">
              Produto lançado
            </div>
            
            <h3 className="font-display text-3xl md:text-5xl font-bold mb-6 text-glow-green text-white">
              VetScribe — IA para clínicas veterinárias
            </h3>
            
            <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8">
              Grava a consulta e a IA gera automaticamente o prontuário SOAP, relatórios para tutores e atestados. Transforma áudio, notas e documentos em relatórios completos com templates personalizáveis. Poupe horas de papelada.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              {["IA", "Veterinária", "Automação", "SOAP", "Templates"].map(tag => (
                <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-sm text-white/60">
                  {tag}
                </span>
              ))}
            </div>

            <a 
              href="#" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#4DFFB4] text-black font-bold rounded-full hover:bg-white transition-colors"
              data-testid="link-vetscribe"
            >
              Ver VetScribe <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </div>
      <section id="vetscribe" ref={containerRef} className="py-32 relative overflow-hidden grain-bg bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-6">
          <div className="vet-title-group max-w-2xl mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-accent text-glow-accent">
              Já construímos o nosso próprio produto.
            </h2>
            <p className="text-xl text-muted-foreground">
              A Nexvia não vende só serviços. Desenvolve produtos reais para o setor da saúde.
            </p>
          </div>

          <div 
            ref={cardRef}
            className="relative bg-card border border-accent/40 rounded-3xl p-8 md:p-12 overflow-hidden shadow-[0_0_50px_rgba(123,94,248,0.08)] hover:shadow-[0_0_80px_rgba(123,94,248,0.15)] transition-shadow duration-500"
          >
            {/* Abstract Waveform Background */}
            <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none overflow-hidden flex items-center justify-end">
              <svg viewBox="0 0 800 400" className="w-full h-full object-cover origin-right scale-150 text-accent" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M0,200 C100,100 200,300 300,200 C400,100 500,300 600,200 C700,100 800,300 800,200" strokeDasharray="10 10">
                  <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" repeatCount="indefinite" />
                </path>
                <path d="M0,250 C150,150 250,350 400,250 C550,150 650,350 800,250" strokeDasharray="15 15" opacity="0.5">
                  <animate attributeName="stroke-dashoffset" from="0" to="100" dur="3s" repeatCount="indefinite" />
                </path>
                <path d="M0,150 C120,50 220,250 350,150 C480,50 580,250 800,150" strokeDasharray="5 5" opacity="0.3">
                  <animate attributeName="stroke-dashoffset" from="50" to="0" dur="4s" repeatCount="indefinite" />
                </path>
              </svg>
            </div>

            <div className="relative z-10 max-w-3xl">
              <div className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent border border-accent/30 text-sm font-semibold mb-6">
                Produto lançado
              </div>
            
              <h3 className="font-display text-3xl md:text-5xl font-bold mb-6 text-glow-accent text-accent">
                VetScribe — <span className="text-primary text-glow-primary">IA para clínicas veterinárias</span>
              </h3>
            
              <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8">
                Grava a consulta e a IA gera automaticamente o prontuário SOAP, relatórios para tutores e atestados. Transforma áudio, notas e documentos em relatórios completos com templates personalizáveis. Poupe horas de papelada.
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                {[
                  "IA", "Veterinária", "Automação", "SOAP", "Templates"
                ].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-accent/10 border border-accent/30 rounded-md text-sm text-accent">
                    {tag}
                  </span>
                ))}
              </div>

              <a 
                href="#" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-bold rounded-full hover:glow-primary transition-all"
                data-testid="link-vetscribe"
              >
                Ver VetScribe <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
