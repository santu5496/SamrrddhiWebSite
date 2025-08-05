import Header from "@/components/Header";
import ProgramsSection from "@/components/ProgramsSection";
import WhatWeDoSection from "@/components/WhatWeDoSection";
import Footer from "@/components/Footer";

export default function Programs() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-8">
        {/* Programs page specific content */}
        <WhatWeDoSection />
        <ProgramsSection />
      </main>
      <Footer />
    </div>
  );
}