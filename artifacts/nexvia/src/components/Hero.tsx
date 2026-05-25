import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animação de entrada
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      headlineRef.current,
      { y: 80, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 1.2, delay: 0.3 }
    )
      .fromTo(
        subheadRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 },
        "-=0.7"
      )
      .fromTo(
        btnRef.current,
        { y: 40, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.7)" },
        "-=0.5"
      )
      .fromTo(
        arrowRef.current,
        { opacity: 0, y: -20 },
        { opacity: 0.6, y: 0, duration: 1 },
        "-=0.3"
      );

    // Parallax do fundo
    gsap.to(".hero-bg", {
      backgroundPosition: "50% 100%",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.8,
      },
    });

    // Efeito 3D com valores mais agressivos
    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        // Converte progress (0 a 1) para os valores desejados
        gsap.to(contentWrapperRef.current, {
          scale: 1 - progress * 0.5,      // de 1 a 0.5
          z: -progress * 800,             // de 0 a -800px
          rotateX: progress * 10,         // de 0 a 10 graus
          opacity: 1 - progress * 0.8,    // desaparece gradualmente
          filter: `blur(${progress * 8}px)`, // desfoque
          duration: 0, // imediato
          overwrite: "auto",
        });
      },
    });

    // Esconder seta
    gsap.to(arrowRef.current, {
      opacity: 0,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top+=100 top",
        end: "top+=300 top",
        scrub: 0.5,
      },
    });

    // Bounce
    gsap.to(arrowRef.current, {
      y: 12,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      duration: 1.8,
    });

    // Debug
    console.log("Hero 3D scroll preparado");

    return () => {
      st.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-visible pt-24 grain-bg"
      style={{ perspective: "800px" }}
    >
      <div
        className="absolute inset-0 z-0 hero-bg animate-gradient-move"
        style={{
          background:
            "radial-gradient(circle at 20% 40%, #23233a 0%, #0A0A0F 80%), linear-gradient(120deg, rgba(79,110,247,0.12) 0%, rgba(123,94,248,0.10) 100%)",
          backgroundSize: "cover",
        }}
      />
      <div className="absolute inset-0 noise-overlay pointer-events-none z-0" />

      <div
        ref={contentWrapperRef}
        className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center max-w-4xl"
        style={{ transformStyle: "preserve-3d", willChange: "transform" }}
      >
        <h1
          ref={headlineRef}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] mb-6 tracking-tight opacity-0"
        >
          Automação que enche a agenda.
          <br className="hidden md:block" />
          <span className="text-primary text-glow-primary font-extrabold">
            Crescimento
          </span>{" "}
          que fica.
        </h1>

        <p
          ref={subheadRef}
          className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl opacity-0 font-light"
        >
          Ajudamos clínicas de saúde privada a automatizar processos, reter
          pacientes e crescer de forma previsível.
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

      <div
        ref={arrowRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-primary/70 opacity-0"
      >
        <ArrowDown size={32} strokeWidth={1} />
      </div>
    </section>
  );
}