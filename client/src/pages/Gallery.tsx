
import Header from "@/components/Header";
import PhotoGallerySection from "@/components/PhotoGallerySection";
import Footer from "@/components/Footer";

export default function Gallery() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-8">
        {/* Gallery page - focused on photo galleries only */}
        <PhotoGallerySection />
      </main>
      <Footer />
    </div>
  );
}
