import Header from "@/components/Header";
import LeadershipSection from "@/components/LeadershipSection";
import Footer from "@/components/Footer";

export default function Leadership() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-8">
        {/* Leadership page specific content */}
        <LeadershipSection />
      </main>
      <Footer />
    </div>
  );
}