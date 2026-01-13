import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ModPreviewSection from "@/components/ModPreviewSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowToPlaySection from "@/components/HowToPlaySection";
import SocialLinks from "@/components/SocialLinks";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <ModPreviewSection />
        <FeaturesSection />
        <HowToPlaySection />
        <SocialLinks />
      </main>
      <Footer />
    </div>
  );
};

export default Index;