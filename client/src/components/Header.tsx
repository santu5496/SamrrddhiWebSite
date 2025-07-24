import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
              S
            </div>
            <div>
              <h1 className="text-xl font-bold text-neutral">Samruddhi Service Society</h1>
              <p className="text-sm text-gray-600">Empowering since 1995</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')} 
              className="text-neutral hover:text-primary transition-colors font-medium"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-neutral hover:text-primary transition-colors font-medium"
            >
              About Us
            </button>
            <button 
              onClick={() => scrollToSection('programs')} 
              className="text-neutral hover:text-primary transition-colors font-medium"
            >
              Our Programs
            </button>
            <button 
              onClick={() => scrollToSection('volunteer')} 
              className="text-neutral hover:text-primary transition-colors font-medium"
            >
              Volunteer
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="text-neutral hover:text-primary transition-colors font-medium"
            >
              Contact
            </button>
            <Button 
              onClick={() => scrollToSection('donate')}
              className="bg-secondary text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors font-semibold"
            >
              Donate Now
            </Button>
          </div>
          
          <button 
            className="md:hidden text-neutral" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('home')} 
                className="text-neutral hover:text-primary transition-colors font-medium text-left"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('about')} 
                className="text-neutral hover:text-primary transition-colors font-medium text-left"
              >
                About Us
              </button>
              <button 
                onClick={() => scrollToSection('programs')} 
                className="text-neutral hover:text-primary transition-colors font-medium text-left"
              >
                Our Programs
              </button>
              <button 
                onClick={() => scrollToSection('volunteer')} 
                className="text-neutral hover:text-primary transition-colors font-medium text-left"
              >
                Volunteer
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="text-neutral hover:text-primary transition-colors font-medium text-left"
              >
                Contact
              </button>
              <Button 
                onClick={() => scrollToSection('donate')}
                className="bg-secondary text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors font-semibold w-fit"
              >
                Donate Now
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
