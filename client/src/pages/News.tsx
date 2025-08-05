import Header from "@/components/Header";
import NewsSection from "@/components/NewsSection";
import Footer from "@/components/Footer";

export default function News() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-8">
        {/* News page specific content */}
        <NewsSection />
      </main>
      <Footer />
    </div>
  );
}