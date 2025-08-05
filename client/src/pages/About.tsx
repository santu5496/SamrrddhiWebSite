import Header from "@/components/Header";
import AboutSection from "@/components/AboutSection";
import ImpactSection from "@/components/ImpactSection";
import VidyaranyaInspiredStats from "@/components/VidyaranyaInspiredStats";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-8">
        {/* About page specific content */}
        <VidyaranyaInspiredStats />
        <AboutSection />
        <ImpactSection />
      </main>
      <Footer />
    </div>
  );
}