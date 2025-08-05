import Header from "@/components/Header";
import EventsSection from "@/components/EventsSection";
import Footer from "@/components/Footer";

export default function Events() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-8">
        {/* Events page specific content */}
        <EventsSection />
      </main>
      <Footer />
    </div>
  );
}