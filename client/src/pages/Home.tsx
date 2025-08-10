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
import WhatWeDoSection from "@/components/WhatWeDoSection";
import VidyaranyaInspiredHowToHelp from "@/components/VidyaranyaInspiredHowToHelp";
import ProfessionalImageGallery from "@/components/ProfessionalImageGallery";
import UrgentAppealBanner from "@/components/UrgentAppealBanner";
import DonationImpactCalculator from "@/components/DonationImpactCalculator";
import DonorRecognitionWall from "@/components/DonorRecognitionWall";
import LiveImpactFeed from "@/components/LiveImpactFeed";
import TrustIndicators from "@/components/TrustIndicators";
import StickyDonationButton from "@/components/StickyDonationButton";
import EnhancedHeroSection from "@/components/EnhancedHeroSection";
import LifeImpactAnimation from "@/components/LifeImpactAnimation";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Urgent Appeal Banner - Top priority for donations */}
        <UrgentAppealBanner />
        
        {/* Enhanced Hero with Urgent Campaign */}
        <EnhancedHeroSection />
        <VidyaranyaInspiredStats />
        
        {/* Live Impact Feed - Show real-time impact early */}
        <LiveImpactFeed />
        
        {/* Life-Changing Impact Animations */}
        <LifeImpactAnimation />
        
        <div className="section-bg">
          <ImpactSection />
        </div>
        <AboutSection />
        <WhatWeDoSection />
        <div className="section-bg">
          <ProgramsSection />
        </div>
        
        {/* Donation Impact Calculator - Interactive engagement */}
        <DonationImpactCalculator />
        
        <SuccessStoriesSection />
        <div className="section-bg">
          <TestimonialsSection />
        </div>
        
        {/* Trust Indicators - Build confidence before major CTA */}
        <TrustIndicators />
        
        <LeadershipSection />
        <div className="section-bg">
          <NewsSection />
        </div>
        <ProfessionalImageGallery />
        <div className="section-bg">
          <AnnualReportsSection />
        </div>

        {/* Donor Recognition Wall - Social proof and aspiration */}
        <DonorRecognitionWall />
        
        <VidyaranyaInspiredHowToHelp />
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
      
      {/* Sticky Donation Button - Always accessible */}
      <StickyDonationButton />
    </div>
  );
}