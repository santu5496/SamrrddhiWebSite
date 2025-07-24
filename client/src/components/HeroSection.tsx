import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { HeroContent } from "@shared/schema";

export default function HeroSection() {
  const { data: heroContent } = useQuery<HeroContent>({
    queryKey: ["/api/hero"],
  });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const backgroundImageStyle = heroContent?.backgroundImageUrl 
    ? `linear-gradient(rgba(30, 64, 175, 0.7), rgba(30, 64, 175, 0.7)), url('${heroContent.backgroundImageUrl}')`
    : `linear-gradient(rgba(30, 64, 175, 0.7), rgba(30, 64, 175, 0.7)), url('https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')`;

  return (
    <section id="home" className="relative min-h-screen flex items-center">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: backgroundImageStyle }}
      />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          {heroContent?.headline || "Give Her a Chance to Learn, Grow, and Thrive."}
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto font-light">
          {heroContent?.subheading || "Empowering rural girls and differently-abled children through education and care since 1995."}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={() => scrollToSection('donate')}
            className="btn-gradient text-white px-8 py-4 rounded-full text-lg font-semibold border-0"
          >
            <Heart className="mr-2 h-5 w-5" />
            Donate Now
          </Button>
          <Button 
            onClick={() => scrollToSection('programs')}
            variant="outline"
            className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-full text-lg font-semibold transition-all hover:transform hover:scale-105"
          >
            Learn More
          </Button>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">
              {heroContent?.yearsOfService || "29"}
            </div>
            <div className="text-sm uppercase tracking-wide">Years of Service</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">
              {heroContent?.childrenSupported || "50+"}
            </div>
            <div className="text-sm uppercase tracking-wide">Children Supported</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-secondary mb-2">
              {heroContent?.corePrograms || "3"}
            </div>
            <div className="text-sm uppercase tracking-wide">Core Programs</div>
          </div>
        </div>
      </div>
    </section>
  );
}
