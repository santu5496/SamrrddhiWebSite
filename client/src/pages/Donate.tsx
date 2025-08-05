import Header from "@/components/Header";
import DonateSection from "@/components/DonateSection";
import EnhancedDonationOptions from "@/components/EnhancedDonationOptions";
import DonationCTA from "@/components/DonationCTA";
import MonthlyDonorSection from "@/components/MonthlyDonorSection";
import DonationImpactCalculator from "@/components/DonationImpactCalculator";
import TrustIndicators from "@/components/TrustIndicators";
import Footer from "@/components/Footer";

export default function Donate() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-8">
        {/* Donation page specific content */}
        <DonationCTA />
        <EnhancedDonationOptions />
        <DonationImpactCalculator />
        <TrustIndicators />
        <DonateSection />
        <MonthlyDonorSection />
      </main>
      <Footer />
    </div>
  );
}