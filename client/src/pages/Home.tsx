import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ImpactSection from "@/components/ImpactSection";
import AboutSection from "@/components/AboutSection";
import ProgramsSection from "@/components/ProgramsSection";
import SuccessStoriesSection from "@/components/SuccessStoriesSection";
import DonateSection from "@/components/DonateSection";
import VolunteerSection from "@/components/VolunteerSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import MonthlyDonorSection from "@/components/MonthlyDonorSection";
import CSRPartnershipSection from "@/components/CSRPartnershipSection";
import PartnersSection from "@/components/PartnersSection";
import DownloadBrochure from "@/components/DownloadBrochure";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import LanguageSupport from "@/components/LanguageSupport";
import EventsSection from "@/components/EventsSection";
import ResearchSection from "@/components/ResearchSection";
import CertificationsSection from "@/components/CertificationsSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <div className="section-bg">
          <ImpactSection />
        </div>
        <AboutSection />
        <div className="section-bg">
          <ProgramsSection />
        </div>
        <SuccessStoriesSection />
        <div className="section-bg">
          <TestimonialsSection />
        </div>
        <MonthlyDonorSection />
        <div className="section-bg">
          <DonateSection />
        </div>
        <CSRPartnershipSection />
        <VolunteerSection />
        <div className="section-bg">
          <PartnersSection />
        </div>
        <LanguageSupport />
        <div className="section-bg">
          <EventsSection />
        </div>
        <ResearchSection />
        <div className="section-bg">
          <CertificationsSection />
        </div>
        <DownloadBrochure />
        <div className="section-bg">
          <ContactSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}