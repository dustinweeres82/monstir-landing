import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import GameLoop from "@/components/GameLoop";
import ProblemSection from "@/components/ProblemSection";
// import Testimonials from "@/components/Testimonials";
import Features from "@/components/Features";
import ForKids from "@/components/ForKids";
import SafeSection from "@/components/SafeSection";
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
          <ProblemSection />
          <GameLoop />
          {/* <Testimonials /> */}
          <Features />
          <ForKids />
          <SafeSection />
          <FAQ />
          <CTABanner />
        </main>
      </div>
    </div>
  );
}
