import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import Lenis from 'lenis';

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-[#0A0A0F] text-white">
      <HeroSection />
      <HorizontalScroll />
      <PinnedProblem />
      <SplitReveal />
      <VetScribeReveal />
      <VerticalsGrid />
      <PricingReveal />
      <TestimonialsHorizontal />
      <ContactReveal />
      <Footer />
    </div>
  );
}

function HeroSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const scale = useTransform(smoothProgress, [0, 1], [1, 0.8]);
  const opacity = useTransform(smoothProgress, [0, 0.6, 1], [1, 0.8, 0]);
  const clipPath = useTransform(
    smoothProgress,
    [0, 1],
    ["inset(0% 0% 0% 0%)", "inset(10% 20% 10% 20%)"]
  );

  return (
    <section ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        <motion.div
          className="absolute inset-0"
          style={{ scale, clipPath }}
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1759262151080-e05ba1c6294f?w=1920"
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0F]/50 to-[#0A0A0F]" />
        </motion.div>

        <motion.div className="relative z-10 text-center px-6" style={{ opacity }}>
          <motion.h1
            className="text-[15vw] md:text-[12vw] leading-[0.85] mb-8 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            {['AUTOMAÇÃO', 'QUE', 'ENCHE'].map((word, i) => (
              <div key={i} className="overflow-hidden">
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  {i === 2 ? <span className="text-[#00C2FF]">{word}</span> : word}
                </motion.div>
              </div>
            ))}
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Clínicas de saúde privada • Crescimento previsível
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

