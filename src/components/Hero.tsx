import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowDown } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Revelação inicial (agora sincronizada com o scroll)
      tl.fromTo(
        headlineRef.current,
        { x: -90, opacity: 0, filter: "blur(6px)" },
        {
          x: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          },
        }
      )
        .fromTo(
          subheadRef.current,
          { x: 90, opacity: 0, filter: "blur(6px)" },
          {
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.9,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
            },
          },
          "-=0.65"
        )
        .fromTo(
          btnRef.current,
          { y: 50, opacity: 0, filter: "blur(6px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.7,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
            },
          },
          "-=0.45"
        )
        .fromTo(
          arrowRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
            },
          },
          "-=0.3"
        );

      // Micro-movimento contínuo (sutil)
      gsap.to(arrowRef.current, {
        y: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        duration: 1.7,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="story-hero relative min-h-screen flex items-center justify-center overflow-hidden pt-24 grain-bg">
      {/* Gradient animado escuro + noise overlay */}
      <div className="absolute inset-0 z-0 animate-gradient-move" style={{background: "radial-gradient(circle at 20% 40%, rgba(79,110,247,0.32) 0%, rgba(10,10,15,0.88) 52%, #0A0A0F 100%), linear-gradient(120deg, rgba(79,110,247,0.18) 0%, rgba(123,94,248,0.16) 100%)"}} />
      <div className="absolute inset-0 noise-overlay pointer-events-none z-0" />
      <div className="neo-grid-bg" />

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center max-w-4xl">
        <div className="neo-kicker mb-8">00 / Clínica sempre cheia</div>
        <h1
          ref={headlineRef}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-black leading-[1.02] mb-6 tracking-tight opacity-0"
        >
          Automação que enche a agenda.<br className="hidden md:block" />
          <span className="text-primary text-glow-primary font-extrabold">Crescimento</span> que fica.
        </h1>

        <p
          ref={subheadRef}
          className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl opacity-0 font-light"
        >
          Ajudamos clínicas de saúde privada a automatizar processos, reter pacientes e crescer de forma previsível.
        </p>

        <a
          ref={btnRef}
          href="#contacto"
          className="neo-button group relative inline-flex items-center justify-center overflow-hidden opacity-0"
          data-testid="button-hero-cta"
        >
          <div className="absolute inset-0 w-full h-full bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          <span className="relative">Quero saber mais</span>
        </a>
      </div>

      {/* Scroll indicator animado */}
      <div
        ref={arrowRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-primary/70 opacity-0 animate-bounce"
      >
        <ArrowDown size={32} strokeWidth={1} />
      </div>
    </section>
  );
}
