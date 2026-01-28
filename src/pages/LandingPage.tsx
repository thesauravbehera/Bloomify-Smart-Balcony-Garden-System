import { useState } from "react";
import { AuthModal } from "../components/AuthModal";
import { HeroSectionCosmic } from "../components/hero-section-cosmic";
import { FeaturesSection } from "../components/FeaturesSection";
import { InteractiveDemoSection } from "../components/interactive-demo-section";
import { AboutSection } from "../components/about-section";
import { LevelsSection } from "../components/LevelsSection";
import { TestimonialsSection } from "../components/testimonials-section";
import { CTASection } from "../components/cta-section";
import { Footer } from "../components/footer";
import { FloatingUserStation } from "../components/FloatingUserStation";

export function LandingPage() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <main className="bg-[#020617] text-white selection:bg-emerald-500 selection:text-white min-h-screen">
      <HeroSectionCosmic />
      <FeaturesSection />
      <InteractiveDemoSection />
      <AboutSection />
      <LevelsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
      
      {/* Floating UI Elements */}
      <FloatingUserStation />
      
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </main>
  );
}
