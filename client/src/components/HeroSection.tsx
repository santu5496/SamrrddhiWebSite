import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { ArrowRight, Heart, Users, Award } from "lucide-react";

// Fallback banner image
const bannerImage = "/attached_assets/WhatsApp Image 2025-07-29 at 20.05.20_b468d80d_1753954299033.jpg";
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
    : `linear-gradient(rgba(30, 64, 175, 0.7), rgba(30, 64, 175, 0.7)), url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')`;

  return (
    <section id="home" className="relative min-h-screen flex items-center">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: backgroundImageStyle }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 animate-fade-in-up">
          {heroContent?.headline || "Give Her a Chance to Learn, Grow, and Thrive."}
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto font-light animate-fade-in-up animate-delay-200">
          {heroContent?.subheading || "Empowering rural girls and differently-abled children through education and care since 1995."}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animate-delay-400">
          <Button 
            onClick={() => scrollToSection('donate')}
            className="btn-gradient text-white px-8 py-4 rounded-full text-lg font-semibold border-0 transform hover:scale-105 transition-all duration-300 animate-pulse-hover"
          >
            <Heart className="mr-2 h-5 w-5" />
            Donate Now
          </Button>
          <Button 
            onClick={() => scrollToSection('programs')}
            variant="outline"
            className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg"
          >
            Learn More
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center animate-fade-in-up animate-delay-500 transform hover:scale-105 transition-all duration-300">
            <div className="text-4xl font-bold text-white mb-2 hover:text-secondary transition-colors duration-300">
              {heroContent?.yearsOfService || "29"}
            </div>
            <div className="text-sm uppercase tracking-wide">Years of Service</div>
          </div>
          <div className="text-center animate-fade-in-up animate-delay-600 transform hover:scale-105 transition-all duration-300">
            <div className="text-4xl font-bold text-white mb-2 hover:text-secondary transition-colors duration-300">
              {heroContent?.childrenSupported || "50+"}
            </div>
            <div className="text-sm uppercase tracking-wide">Children Supported</div>
          </div>
          <div className="text-center animate-fade-in-up animate-delay-700 transform hover:scale-105 transition-all duration-300">
            <div className="text-4xl font-bold text-secondary mb-2 hover:text-white transition-colors duration-300">
              {heroContent?.corePrograms || "3"}
            </div>
            <div className="text-sm uppercase tracking-wide">Core Programs</div>
          </div>
        </div>
      </div>
    </section>
  );
}