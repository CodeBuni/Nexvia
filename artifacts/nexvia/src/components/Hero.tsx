console.log("🔥 HERO CARREGADO - VERSÃO 3D EXPLOSIVA");

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  
  // Refs para cada palavra do título (para animar individualmente)
  const word1Ref = useRef<HTMLSpanElement>(null);
  const word2Ref = useRef<HTMLSpanElement>(null);
  const word3Ref = useRef<HTMLSpanElement>(null);
  const word4Ref = useRef<HTMLSpanElement>(null);
  const word5Ref = useRef<HTMLSpanElement>(null);
  const word6Ref = useRef<HTMLSpanElement>(null);
  const word7Ref = useRef<HTMLSpanElement>(null);
  const word8Ref = useRef<HTMLSpanElement>(null);
  const word9Ref = useRef<HTMLSpanElement>(null);
  const word10Ref = useRef<HTMLSpanElement>(null);
  const word11Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Limpar qualquer ScrollTrigger existente
    ScrollTrigger.getAll().forEach(st => st.kill());
    
    const ctx = gsap.context(() => {
      
      // 1. Animação de entrada inicial
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

      // 2. EFEITO DE AFASTAMENTO - O CONTEÚDO INTEIRO
      // Usando uma timeline com scrub para controlar todo o efeito
      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        }
      })
      .to(headlineRef.current, {
        scale: 0.2,
        y: 150,
        opacity: 0,
        filter: "blur(10px)",
        ease: "power2.in",
      }, 0)
      .to(subheadRef.current, {
        scale: 0.3,
        y: 120,
        opacity: 0,
        filter: "blur(8px)",
        ease: "power2.in",
      }, 0)
      .to(btnRef.current, {
        scale: 0.4,
        y: 100,
        opacity: 0,
        filter: "blur(6px)",
        ease: "power2.in",
      }, 0);

      // 3. ANIMAÇÃO INDIVIDUAL DAS PALAVRAS
      // Cada palavra vai para uma direção ligeiramente diferente
      const words = [
        word1Ref, word2Ref, word3Ref, word4Ref, word5Ref,
        word6Ref, word7Ref, word8Ref, word9Ref, word10Ref, word11Ref
      ];

      words.forEach((wordRef, index) => {
        if (!wordRef.current) return;
        
        const angle = (index / words.length) * Math.PI * 2;
        const x = Math.cos(angle) * 100;
        const y = Math.sin(angle) * 80 + 100;
        
        gsap.to(wordRef.current, {
          x: x,
          y: y,
          scale: 0.1,
          opacity: 0,
          filter: "blur(15px)",
          ease: "power2.in",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
          }
        });
      });

      // 4. Parallax do fundo
      gsap.to(".hero-bg", {
        backgroundPosition: "50% 100%",
        scale: 1.5,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      // 5. Seta desaparece
      gsap.to(arrowRef.current, {
        opacity: 0,
        y: -50,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top+=50 top",
          end: "top+=200 top",
          scrub: 0.5,
        },
      });

      // 6. Bounce da seta
      gsap.to(arrowRef.current, {
        y: 12,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        duration: 1.8,
      });

    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24"
      style={{ 
        backgroundColor: "#0A0A0F",
        perspective: "1000px",
      }}
    >
      {/* Fundo com gradiente */}
      <div
        className="absolute inset-0 z-0 hero-bg"
        style={{
          background: "radial-gradient(circle at 20% 40%, #23233a 0%, #0A0A0F 80%)",
          backgroundSize: "cover",
        }}
      />
      
      {/* Overlay de ruído */}
      <div 
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")`,
          pointerEvents: "none",
        }}
      />

      {/* Conteúdo */}
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center max-w-4xl">
        <h1
          ref={headlineRef}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] mb-6 tracking-tight opacity-0"
          style={{ 
            fontFamily: "'Space Grotesk', sans-serif",
            willChange: "transform, opacity, filter",
          }}
        >
          <span ref={word1Ref} style={{ display: "inline-block" }}>Automação </span>
          <span ref={word2Ref} style={{ display: "inline-block" }}>que </span>
          <span ref={word3Ref} style={{ display: "inline-block" }}>enche </span>
          <span ref={word4Ref} style={{ display: "inline-block" }}>a </span>
          <span ref={word5Ref} style={{ display: "inline-block" }}>agenda.</span>
          <br className="hidden md:block" />
          <span 
            ref={word6Ref} 
            style={{ display: "inline-block" }}
            className="text-primary text-glow-primary font-extrabold"
          >
            Crescimento
          </span>
          <span ref={word7Ref} style={{ display: "inline-block" }}> </span>
          <span ref={word8Ref} style={{ display: "inline-block" }}>que </span>
          <span ref={word9Ref} style={{ display: "inline-block" }}>fica.</span>
        </h1>

        <p
          ref={subheadRef}
          className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl opacity-0 font-light"
          style={{ willChange: "transform, opacity, filter" }}
        >
          Ajudamos clínicas de saúde privada a automatizar processos, reter
          pacientes e crescer de forma previsível.
        </p>

        <a
          ref={btnRef}
          href="#contacto"
          className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white bg-blue-600 rounded-full overflow-hidden transition-all hover:bg-blue-500 opacity-0"
          style={{ willChange: "transform, opacity, filter" }}
          data-testid="button-hero-cta"
        >
          <div className="absolute inset-0 w-full h-full bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          <span className="relative">Quero saber mais</span>
        </a>
      </div>

      {/* Seta */}
      <div
        ref={arrowRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-blue-400/70 opacity-0"
      >
        <ArrowDown size={32} strokeWidth={1} />
      </div>
    </section>
  );
}