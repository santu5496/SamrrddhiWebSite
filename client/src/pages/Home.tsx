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
import ResourcesSection from "@/components/ResourcesSection";
import MediaSection from "@/components/MediaSection";
import LeadershipSection from "@/components/LeadershipSection";
import NewsSection from "@/components/NewsSection";
import PhotoGallerySection from "@/components/PhotoGallerySection";
import AnnualReportsSection from "@/components/AnnualReportsSection";
import HowToHelpSection from "@/components/HowToHelpSection";
import VidyaranyaInspiredStats from "@/components/VidyaranyaInspiredStats";
import EnhancedDonationOptions from "@/components/EnhancedDonationOptions";
import DonationCTA from "@/components/DonationCTA";
import NewsletterSection from "@/components/NewsletterSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <VidyaranyaInspiredStats />
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
        <LeadershipSection />
        <div className="section-bg">
          <NewsSection />
        </div>
        <PhotoGallerySection />
        <div className="section-bg">
          <AnnualReportsSection />
        </div>
        <HowToHelpSection />
        <EnhancedDonationOptions />
        <DonationCTA />
        <div className="section-bg">
          <MonthlyDonorSection />
        </div>
        <div className="section-bg">
          <DonateSection />
        </div>
        <CSRPartnershipSection />
        <div className="section-bg">
          <VolunteerSection />
        </div>
        <PartnersSection />
        <div className="section-bg">
          <EventsSection />
        </div>
        <CertificationsSection />
        <div className="section-bg">
          <ResourcesSection />
        </div>
        <MediaSection />
        <div className="section-bg">
          <ResearchSection />
        </div>
        <NewsletterSection />
        <LanguageSupport />
        <div className="section-bg">
          <DownloadBrochure />
        </div>
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}