import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Problema } from "@/components/Problema";
import { Solucao } from "@/components/Solucao";
import { VetScribe } from "@/components/VetScribe";
import { Verticais } from "@/components/Verticais";
import { Pricing } from "@/components/Pricing";
import { SocialProof } from "@/components/SocialProof";
import { CtaFinal } from "@/components/CtaFinal";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="w-full bg-background text-foreground">
      <Nav />
      <Hero />
      <Problema />
      <Solucao />
      <VetScribe />
      <Verticais />
      <Pricing />
      <SocialProof />
      <CtaFinal />
      <Footer />
    </main>
  );
}
