import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowDown } from "lucide-react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      headlineRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.2 }
    )
      .fromTo(
        subheadRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      )
      .fromTo(
        btnRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.4"
      )
      .fromTo(
        arrowRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1 },
        "-=0.2"
      );

    gsap.to(arrowRef.current, {
      y: 10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      duration: 1.5,
    });
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 grain-bg">
      {/* Gradient animado escuro + noise overlay */}
      <div className="absolute inset-0 z-0 animate-gradient-move" style={{background: "radial-gradient(circle at 20% 40%, #23233a 0%, #0A0A0F 80%), linear-gradient(120deg, rgba(79,110,247,0.12) 0%, rgba(123,94,248,0.10) 100%)"}} />
      <div className="absolute inset-0 noise-overlay pointer-events-none z-0" />

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center max-w-4xl">
        <h1
          ref={headlineRef}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] mb-6 tracking-tight opacity-0"
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
          className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-primary-foreground bg-primary rounded-full overflow-hidden transition-all hover:glow-primary opacity-0"
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
