import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#050508] pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          <div>
            <Link href="/" className="font-display font-bold text-2xl tracking-wider flex items-baseline gap-1 mb-4" data-testid="link-footer-logo">
              NEXVIA<span className="w-2 h-2 rounded-full bg-primary mb-1 inline-block"></span>
            </Link>
            <p className="text-muted-foreground max-w-sm">
              Automação e crescimento para clínicas de saúde privada.
            </p>
          </div>
          
          <div className="flex gap-8">
            <a href="#servicos" className="text-muted-foreground hover:text-white transition-colors" data-testid="link-footer-servicos">Serviços</a>
            <a href="#vetscribe" className="text-muted-foreground hover:text-white transition-colors" data-testid="link-footer-vetscribe">VetScribe</a>
            <a href="#contacto" className="text-muted-foreground hover:text-white transition-colors" data-testid="link-footer-contacto">Contacto</a>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
          <p>© 2025 Nexvia. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Termos</a>
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
