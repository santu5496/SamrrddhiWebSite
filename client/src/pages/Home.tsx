import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ImpactSection from "@/components/ImpactSection";
import AboutSection from "@/components/AboutSection";
import ProgramsSection from "@/components/ProgramsSection";
import SuccessStoriesSection from "@/components/SuccessStoriesSection";
import DonateSection from "@/components/DonateSection";
import VolunteerSection from "@/components/VolunteerSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PartnersSection from "@/components/PartnersSection";
import DownloadBrochure from "@/components/DownloadBrochure";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <ImpactSection />
        <AboutSection />
        <ProgramsSection />
        <SuccessStoriesSection />
        <DonateSection />
        <VolunteerSection />
        <TestimonialsSection />
        <PartnersSection />
        <DownloadBrochure />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
