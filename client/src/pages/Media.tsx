import Header from "@/components/Header";
import MediaSection from "@/components/MediaSection";
import ProfessionalImageGallery from "@/components/ProfessionalImageGallery";
import Footer from "@/components/Footer";

export default function Media() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-8">
        {/* Media page specific content */}
        <MediaSection />
        <ProfessionalImageGallery />
      </main>
      <Footer />
    </div>
  );
}