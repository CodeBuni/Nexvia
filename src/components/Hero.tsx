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
    // Animação de entrada (linha do tempo)
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

    // Parallax do gradiente de fundo
    gsap.to(".hero-bg", {
      backgroundPosition: "50% 100%",
      scale: 1.3,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.8,
      },
    });

    // Parallax das partículas (mais lento = mais profundidade)
    gsap.to(".hero-particles", {
      y: -200,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.5,
      },
    });

    // Efeito 3D de afastamento no conteúdo com PIN
    gsap.to(contentWrapperRef.current, {
      scale: 0.3,
      z: -600,
      rotateX: 10,
      opacity: 0,
      filter: "blur(8px)",
      ease: "power2.in",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=150%",
        scrub: 1,
        pin: true,
        anticipatePin: 0.5,
        pinSpacing: true,
      },
    });

    // Esconder seta ao scrollar
    gsap.to(arrowRef.current, {
      opacity: 0,
      y: 30,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top+=100 top",
        end: "top+=300 top",
        scrub: 0.5,
      },
    });

    // Bounce perpétuo da seta
    gsap.to(arrowRef.current, {
      y: 12,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      duration: 1.8,
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24"
      style={{ perspective: "1200px" }}
    >
      {/* Fundo com gradiente animado */}
      <div
        className="absolute inset-0 z-0 hero-bg"
        style={{
          background: `
            radial-gradient(ellipse at 20% 50%, rgba(79,110,247,0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(123,94,248,0.12) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 80%, rgba(0,194,255,0.08) 0%, transparent 50%),
            linear-gradient(180deg, #0A0A0F 0%, #12121a 50%, #0A0A0F 100%)
          `,
          backgroundSize: "cover",
        }}
      />

      {/* Grid decorativo de fundo */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Partículas flutuantes */}
      <div className="hero-particles absolute inset-0 z-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: i % 3 === 0 ? 'rgba(79,110,247,0.4)' : i % 3 === 1 ? 'rgba(123,94,248,0.3)' : 'rgba(0,194,255,0.3)',
              boxShadow: i % 3 === 0 ? '0 0 6px rgba(79,110,247,0.6)' : i % 3 === 1 ? '0 0 6px rgba(123,94,248,0.5)' : '0 0 6px rgba(0,194,255,0.4)',
              animation: `heroFloat ${Math.random() * 10 + 15}s linear infinite`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Círculos grandes desfocados para atmosfera */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-[120px] z-0" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-[120px] z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] z-0" />

      {/* Overlay de ruído/textura */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Linhas de luz decorativas */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-accent/20 to-transparent" />
      </div>

      {/* Wrapper 3D que sofrerá o efeito de afastamento */}
      <div
        ref={contentWrapperRef}
        className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center max-w-4xl"
        style={{ transformStyle: "preserve-3d" }}
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

      {/* Seta indicadora */}
      <div
        ref={arrowRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-primary/70 opacity-0 z-10"
      >
        <ArrowDown size={32} strokeWidth={1} />
      </div>

      {/* Animação das partículas */}
      <style>{`
        @keyframes heroFloat {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          50% {
            transform: translateY(-80px) translateX(40px);
            opacity: 0.4;
          }
          90% {
            opacity: 0.1;
          }
        }
      `}</style>
    </section>
  );
}