function HorizontalScroll() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001
  });

  const x = useTransform(smoothProgress, [0, 1], ['0%', '-75%']);

  const cards = [
    {
      image: "https://images.unsplash.com/photo-1758691462848-ba1e929da259?w=1200",
      title: "Automação",
      desc: "Agendamento, lembretes, follow-up automático"
    },
    {
      image: "https://images.unsplash.com/photo-1706777280252-5de52771cf13?w=1200",
      title: "Sites Premium",
      desc: "Landing pages, SEO, integração total"
    },
    {
      image: "https://images.unsplash.com/photo-1766315746079-215ff5115e9f?w=1200",
      title: "Apps Custom",
      desc: "Soluções específicas por especialidade"
    },
    {
      image: "https://images.unsplash.com/photo-1778918006429-9212a04d2177?w=1200",
      title: "Analytics",
      desc: "Dados e previsibilidade de crescimento"
    }
  ];

  return (
    <section ref={containerRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-20 px-12">
          <motion.h2
            className="text-5xl md:text-7xl mb-4"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            O que fazemos
          </motion.h2>
          <p className="text-gray-400 text-xl max-w-md">
            Arraste para explorar →
          </p>
        </div>

        <motion.div
          className="absolute left-0 top-0 h-full flex items-center gap-8 pl-[50vw]"
          style={{ x }}
        >
          {cards.map((card, i) => (
            <div
              key={i}
              className="relative w-[70vw] md:w-[40vw] h-[80vh] flex-shrink-0 rounded-3xl overflow-hidden group"
            >
              <ImageWithFallback
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/50 to-transparent" />
              <div className="absolute bottom-0 left-0 p-12">
                <h3 className="text-5xl mb-4 text-[#00C2FF]">{card.title}</h3>
                <p className="text-xl text-gray-300">{card.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function PinnedProblem() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const problems = [
    "Pacientes que não voltam porque ninguém os contactou",
    "Horas perdidas em agendamentos manuais e chamadas",
    "Sem sistema. Sem previsibilidade. Sem crescimento."
  ];

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-[#0A0A0F]">
      <div className="sticky top-0 h-screen flex items-center justify-center px-6">
        <div className="max-w-6xl">
          <motion.h2
            className="text-5xl md:text-8xl mb-24 leading-tight"
            style={{
              opacity: useTransform(smoothProgress, [0, 0.3], [0, 1])
            }}
          >
            A maioria das clínicas{' '}
            <span className="text-[#00C2FF]">perde dinheiro</span> sem saber
          </motion.h2>

          {problems.map((problem, i) => {
            const start = 0.3 + i * 0.15;
            const end = start + 0.12;

            return (
              <motion.div
                key={i}
                className="mb-12 overflow-hidden"
                style={{
                  opacity: useTransform(smoothProgress, [start, end], [0, 1]),
                  x: useTransform(smoothProgress, [start, end], [i % 2 === 0 ? -100 : 100, 0])
                }}
              >
                <div className="border-l-4 border-[#00C2FF] pl-8 py-6">
                  <p className="text-3xl md:text-4xl text-gray-200 leading-relaxed">
                    {problem}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SplitReveal() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const leftX = useTransform(smoothProgress, [0.2, 0.6], ['-100%', '0%']);
  const rightX = useTransform(smoothProgress, [0.2, 0.6], ['100%', '0%']);
  const opacity = useTransform(smoothProgress, [0.4, 0.6], [0, 1]);

  return (
    <section ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        <div className="grid md:grid-cols-2 gap-0 w-full h-full">
          <motion.div
            className="relative h-full overflow-hidden"
            style={{ x: leftX }}
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200"
              alt="Dentista"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#00C2FF]/20" />
          </motion.div>

          <motion.div
            className="relative h-full overflow-hidden"
            style={{ x: rightX }}
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1683408640631-2c99fff964d7?w=1200"
              alt="Estética"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#4DFFB4]/20" />
          </motion.div>
        </div>

        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity }}
        >
          <div className="text-center bg-[#0A0A0F]/90 backdrop-blur-xl px-16 py-12 rounded-3xl border border-white/10">
            <h2 className="text-5xl md:text-7xl mb-6">
              Nexvia
            </h2>
            <p className="text-2xl text-gray-300">
              Crescimento previsível para clínicas
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function VetScribeReveal() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.6, 1, 1]);
  const imageScale = useTransform(smoothProgress, [0.5, 1], [1.2, 1]);
  const y = useTransform(smoothProgress, [0.4, 0.6], [100, 0]);

  return (
    <section ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center px-6">
        <motion.div
          className="max-w-7xl w-full"
          style={{ scale }}
        >
          <div className="text-center mb-20">
            <motion.div
              className="inline-block bg-[#4DFFB4]/20 text-[#4DFFB4] px-8 py-4 rounded-full mb-8"
              style={{ y }}
            >
              Produto lançado
            </motion.div>
            <h2 className="text-6xl md:text-9xl mb-6">
              <span className="text-[#4DFFB4]">VetScribe</span>
            </h2>
            <p className="text-2xl text-gray-400">IA para clínicas veterinárias</p>
          </div>

          <motion.div
            className="grid md:grid-cols-3 gap-6 h-[60vh]"
            style={{ scale: imageScale }}
          >
            <div className="relative col-span-2 rounded-3xl overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1649172000612-6aa53867391d?w=1600"
                alt="VetScribe"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-xl text-white">
                  Grava a consulta • IA gera prontuário SOAP • Relatórios automáticos
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="relative flex-1 rounded-3xl overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1770836037816-4445dbd449fd?w=800"
                  alt="Tech"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative flex-1 rounded-3xl overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1774440865596-7b6e81f6ae2e?w=800"
                  alt="Vet"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function VerticalsGrid() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const verticals = [
    {
      icon: "🦷",
      title: "Dentistas",
      image: "https://images.unsplash.com/photo-1777444969135-caf869407707?w=800"
    },
    {
      icon: "💉",
      title: "Estética",
      image: "https://images.unsplash.com/photo-1683408640631-2c99fff964d7?w=800"
    },
    {
      icon: "🧠",
      title: "Fisio",
      image: "https://images.unsplash.com/photo-1754941622138-b3c3671f2fa8?w=800"
    },
    {
      icon: "🩺",
      title: "Psicologia",
      image: "https://images.unsplash.com/photo-1758691462749-a95ce1bd7f96?w=800"
    }
  ];

  return (
    <section ref={containerRef} className="py-40 px-6">
      <motion.h2
        className="text-5xl md:text-8xl text-center mb-32"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        Especialistas em{' '}
        <span className="text-[#00C2FF]">saúde privada</span>
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-6 max-w-7xl mx-auto">
        {verticals.map((v, i) => {
          const yStart = useTransform(smoothProgress, [0.2, 0.6], [i % 2 === 0 ? 50 : -50, 0]);

          return (
            <motion.div
              key={i}
              className="relative h-[60vh] rounded-3xl overflow-hidden group"
              style={{ y: yStart }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <ImageWithFallback
                src={v.image}
                alt={v.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <div className="text-8xl mb-6">{v.icon}</div>
                <h3 className="text-5xl text-[#00C2FF]">{v.title}</h3>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function PricingReveal() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const leftRotate = useTransform(smoothProgress, [0.2, 0.6], [-15, 0]);
  const rightRotate = useTransform(smoothProgress, [0.2, 0.6], [15, 0]);
  const opacity = useTransform(smoothProgress, [0.2, 0.4], [0, 1]);

  return (
    <section ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center px-6">
        <div className="max-w-6xl w-full">
          <motion.h2
            className="text-5xl md:text-8xl text-center mb-32"
            style={{ opacity }}
          >
            Simples. <span className="text-[#00C2FF]">Transparente</span>.
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              className="bg-gradient-to-br from-[#1A1A2E] to-[#0A0A0F] border border-[#00C2FF]/30 rounded-3xl p-12 origin-bottom"
              style={{ rotateZ: leftRotate, opacity }}
            >
              <div className="text-[#00C2FF] text-lg mb-4">SETUP</div>
              <div className="text-6xl mb-4">€500 - €2.000</div>
              <p className="text-gray-400 text-xl">Implementação inicial</p>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-[#1A1A2E] to-[#0A0A0F] border border-[#4DFFB4]/30 rounded-3xl p-12 origin-bottom"
              style={{ rotateZ: rightRotate, opacity }}
            >
              <div className="text-[#4DFFB4] text-lg mb-4">RETAINER</div>
              <div className="text-6xl mb-4">€300 - €800</div>
              <p className="text-gray-400 text-xl">Por mês</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsHorizontal() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001
  });

  const x = useTransform(smoothProgress, [0, 1], ['0%', '-50%']);

  return (
    <section ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <motion.div
          className="flex gap-8 pl-12"
          style={{ x }}
        >
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-[70vw] md:w-[40vw] h-[70vh] flex-shrink-0 bg-[#1A1A2E] rounded-3xl p-12 flex flex-col justify-between border border-white/10"
            >
              <div>
                <div className="flex gap-2 mb-8">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="text-[#00C2FF] text-3xl">★</span>
                  ))}
                </div>
                <p className="text-2xl text-gray-300 leading-relaxed">
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt."
                </p>
              </div>
              <div className="text-gray-500">Clínica Dentária</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ContactReveal() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const scale = useTransform(smoothProgress, [0.2, 0.6], [0.85, 1]);
  const imageOpacity = useTransform(smoothProgress, [0, 0.4], [0, 1]);

  return (
    <section id="contact" ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center px-6">
        <motion.div
          className="absolute inset-0 grid grid-cols-2 gap-2 p-2"
          style={{ opacity: imageOpacity }}
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1648775507324-b48dd3791fa5?w=1200"
            alt="BG1"
            className="w-full h-full object-cover opacity-10"
          />
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1762625570087-6d98fca29531?w=1200"
            alt="BG2"
            className="w-full h-full object-cover opacity-10"
          />
        </motion.div>

        <motion.div
          className="relative z-10 max-w-4xl w-full"
          style={{ scale }}
        >
          <h2 className="text-5xl md:text-8xl text-center mb-12 leading-tight">
            A sua clínica pode crescer<br />
            de forma <span className="text-[#00C2FF]">previsível</span>
          </h2>

          <div className="bg-[#1A1A2E]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-12">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <input
                type="text"
                placeholder="Nome"
                className="bg-transparent border-b border-white/20 py-4 text-lg focus:outline-none focus:border-[#00C2FF] transition-colors"
              />
              <input
                type="email"
                placeholder="Email"
                className="bg-transparent border-b border-white/20 py-4 text-lg focus:outline-none focus:border-[#00C2FF] transition-colors"
              />
            </div>

            <select className="w-full bg-transparent border-b border-white/20 py-4 text-lg focus:outline-none focus:border-[#00C2FF] transition-colors mb-8">
              <option value="" className="bg-[#1A1A2E]">Tipo de clínica</option>
              <option className="bg-[#1A1A2E]">Dentista</option>
              <option className="bg-[#1A1A2E]">Estética Médica</option>
              <option className="bg-[#1A1A2E]">Fisioterapia</option>
              <option className="bg-[#1A1A2E]">Veterinária</option>
            </select>

            <textarea
              placeholder="Como podemos ajudar?"
              className="w-full bg-transparent border-b border-white/20 py-4 text-lg focus:outline-none focus:border-[#00C2FF] transition-colors mb-8 h-32 resize-none"
            />

            <div className="flex gap-4">
              <button className="flex-1 bg-white text-[#0A0A0F] py-5 rounded-full text-lg hover:bg-[#00C2FF] hover:text-white transition-all duration-300">
                Enviar
              </button>
              <button className="flex-1 bg-[#4DFFB4] text-[#0A0A0F] py-5 rounded-full text-lg hover:bg-white transition-all duration-300">
                WhatsApp
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-20 px-6 border-t border-white/10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <h3 className="text-5xl mb-3 text-[#00C2FF]">Nexvia</h3>
          <p className="text-gray-400">
            Automação e crescimento para clínicas de saúde privada
          </p>
        </div>

        <div className="text-gray-500">
          © 2025 Nexvia. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
