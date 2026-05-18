import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Menu, X } from "lucide-react";
import { Link } from "wouter";

export function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
        <Link href="/" className="font-display font-bold text-2xl tracking-wider flex items-baseline gap-1" data-testid="link-logo">
          NEXVIA<span className="w-2 h-2 rounded-full bg-primary mb-1 inline-block"></span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#servicos" className="hover:text-foreground transition-colors" data-testid="link-nav-servicos">Serviços</a>
          <a href="#vetscribe" className="hover:text-foreground transition-colors" data-testid="link-nav-vetscribe">VetScribe</a>
          <a href="#contacto" className="text-foreground border border-primary/30 px-5 py-2.5 rounded-full hover:bg-primary/10 transition-colors" data-testid="link-nav-contacto">Contacto</a>
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
