import { useState } from "react";
import { Menu, X, Volume2, Type, Eye } from "lucide-react";
import { Button } from "./ui/button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [isHighContrast, setIsHighContrast] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Accessibility Toolbar */}
      <div className="bg-neutral text-white py-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-end items-center space-x-4 text-sm">
          <button 
            onClick={() => setFontSize(prev => Math.min(prev + 2, 24))}
            className="flex items-center space-x-1 hover:text-secondary"
            aria-label="Increase font size"
          >
            <Type className="h-4 w-4" />
            <span>A+</span>
          </button>
          <button 
            onClick={() => setFontSize(prev => Math.max(prev - 2, 12))}
            className="flex items-center space-x-1 hover:text-secondary"
            aria-label="Decrease font size"
          >
            <Type className="h-3 w-3" />
            <span>A-</span>
          </button>
          <button 
            onClick={() => setIsHighContrast(!isHighContrast)}
            className="flex items-center space-x-1 hover:text-secondary"
            aria-label="Toggle high contrast"
          >
            <Eye className="h-4 w-4" />
            <span>Contrast</span>
          </button>
          <span className="text-xs">Screen Reader Compatible</span>
        </div>
      </div>

      <header className={`bg-white shadow-md sticky top-0 z-50 ${isHighContrast ? 'high-contrast' : ''}`} style={{fontSize: `${fontSize}px`}}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          aria-label="Main navigation">
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

            <div className="hidden md:flex items-center space-x-6">
              <button 
                onClick={() => scrollToSection('about')} 
                className="text-neutral hover:text-primary transition-colors font-medium uppercase text-sm tracking-wide"
              >
                About Us
              </button>
              <button 
                onClick={() => scrollToSection('programs')} 
                className="text-neutral hover:text-primary transition-colors font-medium uppercase text-sm tracking-wide"
              >
                Our Work
              </button>
              <button 
                onClick={() => scrollToSection('success-stories')} 
                className="text-neutral hover:text-primary transition-colors font-medium uppercase text-sm tracking-wide"
              >
                Resources
              </button>
              <button 
                onClick={() => scrollToSection('events')} 
                className="text-neutral hover:text-primary transition-colors font-medium uppercase text-sm tracking-wide"
              >
                Media
              </button>
              <button 
                onClick={() => scrollToSection('volunteer')} 
                className="text-neutral hover:text-primary transition-colors font-medium uppercase text-sm tracking-wide"
              >
                Get Involved
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="text-neutral hover:text-primary transition-colors font-medium uppercase text-sm tracking-wide"
              >
                Contact Us
              </button>
              <Button 
                onClick={() => scrollToSection('csr')}
                className="bg-red-500 text-white px-4 py-2 text-sm font-semibold hover:bg-red-600 transition-colors uppercase tracking-wide"
              >
                CSR
              </Button>
              <Button 
                onClick={() => scrollToSection('donate')}
                className="bg-red-500 text-white px-6 py-2 font-semibold hover:bg-red-600 transition-colors uppercase tracking-wide"
              >
                Donate
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
                  onClick={() => scrollToSection('about')} 
                  className="text-neutral hover:text-primary transition-colors font-medium text-left uppercase text-sm tracking-wide"
                >
                  About Us
                </button>
                <button 
                  onClick={() => scrollToSection('programs')} 
                  className="text-neutral hover:text-primary transition-colors font-medium text-left uppercase text-sm tracking-wide"
                >
                  Our Work
                </button>
                <button 
                  onClick={() => scrollToSection('success-stories')} 
                  className="text-neutral hover:text-primary transition-colors font-medium text-left uppercase text-sm tracking-wide"
                >
                  Resources
                </button>
                <button 
                  onClick={() => scrollToSection('events')} 
                  className="text-neutral hover:text-primary transition-colors font-medium text-left uppercase text-sm tracking-wide"
                >
                  Media
                </button>
                <button 
                  onClick={() => scrollToSection('volunteer')} 
                  className="text-neutral hover:text-primary transition-colors font-medium text-left uppercase text-sm tracking-wide"
                >
                  Get Involved
                </button>
                <button 
                  onClick={() => scrollToSection('contact')} 
                  className="text-neutral hover:text-primary transition-colors font-medium text-left uppercase text-sm tracking-wide"
                >
                  Contact Us
                </button>
                <div className="flex flex-col space-y-2 pt-2">
                  <Button 
                    onClick={() => scrollToSection('csr')}
                    className="bg-red-500 text-white px-4 py-2 text-sm font-semibold hover:bg-red-600 transition-colors uppercase tracking-wide w-fit"
                  >
                    CSR
                  </Button>
                  <Button 
                    onClick={() => scrollToSection('donate')}
                    className="bg-red-500 text-white px-6 py-2 font-semibold hover:bg-red-600 transition-colors uppercase tracking-wide w-fit"
                  >
                    Donate
                  </Button>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
}