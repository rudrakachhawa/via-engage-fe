import { BackgroundGlow } from "@/components/marketing/background-glow";
import { FeaturesGrid } from "@/components/marketing/features-grid";
import { HeroSection } from "@/components/marketing/hero-section";
import { Navbar } from "@/components/marketing/navbar";

export default function HomePage() {
  return (
    <>
      <BackgroundGlow />

      <Navbar />

      <main className="container-app">
        <HeroSection />

        <FeaturesGrid />
      </main>
    </>
  );
}