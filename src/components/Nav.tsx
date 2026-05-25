
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu, X } from "lucide-react";
import { Link } from "wouter";

const NexviaLogo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="nexvia-gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4F6EF7" />
        <stop offset="1" stopColor="#7B5EF8" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="36" height="36" rx="8" fill="url(#nexvia-gradient)" />
    <text x="50%" y="56%" textAnchor="middle" fill="#F0F0FF" fontFamily="'Space Grotesk', sans-serif" fontWeight="900" fontSize="18" dy=".3em">N</text>
  </svg>
);

export function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const trigger = document.getElementById("topo");

    const st = ScrollTrigger.create({
      trigger: trigger ?? document.body,
      start: "top -60",
      end: "top -60",
      onEnter: () => setIsScrolled(true),
      onLeaveBack: () => setIsScrolled(false),
    });

    return () => st.kill();
  }, []);

  useEffect(() => {
    if (navRef.current) {
      gsap.to(navRef.current, {
        backgroundColor: isScrolled ? "rgba(10, 10, 15, 0.9)" : "transparent",
        backdropFilter: isScrolled ? "blur(12px)" : "blur(0px)",
        borderBottom: isScrolled ? "1px solid rgba(255,255,255,0.05)" : "1px solid transparent",
        duration: 0.3,
      });
    }
  }, [isScrolled]);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 transition-all"
    >
      <div className="container mx-auto px-6 h-24 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" data-testid="link-logo">
          <NexviaLogo />
          <span className="font-display font-extrabold text-2xl tracking-wider text-glow-primary" style={{letterSpacing: '-0.04em'}}>NEXVIA</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-5 text-sm font-black text-muted-foreground">
          <a href="#servicos" className="hover:text-foreground transition-colors" data-testid="link-nav-servicos">Serviços</a>
          <a href="#vetscribe" className="hover:text-foreground transition-colors" data-testid="link-nav-vetscribe">VetScribe</a>
          <a href="#contacto" className="border-2 border-foreground bg-primary px-4 py-2 text-primary-foreground shadow-[5px_5px_0_var(--neo-violet)] transition-transform hover:-translate-y-0.5" data-testid="link-nav-contacto">Contacto</a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          data-testid="button-mobile-menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-24 left-0 w-full bg-background border-b border-white/5 py-6 px-6 flex flex-col gap-6 md:hidden">
          <a href="#servicos" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-muted-foreground hover:text-foreground">Serviços</a>
          <a href="#vetscribe" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-muted-foreground hover:text-foreground">VetScribe</a>
          <a href="#contacto" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-primary">Contacto</a>
        </div>
      )}
    </nav>
  );
}
