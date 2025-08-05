import Header from "@/components/Header";
import ResourcesSection from "@/components/ResourcesSection";
import AnnualReportsSection from "@/components/AnnualReportsSection";
import CertificationsSection from "@/components/CertificationsSection";
import ResearchSection from "@/components/ResearchSection";
import Footer from "@/components/Footer";

export default function Resources() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-8">
        {/* Resources page specific content */}
        <ResourcesSection />
        <AnnualReportsSection />
        <CertificationsSection />
        <ResearchSection />
      </main>
      <Footer />
    </div>
  );
}