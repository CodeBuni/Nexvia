import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Mic, FileText, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { icon: Mic, label: "Grava a consulta" },
  { icon: Sparkles, label: "A IA estrutura o SOAP" },
  { icon: FileText, label: "Entrega relatórios prontos" },
];

export function VetScribe() {
  const containerRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".vet-title-group",
        { opacity: 0, y: 40 },
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
        cardRef.current,
        { opacity: 0, rotate: -2, y: 80 },
        {
          opacity: 1,
          rotate: 0,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
          },
        },
      );

      gsap.to(".wave-path", {
        xPercent: -12,
        repeat: -1,
        yoyo: true,
        duration: 2.8,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="vetscribe" ref={containerRef} className="story-panel story-panel--product relative overflow-hidden py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
      <div className="container mx-auto px-6">
        <div className="vet-title-group mb-16 max-w-3xl">
          <div className="neo-kicker mb-6">04 / Produto próprio</div>
          <h2 className="font-display mb-5 text-4xl font-black leading-tight md:text-6xl">
            Já construímos software real para saúde.
          </h2>
          <p className="text-xl text-muted-foreground">
            A Nexvia não vende só serviços. Desenvolve produtos de IA, automação e operação para equipas clínicas.
          </p>
        </div>

        <div ref={cardRef} className="neo-product-card relative overflow-hidden p-8 md:p-12">
          <div className="absolute right-[-12%] top-[-18%] h-72 w-72 rounded-full border-[28px] border-accent/25" />
          <div className="absolute bottom-[-18%] left-[-10%] h-64 w-64 rounded-full border-[24px] border-primary/25" />

          <div className="relative z-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="mb-6 inline-flex border-2 border-foreground bg-accent px-4 py-2 text-sm font-black uppercase text-accent-foreground shadow-[6px_6px_0_#0A0A0F]">
                Produto lançado
              </div>

              <h3 className="font-display mb-6 text-4xl font-black leading-tight md:text-6xl">
                VetScribe
                <span className="block text-primary">IA para clínicas veterinárias</span>
              </h3>

              <p className="mb-8 text-lg leading-relaxed text-white/80 md:text-xl">
                Grava a consulta e transforma áudio, notas e documentos em prontuário SOAP, relatórios para tutores e atestados com templates personalizáveis.
              </p>

              <div className="mb-10 grid gap-3 sm:grid-cols-3">
                {steps.map(({ icon: Icon, label }) => (
                  <div key={label} className="neo-mini-card">
                    <Icon className="h-5 w-5 text-primary" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>

              <a
                href="#contacto"
                className="neo-button inline-flex items-center gap-2"
                data-testid="link-vetscribe"
              >
                Quero algo assim <ArrowRight size={20} />
              </a>
            </div>

            <div className="relative min-h-[360px] overflow-hidden border-2 border-foreground bg-background p-6 shadow-[12px_12px_0_var(--primary)]">
              <div className="mb-6 flex items-center justify-between border-b-2 border-foreground pb-4">
                <span className="font-display text-lg font-black">Consulta em direto</span>
                <span className="bg-primary px-3 py-1 text-xs font-black text-primary-foreground">IA ativa</span>
              </div>

              <svg viewBox="0 0 520 220" className="mb-8 h-40 w-full text-accent" fill="none" stroke="currentColor" strokeWidth="8">
                <path className="wave-path" d="M0 110 C40 25 80 195 120 110 S200 25 240 110 S320 195 360 110 S440 25 520 110" />
                <path className="wave-path" d="M0 145 C50 80 85 190 140 145 S230 80 280 145 S400 190 520 145" opacity="0.45" />
              </svg>

              <div className="space-y-3 text-sm font-bold">
                <div className="bg-primary/15 p-3 text-primary">S: Tutor relata melhoria do apetite.</div>
                <div className="bg-accent/15 p-3 text-accent">O: Auscultação sem alterações relevantes.</div>
                <div className="bg-white/10 p-3 text-white/80">A/P: Plano gerado, revisto e pronto para enviar.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
