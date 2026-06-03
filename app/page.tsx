import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import GameLoop from "@/components/GameLoop";
import Testimonials from "@/components/Testimonials";
import Features from "@/components/Features";
import CTABanner from "@/components/CTABanner";
import FAQ from "@/components/FAQ";
import ParallaxDecorations from "@/components/ParallaxDecorations";

export default function Home() {
  return (
    <div className="relative">
      <ParallaxDecorations />
      <div className="relative" style={{ zIndex: 1 }}>
        <Navbar />
        <main>
          <Hero />
          <GameLoop />
          <Testimonials />
          <Features />
          <FAQ />
          <CTABanner />
        </main>
      </div>
    </div>
  );
}
